'use client'

import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import {  GetSpecificCompany, UpdateCompany } from "@/redux/Slices/company-slice/CompanySlice";
import { CompareValues, CreateFormData, setValuesInFormik } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";


import {  updateCompanyInputs } from "@/data/formik/types/CompanyInput";
import {  UpdateCompanySchema } from "@/data/formik/FormikSchema";
import {  UpdateCompanyInitialValue } from "@/data/formik/initial-values/ComaniesInitialValue";



export default function UpdateCompaniesPage({ params: { companyID } }) {

    const dispatch = useDispatch();
    const { companies, loading } = useSelector((state) => state.companies);

    const formik = useFormik({
        initialValues: UpdateCompanyInitialValue,
        validationSchema: UpdateCompanySchema,
        onSubmit: (values) => {
            const NewValues = CompareValues(values, companies);
            if (NewValues) {
                dispatch(UpdateCompany({
                    id: companyID,
                    body: CreateFormData( NewValues)
                })).then((res) => {
                    console.log(res)
                    if (res?.meta?.requestStatus === "fulfilled") {
                        toast.success("Companies Updated", {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        });
                        console.log(res?.payload)
                    } else {
                        toast.error("Failed to update Companies", {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        });
                    }
                });
            } else {
                toast.warning("No Changes", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    },
                });
            }
        }
    });

    // ------------- Global Effects ----------------------
    useEffect(() => {
        dispatch(GetSpecificCompany(companyID)).then((company) => {
            console.log(company?.payload);
            setValuesInFormik(formik, company?.payload)
        })
    }, []);
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-main-100 text-[20px]">Update Company</h1>
            <form id="add-new-client" onSubmit={formik.handleSubmit} >
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {
                        updateCompanyInputs.map((input, indx) => {
                            return (
                                <InputDemo
                                    key={indx}
                                    placeHolder={input.placeholder}
                                    id={input.id}
                                    label={input.label}
                                    style={input.style}
                                    onChange={input.type === "file" || input.type === "picker" ? e => formik.setFieldValue(input.id, e.target.files[0])
                                        : input.type === "selected" ? e => formik.setFieldValue(input.id, e) : formik.handleChange}
                                    value={formik.values[input.id]}
                                    type={input.type}
                                    error={formik.errors[input.id]}
                                    selectItem={input?.selectItem}
                                    selectValue={input.label}
                                    defaultValue={formik.values[input.id]}
                                    disabled={input?.disabled}
                                />
                            )
                        })
                    }
                </main>
                <div className="w-full flex items-center justify-end gap-7 my-8 " variant="outline">
                    <Link href={`/companies`}
                        className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Cancel</Link>
                    <Button
                        type="submit"
                        className="bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Save Company"}
                    </Button>
                </div>
            </form>
        </section>
    )
}
