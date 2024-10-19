'use client';

import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";
import { useDispatch, useSelector } from "react-redux";


import { useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";

import { VerifyClientInitialValue } from "@/data/formik/initial-values/ClientInitialValue";
import { VerifyClientSchema } from "@/data/formik/FormikSchema";
import { VerifyOTP } from "@/redux/Slices/auth-slice/AuthSlice";
import { InputOTPDemo } from "@/components/inputs/OtpInput";


export default function VerifiedInputs({ href }) {
    const { router, searchParams } = UseSearchParamsHook()
    const UserNumber = searchParams.get('number');

    // ------------- Redux State Management -------------
    const dispatch = useDispatch();
    const { verified, loading, error } = useSelector(state => state.auth);


    const formik = useFormik({
        initialValues: VerifyClientInitialValue,
        validationSchema: VerifyClientSchema,
        onSubmit: (values) => {
            const body = {
                otp: values.otp,
                phone: `+${values.phone}`,
                action: "register"
            }
            dispatch(VerifyOTP(body)).then((res) => {
                if (res?.payload?.status === 200 || res?.payload?.status === 201) {
                    router.push(`/${href}`);
                    toast.success("Client Verified Successfully", {
                        action: {
                            label: "Hide",
                            onClick: () => toast.dismiss(),
                        }
                    });
                } else {
                    toast.error(res?.payload?.message, {
                        action: {
                            label: "Hide",
                            onClick: () => toast.dismiss(),
                        }
                    })
                    if (res?.payload?.message === "otp is wrong") {
                        formik.setErrors({ "otp": res?.payload?.message });
                    }else{
                        formik.setErrors({ "phone": res?.payload?.message });
                    }
                }
            });
        }
    });



    // -------------------- public Effect ---------------------------
    useEffect(() => {
        if(UserNumber){
            formik.setFieldValue("phone", UserNumber);
        }
    }, [UserNumber])

    return (
        <form id="Verified-Client" onSubmit={formik.handleSubmit} >
            <main className="grid grid-cols-1 gap-4 md:gap-6 mt-5">
                <InputDemo
                    placeHolder={`Enter ${href} phone number`}
                    id="phone"
                    label="Phone Number"
                    style="col-span-3 gap-1"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    type="number"
                    error={formik.errors.phone}
                    disabled={true}
                />
                <InputOTPDemo
                    error={formik.errors.otp}
                    value={formik.values.otp}
                    onChange={e => formik.setFieldValue("otp", e)} />
            </main>
            <div className="w-full flex items-center justify-end gap-7 my-8 " variant="outline">
                <Link href={`/${href}`}
                    className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Cancel</Link>
                <Button
                    type="submit"
                    className="bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Loading..." : `Verified This ${href}`}
                </Button>
            </div>
        </form>
    )
}
