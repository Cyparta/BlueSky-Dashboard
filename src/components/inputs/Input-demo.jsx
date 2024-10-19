'use client';

import { cn, handleKeyDown, handleWheel } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectDemo } from "./SelectInput";
import ImagePicker from "../image-Picker/image-picker";


const InputDemo = ({ id, label, style,inputStyle, type = "text", placeHolder, disabled = false, value, onChange, error, selectValue = "", selectItem = [], defaultValue, readOnly}) => {

    // ----------- make the max length is 6 number -------------------
    const handleChangeOtp = (event) => {
        // Get the entered value
        let newValue = event.target.value;

        // If the entered value exceeds the maximum length, truncate it
        const maxLength = 6; // For example, limit to 5 digits
        if (newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength);
        }

        // Update the state
        setValue(newValue);
    };


    return (
        <div className={`grid grid-cols-8 w-full ${style} items-center`}>
            {
                label &&
                <Label htmlFor={id} className={`text-[18px] cursor-pointer w-fit col-span-8 md:col-span-2 ${error ? "text-red-800" : "text-black"}`}>{label}</Label>
            }
            <div className={cn("w-full flex-1 col-span-8 md:col-span-6 " , inputStyle)}>
                {
                    type === 'file' ?
                        <Input id={id} type="file" name={id}
                            className={`outline-0  border ${error ? "border-red-800" : "border-gray-300"} focus-visible:ring-1 focus-visible:ring-offset-0   ${disabled && "bg-gray-300"} ${type === "file" && "cursor-pointer"} `}
                            placeholder={placeHolder}
                            onChange={onChange} />
                        :
                        type === 'selected' ?
                            <SelectDemo
                                id={id}
                                placeholder={placeHolder}
                                selectItem={selectItem}
                                selectValue={selectValue}
                                defaultValue={defaultValue}
                                onChange={onChange}
                                value={value} />
                            :

                            type === "picker" ?
                                <ImagePicker
                                    error={error}
                                    id={id}
                                    name={id}
                                    value={value}
                                    onChange={onChange}
                                />
                                :
                                <Input
                                    type={type}
                                    id={id}
                                    className={`outline-0  border ${error ? "border-red-800" : "border-gray-300"} focus-visible:ring-1 focus-visible:ring-offset-0  ${disabled && "bg-gray-300"} ${type === "file" && "cursor-pointer"} `}
                                    placeholder={placeHolder}
                                    onKeyDown={handleKeyDown}
                                    onWheel={handleWheel}
                                    value={value}
                                    onChange={onChange}
                                    disabled={disabled}
                                    name={id}
                                    readOnly={readOnly}
                                    defaultValue={defaultValue}
                                />
                }

                {
                    error &&
                    <p className="text-red-800 text-xs pt-1 m-0">{error}</p>
                }
            </div>

        </div>


    );
};

export default InputDemo;