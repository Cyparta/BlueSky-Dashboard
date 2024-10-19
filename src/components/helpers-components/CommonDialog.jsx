"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { TextareaDemo } from "../inputs/TextPlaceHolderDemo";
import { useDispatch } from "react-redux";
import { SentMessage } from "@/redux/Slices/Drivers/DriverSlice";
import { toast } from "sonner";

export default function CommonDialog({
  text,
  useID
}) {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const handleOpen = (type, event) => {
    event.preventDefault();
    setFormType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormType(null);
    setMessage("");
    setErrors({});
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setErrors({ message: "Message is required" });
      return;
    }

    setErrors({}); // Clear errors if valid
    dispatch(SentMessage({ id: useID, body: { message } })).then((res) => {
      console.log(res);
      if (res.type == 'drivers/SentMesssage/fulfilled') {
        toast.success("Message Sent");
        setMessage(""); // Clear message
        handleClose();
      } else {
        toast.error("An error occurred while sending the message");
      }
    });
  };
  return (
    <div className="flex items-center gap-2">
        <Button
          onClick={(e) => handleOpen("add", e)}
          className="bg-blue-900 w-[122px] text-gray-200 capitalize flex items-center gap-2 font-medium"
        >
          {text}
        </Button>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            handleClose(); // Reset state when closing the dialog
          }
        }}
        aria-describedby="modal-desc">
        <DialogContent
          id="modal-desc"
          className={`max-h-[90vh] max-w-[80%] md:max-w-[70%] lg:max-w-[40%] overflow-y-auto bg-white ${formType === "new" && "max-h-[222px] max-w-[774px] rounded-lg bg-[#F7F7F7]"}`}
        >

          {formType === "add" && (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <TextareaDemo
                  placeholder="Enter your message here."
                  id="message"
                  label="Message Details"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)} // Directly update message
                  className="border p-2 w-full"
                />
                {errors.message && (
                  <p className="text-red-600">{errors.message}</p>
                )}
                <div className="flex items-center justify-end">
                  <Button type="submit" className="bg-blue-900 text-gray-200">
                    Send
                  </Button>
                </div>
              </form>
            </>
          )
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}
