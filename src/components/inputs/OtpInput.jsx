import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@radix-ui/react-dropdown-menu"

export function InputOTPDemo({ style, onChange, error }) {
  return (
    <main className={`grid grid-cols-8 w-full ${style} items-center`}>
      <Label htmlFor={"OTP"} className={`text-[18px] cursor-pointer col-span-8 md:col-span-2 ${error ? "text-red-800" : "text-black"} w-fit`}>enter OTP</Label>
      <div
        className={`col-span-8 md:col-span-6 w-full mx-2`}>
        <InputOTP
          id={"OTP"}
          onChange={onChange}
          maxLength={6}>
          <InputOTPGroup >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        {
        error &&
        <p className="text-red-800 text-xs pt-1 m-0">{error}</p>
      }
      </div>
      
    </main>
  )
}
