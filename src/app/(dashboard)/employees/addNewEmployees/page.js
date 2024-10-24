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
            first_name: "",
            last_name:"",
            phone: "",
            password: "",
            location:"",
            // user_permissions: [],
            // groups: [],
            // gender: "Male",
        },
        validationSchema: yup.object().shape({
            phone: yup.number().required("Phone number required"),
            password: yup.string().required("Password required"),
            first_name: yup.string().required("First name required"),
            last_name: yup.string().required("Last name required"),
            location: yup.string().required("Location required"),   
        }),
        onSubmit: (values) => {
            // if (values.user_permissions.length === 0) {
            //     toast.warning("Please select at least one permission", {
            //         action: {
            //             label: "Close",
            //             onClick: () => toast.dismiss(),
            //         },
            //     })
            // } else if (values.groups.length === 0) {
            //     toast.warning("Please select at least one group", {
            //         action: {
            //             label: "Close",
            //             onClick: () => toast.dismiss(),
            //         },
            //     })
            // } else {
                values.phone = values.phone.toString();
                console.log(values)
                dispatch(AddEmployee(values)).then((res) => {
                    console.log(res)
                    console.log(typeof res.payload.phone)
                    if(typeof res.payload.phone=== 'object'){
                        toast.error('user with this phone already exists.', {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        })
                        formik.setFieldError('phone', 'user with this phone already exists.')
                        return;
                    }
                    if (res.payload.id)  {
                        toast.success(`Employee added successfully`, {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        })
                    } else {
                        toast.error(res.payload.detail, {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        })
                    }
                })
            // }

        }
    });


    // ############# Global Function ############################
    const handleChangeSearch = (e) => {
        { e.target.id == "group" ? setGroupSearch(e.target.value) : setSearchValue(e.target.value) }
    }

    // const AddActivePermissionsInFormik = (checked, id) => {
    //     if (checked) {
    //         formik.setFieldValue("user_permissions", [...formik.values.user_permissions, id])
    //     } else {
    //         formik.setFieldValue("user_permissions", formik.values.user_permissions.filter((item) => item !== id))
    //     }
    // }
    // const AddActiveGroupsInFormik = (checked, id) => {
    //     if (checked) {
    //         formik.setFieldValue("groups", [...formik.values.groups, id])
    //     } else {
    //         formik.setFieldValue("groups", formik.values.groups.filter((item) => item !== id))
    //     }
    // }

    // ################## Public Effects ##########################
    // useEffect(() => {
    //     if (searchValue.length > 0) {
    //         const timer = setTimeout(() => {
    //             dispatch(GetAllPermissions(searchValue))
    //         }, 1000);
    //         return () => clearTimeout(timer);
    //     } else {
    //         dispatch(GetAllPermissions(searchValue))
    //     }
    // }, [searchValue])

    // useEffect(() => {
    //     if (groupSearch.length > 0) {
    //         const timer = setTimeout(() => {
    //             dispatch(GetAllGroups(groupSearch))
    //         }, 1000);
    //         return () => clearTimeout(timer);
    //     } else {
    //         dispatch(GetAllGroups(groupSearch))
    //     }
    // }, [groupSearch])
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3 md:p-8">
            <h1 className="font-bold text-main-100 text-[20px]">Add new Employee </h1>
            <form id="add-new-client" onSubmit={formik.handleSubmit} >
                <InputDemo placeHolder="First name" id="first_name" label="First name" value={formik.values.first_name} error={formik.errors.first_name} onChange={formik.handleChange}
                    style="md:gap-8 gap-1 my-6" />
                <InputDemo placeHolder="Last name" id="last_name" label="Last name" value={formik.values.last_name} error={formik.errors.last_name} onChange={formik.handleChange}
                    style="md:gap-8 gap-1 my-6" />
                <InputDemo placeHolder="+1 (555) 000-0000" id="phone" label="Phone Number" style="md:gap-8 gap-1 "
                    type="text" value={formik.values.phone} error={formik.errors.phone} onChange={formik.handleChange} />
                <InputDemo placeHolder="Location" id="location" label="Location" style="md:gap-8 gap-1 mt-6 "
                    type="text" value={formik.values.location} error={formik.errors.location} onChange={formik.handleChange} />
                <InputDemo placeHolder="**********" id="password" label="Password" type="text" style="md:gap-8 gap-1 my-6" value={formik.values.password} error={formik.errors.password} onChange={formik.handleChange} />
                {/* <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
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
                </div> */}
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

