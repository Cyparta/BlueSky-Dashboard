
'use client'

import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { AddNewCar } from "@/redux/Slices/Cars-slice/CarSlice";
import { CreateFormData } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";

import { initial_value } from "@/data/formik/initial-values/initialValue";
import { addCarInput } from "@/data/formik/types/addCar";
import { CarSchema } from "@/data/formik/FormikSchema";






const AddNewWCar = ({ href }) => {

    const dispatch = useDispatch();
    const { cars, loading } = useSelector((state) => state.cars);

    const formik = useFormik({
        initialValues: initial_value,
        validationSchema: CarSchema,
        onSubmit: (values) => {
            dispatch(AddNewCar(CreateFormData(values)));
        }
    });



    useEffect(() => {
        if (cars === 201) {
            formik.resetForm();
            toast.success("Cars Added Successfully", {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            });
        } else {
            if (cars?.length !== 0 && !cars?.results) {
                formik.setErrors({ [Object.keys(cars)?.at(0)]: cars[Object.keys(cars)?.at(0)][0] });
                toast.error(cars[Object?.keys(cars)?.at(0)][0], {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                });
            }
        }
    }, [cars]);

    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-blue-800 text-[20px]">Add new Car</h1>
            <form id="add-new-client" onSubmit={formik.handleSubmit} >
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {
                        addCarInput.map((input, indx) => {
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
                    <Link href={`/${href}`}
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

export default AddNewWCar;

