import VerifiedInputs from "@/components/pages/verified/VerifiedInputs";


export default function VerifiedPage() {
  return (
    <section className="flex flex-col gap-5 p-8 ">
        <h1 className='text-[25px] font-bold text-main-100'>Verified Client</h1>
        <p className="font-mono text-xl">Please Enter the Client Number And OTP</p>
        <VerifiedInputs href="clients"/>
    </section>
  )
}
