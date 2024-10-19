'use client';
import * as yup from "yup";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddEmployee, GetAllPermissions } from "@/redux/Slices/employe-slice/EmploySlice";

import { Button, buttonVariants } from "@/components/ui/button";
import InputDemo from "@/components/inputs/Input-demo";
import { SwitchDemo } from "@/components/inputs/Switch";

import LoaderStyle from "@/style/loader.module.css";
import { useFormik } from "formik";


import { toast } from "sonner";
import { GetAllGroups } from "@/redux/Slices/group-slice/groupSlice";

const AddNewEmployeePage = () => {

    const [searchValue, setSearchValue] = useState("");
    const [groupSearch, setGroupSearch] = useState("");

    const dispatch = useDispatch();
    const { employees, loading, error, Permissions, permissionLoading } = useSelector((state) => state.employees);
    const { Groups, groupLoading } = useSelector((state) => state.group);

    const formik = useFormik({
        initialValues: {
            full_name: "",
            phone: "",
            email: "",
            password: "",
            user_permissions: [],
            groups: [],
            gender: "Male",
        },
        validationSchema: yup.object().shape({
            phone: yup.number().required("Phone number required"),
            password: yup.string().required("Password required"),
            full_name: yup.string().required("Full name required"),
            email: yup.string().email("Invalid email").required("Email is required"),
        }),
        onSubmit: (values) => {
            if (values.user_permissions.length === 0) {
                toast.warning("Please select at least one permission", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    },
                })
            } else if (values.groups.length === 0) {
                toast.warning("Please select at least one group", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    },
                })
            } else {
                values.phone = values.phone.toString();
                dispatch(AddEmployee(values)).then((res) => {
                    if (res.payload.status == 201) {
                        toast.success(`${res.payload.message}`, {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        })
                    } else {
                        toast.error(res.payload.message, {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        })
                    }
                })
            }

        }
    });


    // ############# Global Function ############################
    const handleChangeSearch = (e) => {
        { e.target.id == "group" ? setGroupSearch(e.target.value) : setSearchValue(e.target.value) }
    }

    const AddActivePermissionsInFormik = (checked, id) => {
        if (checked) {
            formik.setFieldValue("user_permissions", [...formik.values.user_permissions, id])
        } else {
            formik.setFieldValue("user_permissions", formik.values.user_permissions.filter((item) => item !== id))
        }
    }
    const AddActiveGroupsInFormik = (checked, id) => {
        if (checked) {
            formik.setFieldValue("groups", [...formik.values.groups, id])
        } else {
            formik.setFieldValue("groups", formik.values.groups.filter((item) => item !== id))
        }
    }

    // ################## Public Effects ##########################
    useEffect(() => {
        if (searchValue.length > 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllPermissions(searchValue))
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            dispatch(GetAllPermissions(searchValue))
        }
    }, [searchValue])

    useEffect(() => {
        if (groupSearch.length > 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllGroups(groupSearch))
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            dispatch(GetAllGroups(groupSearch))
        }
    }, [groupSearch])
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3 md:p-8">
            <h1 className="font-bold text-blue-800 text-[20px]">Add new Employee </h1>
            <form id="add-new-client" onSubmit={formik.handleSubmit} >
                <InputDemo placeHolder="Employee name" id="full_name" label="Employee name" value={formik.values.full_name} error={formik.errors.full_name} onChange={formik.handleChange}
                    style="md:gap-8 gap-1 my-6" />
                <InputDemo placeHolder="Employee Email" id="email" label="Employee Email" value={formik.values.email} error={formik.errors.email} onChange={formik.handleChange}
                    style="md:gap-8 gap-1 my-6" />
                <InputDemo placeHolder="+1 (555) 000-0000" id="phone" label="Phone Number" style="md:gap-8 gap-1 "
                    type="number" value={formik.values.phone} error={formik.errors.phone} onChange={formik.handleChange} />
                <InputDemo placeHolder="**********" id="password" label="Password" type="password" style="md:gap-8 gap-1 my-6" value={formik.values.password} error={formik.errors.password} onChange={formik.handleChange} />
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                    <h1 className="font-bold text-[25px]">Permissions</h1>
                    <InputDemo placeHolder="Search..." value={searchValue} onChange={handleChangeSearch} style="w-full gird-col-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 shadow-md p-3 rounded-md">
                    {
                        permissionLoading ?
                            <div className="col-span-3 h-[400px] flex items-center justify-center">
                                <div className={`${LoaderStyle.loader}`}></div>
                            </div> :
                            Permissions.length > 0 ? Permissions.map((permission, index) => {
                                return (
                                    <div key={index} className="">
                                        <SwitchDemo id={permission.id} onCheckedChange={(e) => {
                                            AddActivePermissionsInFormik(e, permission.id)
                                        }} label={["", permission.name]} style="gap-3 " />
                                    </div>
                                )
                            }) : <p className="col-span-3 h-full flex items-center justify-center text-center text-[25px] font-bold border rounded-md">No permissions found</p>
                    }
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mt-12">
                    <h1 className="font-bold text-[25px]">Groups</h1>
                    <InputDemo placeHolder="Search..." value={groupSearch} id="group" onChange={handleChangeSearch} style="w-full gird-col-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 p-3 rounded-md">
                    {
                        groupLoading ?
                            <div className="col-span-3 h-[400px] flex items-center justify-center">
                                <div className={`${LoaderStyle.loader}`}></div>
                            </div>
                            :
                            Groups?.results?.length > 0 ? Groups.results.map((group, index) => {
                                return (
                                    <SwitchDemo key={index} id={group.id} onCheckedChange={(e) => {
                                        AddActiveGroupsInFormik(e, group.id)
                                    }} label={["", group.name]} style="gap-3 " />
                                )
                            }) : <p className="col-span-3 h-full flex items-center justify-center text-center text-[25px] font-bold border rounded-md">No Groups found</p>
                    }
                </div>
                <div className="w-full flex items-center justify-end gap-7 " variant="outline">
                    <Link href="/employees"
                        className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Cancel</Link>
                    <Button
                        type="submit"
                        className="bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Create Employee"}
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default AddNewEmployeePage;

