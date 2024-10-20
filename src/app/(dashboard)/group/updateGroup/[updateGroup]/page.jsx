'use client'
import * as yup from "yup";
import InputDemo from '@/components/inputs/Input-demo'
import { SwitchDemo } from '@/components/inputs/Switch'
import { Button, buttonVariants } from "@/components/ui/button";
import { GetAllPermissions } from '@/redux/Slices/employe-slice/EmploySlice'
import { useFormik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoaderStyle from "@/style/loader.module.css";
import { GetSpecificGroups, UpdateGroup } from "@/redux/Slices/group-slice/groupSlice";
import { toast } from "sonner";
import { deepCompareValues } from "@/lib/utils";

const GroupUpdate = ({ params }) => {

  let arr = [];
  const [searchValue, setSearchValue] = useState("");
  const [dataPer, setDataPer] = useState([]);
  const [groupData, setGroupData] = useState({});

  const { loading, Permissions, permissionLoading } = useSelector((state) => state.employees);
  const { Groups, groupLoading } = useSelector((state) => state.group);
  const dispatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      name: "",
      permissions: [],
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
      } else {
        const NewValues = deepCompareValues(values, groupData);
        if(NewValues){
          dispatch(UpdateGroup({ values, id: params.updateGroup })).then((result) => {
          if (result.payload?.id) {
            toast.success("Group IS Updated Successfully", {
              action: {
                label: "Close",
                onClick: () => toast.dismiss(),
              },
            })
          } else {
            toast.error(result.payload?.name?.at(0) || result?.payload?.permissions?.at(0) || "OOPS  Error It happened  When Updated THis Group !!" , {
              action: {
                label: "Close",
                onClick: () => toast.dismiss(),
              },
            })

          }
        })}else{
          toast.error("Nothing Change" , {
            action: {
              label: "Close",
              onClick: () => toast.dismiss(),
            },
          })
        }
        
      }
    }
  });

  //------------------- Public Effects ---------------------
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
    dispatch(GetSpecificGroups(params.updateGroup)).then((result) => {
      setDataPer(result?.payload.permissions.map(permission => permission.id));
      formik.setFieldValue("permissions", result?.payload.permissions.map(permission => permission.id));
      formik.setFieldValue("name", result?.payload.name);
      setGroupData({permissions:result?.payload.permissions.map(permission => permission.id),name:result?.payload.name})

    })
  }, [])

  //--------------- Global Functions --------------------
  const AddActivePermissionsInFormik = (checked, id) => {
    if (checked) {
      arr = dataPer;
      arr.push(id);
      setDataPer(arr);
      formik.setFieldValue("permissions", dataPer);
    } else {
      arr = dataPer;
      arr = arr.filter(item => item !== id);
      setDataPer(arr);
      formik.setFieldValue("permissions", arr);
    }
  };

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
      <h1 className="font-bold text-main-100 text-[20px]">Update Group </h1>
      <form id="addGroup" onSubmit={formik.handleSubmit}>
        <InputDemo placeHolder="Group name" id="name" label="Group name"
          style="md:gap-8 gap-1 my-6" value={formik.values.name} error={formik.errors.name} onChange={formik.handleChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <h1 className="font-bold text-[25px]">Permissions</h1>
          <InputDemo placeHolder="Search..." value={searchValue} onChange={handleChangeSearch} style="w-full gird-col-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 ">
          {
            permissionLoading ?
              <div className="col-span-3 h-full flex items-center justify-center">
                <div className={`${LoaderStyle.loader}`}></div>
              </div> :
              Permissions.length > 0 ? Permissions.map((employee, index) => {
                return (
                  <SwitchDemo key={index} id={employee.id} onCheckedChange={(e) => {
                    const isChecked = e;
                    AddActivePermissionsInFormik(isChecked, employee.id);
                  }}
                    value={dataPer?.some((id) => id === employee.id)}
                    label={["", employee.name, employee.description]} />
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
            disabled={groupLoading}
          >
            {groupLoading ? "Loading..." : "Update Group"}

          </Button>
        </div>
      </form>
    </section>
  )
}
export default GroupUpdate;
