'use client';

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchDemo({ id, label = [], style = "", onCheckedChange, value, reset }) {
    return (
        <div className={`flex items-center ${style}`}>
            {
                label?.at(0) && <Label htmlFor={id} className="text-[20px] cursor-pointer">{label?.at(0)}</Label>
            }
            <Switch
                id={id}
                name={id}
                onCheckedChange={onCheckedChange}
                checked={reset ? false : value}
            />
            {
                label?.at(1) && <Label htmlFor={id} className="text-[20px] cursor-pointer">{label?.at(1)}</Label>
            }
        </div>
    )
}