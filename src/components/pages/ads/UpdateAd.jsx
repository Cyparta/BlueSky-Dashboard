'use client'

import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { GetSpecificAds, UpdateAds } from "@/redux/Slices/ads-slice/AdsSlice";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";

import { UpdateADSInitialValue } from "@/data/formik/initial-values/AdsInitialValue";
import { updateADSInput } from "@/data/formik/types/Ads";
import { AddADsSchema } from "@/data/formik/FormikSchema";
import { CompareValues, CreateFormData, setValuesInFormik } from "@/lib/utils";


export default function UpdateAdsInput({ params }) {
    const AdsID = params?.adsID

    const dispatch = useDispatch();
    const { create_ads, loading, error } = useSelector((state) => state.ads);

    const formik = useFormik({
        initialValues: UpdateADSInitialValue,
        validationSchema: AddADsSchema,
        onSubmit: (values) => {
            const NewValues = CompareValues(values, create_ads);
            if (NewValues) {
                dispatch(UpdateAds({
                    id: AdsID,
                    body: CreateFormData(NewValues)
                })).then((res) => {
                    if (res?.meta?.requestStatus === "fulfilled") {
                        toast.success("Ads Updated", {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        });
                    } else {
                        toast.error("Failed to update Ads", {
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
        dispatch(GetSpecificAds(AdsID)).then((create_ads) => {
            setValuesInFormik(formik, create_ads?.payload)
        })
    }, []);
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-blue-800 text-[20px]">Update Ads  #{AdsID}</h1>
            <form onSubmit={formik.handleSubmit} >
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {
                        updateADSInput.map((input, indx) => {
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
                    <Link
                        href={`/ads`}
                        className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Cancel</Link>
                    <Button
                        type="submit"
                        className="bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Save Car"}
                    </Button>
                </div>
            </form>
        </section >
    )
}
