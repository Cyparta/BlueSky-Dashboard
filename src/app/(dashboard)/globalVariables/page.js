'use client';


import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { GetAllVariables, UpdateVariables } from "@/redux/Slices/variable-slice/VariableSlice";
import { CompareValues, setValuesInFormik } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/inputs/Input-demo";


import { VariableInputs } from "@/data/formik/types/VariableInput";
import {  UpdateVariablesSchema } from "@/data/formik/FormikSchema";
import { VariableInitialValue } from "@/data/formik/initial-values/VariableInitialValue";


export default function GlobalVariablePage() {

    const dispatch = useDispatch();
    const { variables, loading, error } = useSelector((state) => state.variables);

    const formik = useFormik({
        initialValues: VariableInitialValue,
        validationSchema: UpdateVariablesSchema,
        onSubmit: (values) => {
            const NewValues = CompareValues(values, variables[0]);
            if (NewValues) {
                dispatch(UpdateVariables({
                    body: NewValues
                })).then((res) => {
                    if (res?.meta?.requestStatus === "fulfilled") {
                        toast.success("Variables Updated", {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        });
                    } else {
                        toast.error("Failed to update Variables", {
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

        dispatch(GetAllVariables()).then((variable) => {
            setValuesInFormik(formik, variable?.payload?.at(0))
        })

    }, []);


    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-blue-800 text-[20px]">Update Variable</h1>
            <form id="add-new-client" onSubmit={formik.handleSubmit} >
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {
                        VariableInputs.map((input, indx) => {
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
