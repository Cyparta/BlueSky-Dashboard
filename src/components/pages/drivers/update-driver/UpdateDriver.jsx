'use client'

import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { GetSpecificDriver , UpdateDriverReducer } from "@/redux/Slices/Drivers/DriverSlice";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";

import { UpdateDriverInitialValue } from "@/data/formik/initial-values/DriversInitialValue";
import { updateDriverInputs } from "@/data/formik/types/DriversInputs";
import { UpdateDriverSchema } from "@/data/formik/FormikSchema";
import { CompareValues, setValuesInFormik } from "@/lib/utils";




export default function UpdateDriver({ params }) {
    const DriverID = params?.driverID?.split("PROFILE").at(1)

    const dispatch = useDispatch();
    const { drivers, loading, error } = useSelector((state) => state.drivers);

    const formik = useFormik({
        initialValues: UpdateDriverInitialValue,
        validationSchema: UpdateDriverSchema,
        onSubmit: (values) => {
            const NewValues = CompareValues(values, drivers);   
            if (NewValues) {
                dispatch(UpdateDriverReducer({
                    id: DriverID,
                    body: NewValues
                })).then((res) => {
                    if (res?.meta?.requestStatus === "fulfilled") {
                        toast.success("Driver Updated", {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        });
                    } else {
                        toast.error("Failed to update Driver", {
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
        dispatch(GetSpecificDriver(DriverID)).then((driver) => {
            const normalizedData = {
                ...driver?.payload,
                gender: driver?.payload?.gender?.toLowerCase(),  // Normalize gender to lowercase
                is_verified: driver?.payload?.is_verified?.toString().toLowerCase()  // Convert to string and lowercase
            };
    
            setValuesInFormik(formik, normalizedData);
        })
        
    }, []);

    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-main-100 text-[20px]">Update  Driver</h1>
            <form onSubmit={formik.handleSubmit} >
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {
                        updateDriverInputs.map((input, indx) => {
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
                                    disabled={input?.disabled}
                                />
                            )
                        })
                    }
                </main>
                <div className="w-full flex items-center justify-end gap-7 my-8 " variant="outline">
                    <Link href={`/drivers`}
                        className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Cancel</Link>
                    <Button
                        type="submit"
                        className="bg-main-100"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Save Driver"}
                    </Button>
                </div>
            </form>
        </section>
    )
}
