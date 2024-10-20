'use client'

import { setCookie } from 'cookies-next'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import UseSearchParamsHook from '@/hooks/UseSearchParamsHook'

import InputDemo from '@/components/inputs/Input-demo'
import { LoginRequest } from '@/redux/Slices/auth-slice/AuthSlice'
import { LoginSchema } from '@/data/formik/FormikSchema'

import { toast } from 'sonner'



export default function LoginPage() {

    const { router } = UseSearchParamsHook()

    const { verified, loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: LoginSchema,
        onSubmit: (values, { setFieldError }) => {
            dispatch(LoginRequest(values)).then((res) => {
                if (res.payload.token) {
                    setCookie('token', res.payload.token);
                    router.push('/');
                    toast.success("Login Successful");
                    
                } else {
                    toast.error(res.payload.message || "An error occurred");
                    res.payload.message === "Incorrect password." ? setFieldError('password', res.payload.message) : setFieldError('email', res.payload.message)
                }
            })
        }
    })
    return (
        <div className='flex justify-center mt-4 w-[1000px] max-w-full gap-5'>
            <div className='shadow w-1/2 p-8'>
                <h2 className='text-3xl font-semibold my-1'>Login</h2>
                <p className='text-gray-400'>Welcome back, please log in to your account</p>
                <form id='login' className='my-3' onSubmit={formik.handleSubmit}>
                    <InputDemo placeHolder="Enter Email" id="email" label="Email" style="md:gap-8 my-5" type="text" error={formik.errors.email} value={formik.values.email} onChange={formik.handleChange} />
                    <InputDemo placeHolder="Enter Password" id="password" label="Password" style="md:gap-8" type="password" error={formik.errors.password} value={formik.values.password} onChange={formik.handleChange} />
                    <div className='flex justify-center'>
                        <button type="submit" disabled={loading} className="w-full bg-main-100 text-white p-2 rounded-md my-2 mt-5">{loading ? "Loading..." : 'Login'}</button>
                    </div>
                    {/* <div className='flex justify-center'>
                        <p>Don`t have account? <Link href={"/register"} className='text-red-600'>Sign up</Link></p>
                    </div> */}
                </form>
            </div>
        </div>

    )
}