'use client'

import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { GetSpecificCar ,UpdateCarReducer } from "@/redux/Slices/Cars-slice/CarSlice";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";

import { UpdateCarInitialValue } from "@/data/formik/initial-values/initialValue";
import { updateCarInputs } from "@/data/formik/types/addCar";
import { UpdateCarSchema } from "@/data/formik/FormikSchema";
import { CompareValues, setValuesInFormik } from "@/lib/utils";






export default function UpdateCar({ href, params }) {
    const CarID = params?.carID?.split("PROFILE").at(1)

    const dispatch = useDispatch();
    const { cars, loading, error } = useSelector((state) => state.cars);

    const formik = useFormik({
        initialValues: UpdateCarInitialValue,
        validationSchema: UpdateCarSchema,
        onSubmit: (values) => {
            const NewValues = CompareValues(values, cars);
            if (NewValues) {
                dispatch(UpdateCarReducer({
                    id: CarID,
                    body: NewValues
                })).then((res) => {
                    if (res?.meta?.requestStatus === "fulfilled") {
                        toast.success("Car Updated", {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        });
                    } else {
                        toast.error("Failed to update Car", {
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
        dispatch(GetSpecificCar(CarID)).then((car) => {
            setValuesInFormik(formik, car?.payload)
        })
    }, []);
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-main-100 text-[20px]">Update Economy Car </h1>
            <form onSubmit={formik.handleSubmit} >
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {
                        updateCarInputs.map((input, indx) => {
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
                    <Link
                        href={href}
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
