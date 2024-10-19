
'use client'

import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { CreateAds } from "@/redux/Slices/ads-slice/AdsSlice";
import { CreateFormData } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";


import { addADSInput } from "@/data/formik/types/Ads";
import { AddADsSchema } from "@/data/formik/FormikSchema";
import { AddADSInitialValue } from "@/data/formik/initial-values/AdsInitialValue";



const AddNewAds = () => {
    const dispatch = useDispatch();
    const { create_ads, loading } = useSelector((state) => state.ads);

    const formik = useFormik({
        initialValues: AddADSInitialValue,
        validationSchema: AddADsSchema,
        onSubmit: (values) => {
            dispatch(CreateAds(CreateFormData(values)));
        }
    });


    useEffect(() => {
        if (create_ads === 201) {
            formik.resetForm();
            toast.success("Cars Added Successfully", {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            });
        } else {
            if (create_ads?.length !== 0 && create_ads !== 201) {
                formik.setErrors({ [Object.keys(create_ads)?.at(0)]: create_ads[Object.keys(create_ads)?.at(0)][0] });
                toast.error(create_ads[Object?.keys(create_ads)?.at(0)][0], {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                });
            }
        }
    }, [create_ads]);

    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-blue-800 text-[20px]">Add new Car</h1>
            <form id="add-new-client" onSubmit={formik.handleSubmit} >
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {
                        addADSInput.map((input, indx) => {
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
                    <Link href={`/ads`}
                        className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Cancel</Link>
                    <Button
                        type="submit"
                        className="bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Add Car"}
                    </Button>
                </div>
            </form>
        </section>);
};

export default AddNewAds;

