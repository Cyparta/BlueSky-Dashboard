import Link from 'next/link'
 
export default function NotFound() {
  return (
    <section className=" flex items-center justify-center bg-red-500 min-h-screen rounded-md shadow-md flex-col gap-8">
      <h2 className='text-[60px] font-bold text-white'>OOPS !!!</h2>
      <p className='text-[40px] font-semibold text-white'>Could not find requested resource</p>
      <Link href="/" className='p-3 bg-blue-900 text-white font-[600]  rounded-md'>Return Home</Link>
    </section>
  )
}