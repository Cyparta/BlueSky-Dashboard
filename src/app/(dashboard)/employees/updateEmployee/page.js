'use client';

import Link from "next/link";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetSpecificEmployee } from "@/redux/Slices/employe-slice/EmploySlice";

import { buttonVariants } from "@/components/ui/button";
import InputDemo from "@/components/inputs/Input-demo";

import LoaderStyle from "@/style/loader.module.css";
import { useFormik } from "formik";
import { EmployeeDetailInitialValue } from "@/data/formik/initial-values/EmployesInitialValue";

import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";
import { setValuesInFormik } from "@/lib/utils";

const PageEmployeeUpdated = () => {
    const { searchParams } = UseSearchParamsHook()
    let employeeId = searchParams.get("employeeId")

    const dispatch = useDispatch()
    const { employees, loading, error} = useSelector((state) => state.employees);

    const formik = useFormik({
        initialValues: EmployeeDetailInitialValue
    });

    // ################## Public Effects ##########################
    useEffect(() => {
        dispatch(GetSpecificEmployee(employeeId))
    }, [])

    useEffect(() => {
        employees?.user && setValuesInFormik(formik, employees?.user)
    }, [employees])

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 h-[400px] overflow-auto">
                <div className="col-span-3 h-full flex items-center justify-center">
                    <div className={`${LoaderStyle.loader}`}></div>
                </div>
            </div>
        )
    }

    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <form id="add-new-client">
                <InputDemo placeHolder="Employee name" id="first_name" label="Employee name"
                    style="md:gap-8 gap-1 my-6" disabled={true} value={formik.values.first_name} onChange={formik.handleChange} />
                <InputDemo placeHolder="+1 (555) 000-0000" id="phone" label="Phone Number" style="md:gap-8 gap-1 "
                    type="text" disabled={true} value={formik.values.phone} onChange={formik.handleChange} />
                <InputDemo placeHolder="Employee Gender" id="gender" label="Employee Gender" style="md:gap-8 gap-1 my-6"
                    type="text" disabled={true} onChange={formik.handleChange} value={formik.values.gender} />
                <InputDemo placeHolder="Created At" id="date_joined" label="Created At" style="md:gap-8 gap-1 my-6"
                    disabled={true} onChange={formik.handleChange} value={formik.values.date_joined} />
                <h1 className="font-bold text-[25px]">Employee Permissions</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 max-h-[400px] overflow-auto shadow-md p-3">
                    {
                        employees?.user?.user_permissions?.length > 0 ?
                            employees?.user?.user_permissions?.map((ele, index) => {
                                return (
                                    <p key={index}> {ele?.name} </p>
                                )
                            }) :
                            <p className="col-span-3 h-full flex items-center justify-center text-center text-[25px] font-bold border rounded-md">No permissions found</p>
                    }
                </div>
                <h1 className="font-bold text-[25px]">Employee Group Permissions</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 max-h-[400px] overflow-auto">
                    {
                        employees?.user?.groups?.length > 0 ?
                            employees?.user?.groups?.map((ele, index) => {
                                return (
                                    <p key={index}> {ele?.name} </p>
                                )
                            })
                            : <p className="col-span-3 h-[400px] flex items-center justify-center text-center text-[25px] font-bold border rounded-md">No Group permissions found</p>
                    }
                </div>
                <div className="w-full flex items-center justify-end gap-7 " variant="outline">
                    <Link href="/employees"
                        className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Back To Page Employee</Link>
                </div>
            </form>
        </section>
    );
};

export default PageEmployeeUpdated;