'use client';

import { useRef, useState } from 'react';

import Image from "next/image";

import classes from '@/style/image-picker.module.css';




export default function ImagePicker({ label, name, style, error, id, value, onChange }) {
    const [ImagePicker, setImagePicker] = useState(null);

    const imageInput = useRef();

    console.log(value)

    //--------------------Public Function--------------------
    function handleImageChange(event) {
        onChange(event);
        const file = event.target.files[0];
        if (!file) {
            setImagePicker(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setImagePicker(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    function handlePickClick() {
        imageInput.current.click();
    }


    return (
        <div className={`${classes.picker}`}>
            <div className={`${classes.controls} col-span-8 md:col-span-6`}>
                <div
                    onClick={handlePickClick}
                    className={`${classes.preview} cursor-pointer ${error && "border-red-800"}`}>
                    {!ImagePicker && !value && <p>No image picked yet.</p>}
                    {(ImagePicker && value) && (
                        <Image
                            src={ImagePicker}
                            alt="The image selected by the user."
                            fill
                        />
                    )}
                    {(!ImagePicker && value) && (
                        <Image
                            src={value}
                            alt="The image selected by the user."
                            fill
                        />
                    )}
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id={id}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                />
            </div>
            {
                error &&
                <p className="text-red-800 text-xs pt-1 m-0">{error}</p>
            }
        </div>
    );
}