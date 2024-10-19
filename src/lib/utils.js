import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"




export function cn(...inputs) {
  return twMerge(clsx(inputs))
}







// clear default input numbers


export const handleKeyDown = (event) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
};

export const handleWheel = (event) => {
  event.target.blur();
}

export function CreateFormData(values, formData = new FormData()) {
  Object.keys(values).map((key) => {
    formData.append(key, values[key]);
  });
  return formData;
}


/* 
  ########################################## 

   --- Set Values In Formik
   --- Compare Values In Formik

   ##########################################
*/

export function setValuesInFormik(formik, data) {
  Object.keys(formik.values).map((key) => {
    formik.setFieldValue(key, data[key])
  })
}


export function CompareValues(values, data) {


  const NewValues = Object.keys(values).filter((key) => {
    if (typeof (data[key]) === "boolean") {
      return values[key] !== String(data[key])
    }
    return values[key] !== data[key]
  }).map((key) => {
    return { [key]: values[key] }
  })

  if (NewValues.length === 0) {
    return false
  } else {
    const mergedObject = Object.assign({}, ...NewValues);
    return mergedObject
  }
}

export function deepCompareValues(values, data) {
  // Helper function to compare two values deeply
  function isDifferent(value1, value2) {
    if (typeof value1 !== typeof value2) {
      return true;
    }
    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (value1.length !== value2.length) {
        return true;
      }
      for (let i = 0; i < value1.length; i++) {
        if (isDifferent(value1[i], value2[i])) {
          return true;
        }
      }
      return false;
    }
    if (typeof value1 === 'object' && value1 !== null && value2 !== null) {
      return deepCompareValues(value1, value2);
    }
    return value1 !== value2;
  }

  // Get the differing keys and values
  const NewValues = Object.keys(values).filter((key) => {
    if (typeof data[key] === "boolean") {
      return values[key] !== String(data[key]);
    }
    return isDifferent(values[key], data[key]);
  }).map((key) => {
    return { [key]: values[key] };
  });

  // Return false if no differences, otherwise return the differing key-value pairs
  if (NewValues.length === 0) {
    return false;
  } else {
    const mergedObject = Object.assign({}, ...NewValues);
    return mergedObject;
  }
}








