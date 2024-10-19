"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetSpecificDriver, SentMessage } from "@/redux/Slices/Drivers/DriverSlice";
import CommonDialog from "../helpers-components/CommonDialog";


const SendMessageDriver = ({ driverID }) => {
  const [useID, setUserID] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSpecificDriver(driverID)).then((res) => {
      setUserID(res.payload?.user);
      console.log(res.payload);
    });
  }, [dispatch, driverID]);


  return (
    <div className="flex items-center gap-2  justify-end">
      <CommonDialog
        text="Send Message"
        useID={useID}
      />
    </div>
  );
};

export default SendMessageDriver;
