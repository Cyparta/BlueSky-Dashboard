'use client';

import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";
import { ChangePassword } from "@/redux/Slices/auth-slice/AuthSlice";
import { UpdatePasswordSchema } from "@/data/formik/FormikSchema";
import { ChangePasswordInitialValue } from "@/data/formik/initial-values/AuthInitialValue";

import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import InputDemo from "@/components/inputs/Input-demo";

import allIcons from "@/lib/all-icons";



const UpdatePassword = () => {
    const {router} = UseSearchParamsHook();

    const dispatch = useDispatch();
    const { error, loading, updatePassword } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: ChangePasswordInitialValue,
        validationSchema: UpdatePasswordSchema,
        onSubmit: (values) => {
            dispatch(ChangePassword(values))
        }
    });

    //----------------- Public Effect ----------------
    useEffect(() => {
        if (updatePassword.status === 200) {
            formik.resetForm();
            router.push("/profile");
            toast.success("Password Changes Successfully", {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            });
        } else if (updatePassword.status === 400) {
            toast.error(updatePassword?.message, {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                }
            });
            formik.setErrors({ "old_password": updatePassword?.message });
        } else {
            if (updatePassword?.length === 0 && error) {

                toast.error(error, {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                });
            }
        }
    }, [error, updatePassword]);

    // --------------------- Return JSX ---------------
    return (
        <div className="grid grid-cols-8 space-x-1">
            <p className="text-[18px] col-span-8 md:col-span-2">Password</p>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex col-span-8 md:col-span-6 items-center rounded-md border-2 p-2 cursor-pointer">
                        <p className="flex-1">************</p>
                        <p className="text-main-100">{allIcons?.edit_icon}</p>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px]">
                    <DialogHeader>
                        <DialogTitle className="text-main-100 font-mono text-[20px] text-center">Change
                            Password</DialogTitle>
                        <DialogDescription className="text-center">
                            Your password must be at least 8 characters long and contain at least one letter and one
                            digit
                        </DialogDescription>
                    </DialogHeader>
                    <form id="Change-User-Password" onSubmit={formik.handleSubmit} >
                        <div className="grid gap-4 py-4">
                            <InputDemo placeHolder="Current Password" id="old_password" label="Current Password" style="md:gap-8"
                                type="password" error={formik.errors.old_password} onChange={formik.handleChange} value={formik.values.old_password} />
                            <InputDemo placeHolder="New Password" id="new_password" label="New Password"
                                style="md:gap-8" error={formik.errors.new_password} type="password" onChange={formik.handleChange} value={formik.values.new_password} />
                            <InputDemo placeHolder="Confirm Password" id="confirm_new_password" label="Confirm Password"
                                style="md:gap-8" error={formik.errors.confirm_new_password} type="password" onChange={formik.handleChange} value={formik.values.confirm_new_password} />
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                className="bg-blue-700"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdatePassword;