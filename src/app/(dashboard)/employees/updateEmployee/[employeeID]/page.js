'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetAllPermissions, GetSpecificEmployee, UpdateEmployee } from "@/redux/Slices/employe-slice/EmploySlice";

import { Button, buttonVariants } from "@/components/ui/button";
import InputDemo from "@/components/inputs/Input-demo";
import { SwitchDemo } from "@/components/inputs/Switch";

import LoaderStyle from "@/style/loader.module.css";
import { useFormik } from "formik";
import { EmployeeUpdateInitialValue } from "@/data/formik/initial-values/EmployesInitialValue";

import { toast } from "sonner";
import { UpdatedEmployeeSchema } from "@/data/formik/FormikSchema";
import { CompareValues, deepCompareValues } from "@/lib/utils";
import { GetAllGroups } from "@/redux/Slices/group-slice/groupSlice";

const UpdateEmployeePage = ({ params }) => {

    const [searchValue, setSearchValue] = useState("");
    const [employeeData, setEmployeeData] = useState({});
    const [groupSearch, setGroupSearch] = useState("");


    const dispatch = useDispatch()
    const { employees, loading, error, permissionLoading, Permissions, load } = useSelector((state) => state.employees);
    const { Groups, groupLoading } = useSelector((state) => state.group);

    const formik = useFormik({
        initialValues: EmployeeUpdateInitialValue,
        validationSchema: UpdatedEmployeeSchema,
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
            const NewValues = CompareValues(values, employeeData);
            // console.log(NewValues);
            if (NewValues) {
                dispatch(UpdateEmployee({ values, id: params.employeeID })).then((result) => {
                    console.log(result)
                    console.log(params.employeeID);
                    console.log(values);
                    if (result.payload?.id) {
                        toast.success("Employee Updated Successfully", {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        })
                    } else {
                        toast.error(result.payload?.name?.at(0) || result?.payload?.user_permissions?.at(0) || "OOPS  Error It happened  When Updated THis Group !!", {
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        })

                    }
                })
            } else {
                toast.error("No Updated Data", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    },
                })
            }
        }
        // }
    });


    // ############# Global Function ############################
    const handleChangeSearch = (e) => {
        { e.target.id == "group" ? setGroupSearch(e.target.value) : setSearchValue(e.target.value) }
    }

    const AddActivePermissionsToFormik = (checked, id) => {
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
    useEffect(() => {
        dispatch(GetSpecificEmployee(params.employeeID)).then((result) => {
            // formik.setFieldValue("user_permissions", result?.payload.user.user_permissions.map(permission => permission.id));
            formik.setFieldValue("first_name", result?.payload.first_name);
            formik.setFieldValue("last_name", result?.payload.last_name);
            formik.setFieldValue("phone", result?.payload.phone);
            formik.setFieldValue("is_verified", result?.payload.is_verified);
            formik.setFieldValue("accept_cash", result?.payload.accept_cash);
            // formik.setFieldValue("groups", result?.payload.user.groups.map(group => group.id));
            // setEmployeeData({ user_permissions: result?.payload.user.user_permissions.map(permission => permission.id), first_name: result?.payload.user.first_name, phone: result?.payload.user.phone, groups: result?.payload.user.groups.map(group => group.id) })
        })
    }, [])

    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <h1 className="font-bold text-main-100 text-[20px]">Update Employee</h1>
            <form id="update-employee" onSubmit={formik.handleSubmit} >
                <InputDemo placeHolder="First name" id="first_name" label="First name"
                    style="md:gap-8 gap-1 my-6" value={formik.values.first_name} error={formik.errors.first_name} onChange={formik.handleChange} />
                <InputDemo placeHolder="Last name" id="last_name" label="Last name"
                    style="md:gap-8 gap-1 my-6" value={formik.values.last_name} error={formik.errors.last_name} onChange={formik.handleChange} />
                <InputDemo placeHolder="+1 (555) 000-0000" id="phone" label="Phone Number" style="md:gap-8 gap-1 "
                    value={formik.values.phone} error={formik.errors.phone} onChange={formik.handleChange} />
                <InputDemo
                    key="is_verified"
                    placeHolder="is verified"
                    id="is_verified"
                    label="Is verified"
                    style="md:gap-8 gap-1 my-6"
                    type="selected"
                    selectItem={["true", "false"]}
                    onChange={e => formik.setFieldValue("is_verified", e)}
                    value={formik.values.is_verified}
                    error={formik.errors.is_verified}
                    selectValue="Is verified"
                    defaultValue={formik.values.is_verified}
                    disabled={false} // Set as needed, or remove if not required
                />
                <InputDemo
                    key="accept_cash"
                    placeHolder="Accept cash"
                    id="Accept cash"
                    label="Accept cash"
                    style="md:gap-8 gap-1 my-6"
                    type="selected"
                    selectItem={["true", "false"]}
                    onChange={e => formik.setFieldValue("accept_cash", e)}
                    value={formik.values.accept_cash}
                    error={formik.errors.accept_cash}
                    selectValue="Is verified"
                    defaultValue={formik.values.accept_cash}
                    disabled={false} // Set as needed, or remove if not required
                />
                {/* <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mt-5">
                    <h1 className="font-bold text-[25px]">Permissions</h1>
                    <InputDemo placeHolder="Search..." value={searchValue} onChange={handleChangeSearch} style="w-full gird-col-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 shadow-md p-3 rounded-md">
                    {
                        permissionLoading ?
                            <div className="col-span-3 h-[400px] flex items-center justify-center">
                                <div className={`${LoaderStyle.loader}`}></div>
                            </div> :
                            Permissions.length > 0 ? Permissions.map((employee, index) => {
                                return (
                                    <SwitchDemo key={index} id={employee.id} onCheckedChange={(e) => {
                                        AddActivePermissionsToFormik(e, employee.id)
                                    }} label={["", employee.name, employee.description]} value={formik?.values?.user_permissions?.includes(employee?.id) ? true : false} />
                                )
                            }) : <p className="col-span-3 h-full flex items-center justify-center text-center text-[25px] font-bold border rounded-md">No permissions found</p>
                    }
                </div> */}

                {/* <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 mt-12">
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
                                    }} label={["", group.name]} style="gap-3 " value={formik?.values?.groups?.includes(group?.id) ? true : false}/>
                                )
                            }) : <p className="col-span-3 h-full flex items-center justify-center text-center text-[25px] font-bold border rounded-md">No Groups found</p>
                    }
                </div> */}

                <div className="w-full flex items-center justify-end gap-7 mt-4" variant="outline">
                    <Link href="/employees"
                        className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Cancel</Link>
                    <Button
                        type="submit"
                        className="bg-blue-700"
                        disabled={load}
                    >
                        {load ? "Loading..." : "Save Employee"}
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default UpdateEmployeePage;