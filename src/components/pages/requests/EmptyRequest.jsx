import Image from 'next/image'
import emptyRequestImage from '@/data/Svg/EmptyRequests.svg'

export default function EmptyRequest() {
    return (
        <div className='flex-1 flex justify-center items-center flex-col gap-5 '>
            <Image src={emptyRequestImage} alt='Empty Requests' />
            <p className='text-center max-w-[200px] text-[#6E7C87]'>No requests found,
                Wait until any requests sent</p>
        </div>
    )
}
