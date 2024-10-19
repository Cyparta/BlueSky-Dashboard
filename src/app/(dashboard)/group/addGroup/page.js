'use client';
import * as yup from "yup";
import InputDemo from "@/components/inputs/Input-demo";
import { SwitchDemo } from "@/components/inputs/Switch";
import { GetAllPermissions } from "@/redux/Slices/employe-slice/EmploySlice";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, buttonVariants } from "@/components/ui/button";
import { useFormik } from "formik";
import { useEffect } from "react";
import LoaderStyle from "@/style/loader.module.css";
import { toast } from "sonner";
import { Add_Group } from "@/redux/Slices/group-slice/groupSlice";


const AddGroup = () => {
  const [searchValue, setSearchValue] = useState("");
  const [reset, setReset] = useState(false);
  const { loading,Permissions,  permissionLoading } = useSelector((state) => state.employees);
  const { load, error ,Groups } = useSelector((state) => state.group);

  const dispatch = useDispatch();


  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
    
}
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

const formik = useFormik({
  initialValues: {
     name:"",
     permissions:[],
  },
  validationSchema: yup.object().shape({
      name: yup.string().required("Group name required"),
  }),
  onSubmit: (values) => {
      if (values.permissions.length === 0) {
          toast.warning("Please select at least one permission", {
              action: {
                  label: "Close",
                  onClick: () => toast.dismiss(),
              },
          })
      }else{
          dispatch(Add_Group(values)).then((res) =>  {
            if(res.payload.name[0]=="group with this name already exists."){
                toast.error("group with this name already exists.", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    },
                });
            }else{
             
              toast.success("Group Added successfully", {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
            formik.resetForm();
            setReset(true);
            }
          })
      }
  
  }
      
});

const AddActivePermissionsInFormik = (checked, id) => {
  if (checked) {
      formik.setFieldValue("permissions", [...formik.values.permissions, id])
  } else {
      formik.setFieldValue("permissions", formik.values.permissions.filter((item) => item !== id))
  }
}
  return (
    <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
      <h1 className="font-bold text-blue-800 text-[20px]">Add Group </h1>
      <form id="addGroup" onSubmit={formik.handleSubmit}>
        <InputDemo placeHolder="Group name" id="name" label="Group name"
          style="md:gap-8 gap-1 my-6" value={formik.values.name} error={formik.errors.name} onChange={formik.handleChange}/>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                    <h1 className="font-bold text-[25px]">Permissions</h1>
                    <InputDemo placeHolder="Search..."  value={searchValue} onChange={handleChangeSearch} style="w-full gird-col-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                    {
                        permissionLoading ?
                            <div className="col-span-3 h-full flex items-center justify-center">
                                <div className={`${LoaderStyle.loader}`}></div>
                            </div> :
                            Permissions.length > 0 ? Permissions.map((employee, index) => {
                                return (
                                    <SwitchDemo key={index} id={employee.id} onCheckedChange={(e) => {
                                        AddActivePermissionsInFormik(e, employee.id)
                                        
                                    }} label={["", employee.name, employee.description]} reset={reset}/>
                                )
                            }) : <p className="col-span-3 h-full flex items-center justify-center text-center text-[25px] font-bold border rounded-md">No permissions found</p>
                    }
                </div>
                <div className="w-full flex items-center justify-end gap-7 " variant="outline">
                    <Link href="/group"
                        className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>Cancel</Link>
                    <Button
                        type="submit"
                        className="bg-blue-700"
                        disabled={loading}
                    >
                        {load? "Loading..." : "Add Group"}
                    </Button>
                </div>

      </form>
    </section>
  );
};

export default AddGroup;