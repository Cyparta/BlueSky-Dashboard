'use client'

import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { UpdateClients, GetSpecificClient } from "@/redux/Slices/Client-Slice/ClientStore";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";

import { UpdateClientInitialValue } from "@/data/formik/initial-values/ClientInitialValue";
import { updateClientInputs } from "@/data/formik/types/addClient";
import { UpdateClientSchema } from "@/data/formik/FormikSchema";
import { CompareValues, setValuesInFormik } from "@/lib/utils";




export default function UpdateClient({ params }) {
    const ClientID = params.clientID.split("PROFILE").at(1)

    const dispatch = useDispatch();
    const { clients, loading, error } = useSelector((state) => state.clients);

    const formik = useFormik({
        initialValues: UpdateClientInitialValue,
        validationSchema: UpdateClientSchema,
        onSubmit: (values) => {
            const NewValues = CompareValues(values, clients);
            if (NewValues) {
                dispatch(UpdateClients({
                    id: ClientID,
                    body: NewValues
                })).then((res) => {
                    if (res?.meta?.requestStatus === "fulfilled") {
                        toast.success("Client Updated", {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        });
                    } else {
                        toast.error("Failed to update client", {
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
        dispatch(GetSpecificClient(ClientID)).then((client) => {
            setValuesInFormik(formik, client?.payload)
        })
    }, []);

    
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-main-100 text-[20px] mb-3">Update Client</h1>
            <form onSubmit={formik.handleSubmit} >
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {
                        updateClientInputs.map((input, indx) => {
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
                    <Link href={`/clients`}
                        className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Cancel</Link>
                    <Button
                        type="submit"
                        className="bg-main-100"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Save client"}
                    </Button>
                </div>
            </form>
            {/* <Button
                    type="button"
                    className="bg-blue-700 2xl:ml-[200px] xl:ml-[150px] ml-1 mt-4">
                    Send OTP
                </Button>
                <InputDemo placeHolder="1 - 2 - 3 - 4 - 5 - 6" id="OTP" label="OTP" style="md:gap-8 gap-1 my-6"
                           type="number" maxLength={5}/> */}
        </section>
    )
}
