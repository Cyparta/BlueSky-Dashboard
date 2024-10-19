'use client'

import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { AddNewWwClient } from "@/redux/Slices/Client-Slice/ClientStore";
import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";

import { AddClientInitialValue } from "@/data/formik/initial-values/ClientInitialValue";
import { addClientInputs } from "@/data/formik/types/addClient";
import { AddClientSchema } from "@/data/formik/FormikSchema";

export default function AddNewClient() {

    const {router } = UseSearchParamsHook()

    const dispatch = useDispatch();
    const { clients, loading, error } = useSelector((state) => state.clients);

    const formik = useFormik({
        initialValues: AddClientInitialValue,
        validationSchema: AddClientSchema,
        onSubmit: (values) => {
            const body = {
                user: {
                    ...values,
                    phone: `+${values.phone}`
                }
            }
            dispatch(AddNewWwClient(body))
        }
    });

    useEffect(() => {
        if (clients === 200) {
            formik.resetForm();
            toast.success("Client Added Successfully", {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            });
            router.push(`/clients/verified?number=${formik.values.phone}`);
        } else {
            if (clients?.length === 0 && error) {
                formik.setErrors({ "phone": error });
                toast.error(error, {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                });
            }
        }
    }, [error ,clients]);
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-blue-800 text-[20px]">Add new Car</h1>
            <form id="add-new-client" onSubmit={formik.handleSubmit} >
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {
                        addClientInputs.map((input, indx) => {
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
                    <Link href={`/clients`}
                        className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Cancel</Link>
                    <Button
                        type="submit"
                        className="bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Add client"}
                    </Button>
                </div>
            </form>
        </section>
    )
}
