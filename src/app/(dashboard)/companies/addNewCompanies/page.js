'use client'

import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { CreateCompany } from "@/redux/Slices/company-slice/CompanySlice";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";


import { addCompanyInputs } from "@/data/formik/types/CompanyInput";
import { AddCompanySchema } from "@/data/formik/FormikSchema";
import { AddCompanyInitialValue } from "@/data/formik/initial-values/ComaniesInitialValue";
import { CreateFormData } from "@/lib/utils";


export default function AddNewCompaniesPage() {

    const dispatch = useDispatch();
    const { companies, loading, error } = useSelector((state) => state.companies);

    const formik = useFormik({
        initialValues: AddCompanyInitialValue,
        validationSchema: AddCompanySchema,
        onSubmit: (values) => {
            const body = {
                ...values,
                phone: `+${values.phone}`
            }
            // console.log(body)
            dispatch(CreateCompany(CreateFormData(body))).then(res => {
                // console.log(res)
                if (res?.payload?.detail) {
                    toast.error(res?.payload?.detail, {
                        action: {
                            label: "Close",
                            onClick: () => toast.dismiss(),
                        }
                    });
                }
            })
        }
    });

    useEffect(() => {
        if (companies === 201) {
            formik.resetForm();
            toast.success("Company Added Successfully", {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            });
        } else {
            if (companies?.length !== 0 && !companies?.results && !companies?.detail) {
                const firstKey = Object.keys(companies)?.at(0); // Get the first key safely
                const firstCompanyValue = companies?.[firstKey]; // Safely access the value using the first key
            
                if (firstCompanyValue && Array.isArray(firstCompanyValue) && firstCompanyValue[0]) { 
                    // Check if firstCompanyValue is defined, is an array, and has a first element
                    formik.setErrors({ [firstKey]: firstCompanyValue[0] });
                    toast.error(firstCompanyValue[0], {
                        action: {
                            label: "Close",
                            onClick: () => toast.dismiss(),
                        }
                    });
                }
            }
            
        }
    }, [companies]);



    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-main-100 text-[20px]">Add new Company</h1>
            <form id="add-new-client" onSubmit={formik.handleSubmit} >
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {
                        addCompanyInputs.map((input, indx) => {
                            return (
                                <InputDemo
                                    key={indx}
                                    placeHolder={input.placeholder}
                                    id={input.id}
                                    label={input.label}
                                    style={input.style}
                                    onChange={input.type === "file" ? e => formik.setFieldValue(input.id, e.target.files[0])
                                        : input.type === "selected" ? e => formik.setFieldValue(input.id, e) : formik.handleChange}
                                    value={formik.values[input.id]}
                                    type={input.type}
                                    error={formik.errors[input.id]}
                                    selectItem={input?.selectItem}
                                    selectValue={input.label}
                                    defaultValue={formik.values[input.id]}
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
                        {loading ? "Loading..." : "Add Company"}
                    </Button>
                </div>
            </form>
        </section>
    )
}
