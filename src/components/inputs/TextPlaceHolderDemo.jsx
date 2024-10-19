import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TextareaDemo({ id, label, style, textAreaStyle, placeHolder, disabled = false, value, onChange, error }) {
  return (
    <div className={`grid grid-cols-1 w-full ${style} items-center`}>
      {label && (
        <Label htmlFor={id} className={`text-[18px] cursor-pointer w-fit ${error ? "text-red-800" : "text-black"}`}>
          {label}
        </Label>
      )}
      <div className="w-full flex-1">
        <Textarea
          id={id}
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
          disabled={disabled}
          name={id}
          className={`outline-0 border ${error ? "border-red-800" : "border-gray-300"} focus-visible:ring-1 focus-visible:ring-offset-0 ${disabled && "bg-gray-300"} ${textAreaStyle} `}
        />
        {error && <p className="text-red-800 text-xs pt-1 m-0">{error}</p>}
      </div>
    </div>
  );
}
