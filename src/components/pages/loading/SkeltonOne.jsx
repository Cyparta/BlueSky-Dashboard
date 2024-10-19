import { Skeleton } from "@/components/ui/skeleton"

export default function SkeltonOne({number = 3}) {
    return (
        Array.from({ length: number }, (_, i) => (
            <div key={i} className="flex flex-col w-full gap-8 my-4">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="flex gap-3 flex-col">
                    <Skeleton className="h-4 w-full " />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        ))
    )
}
