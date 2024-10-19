import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"

const GroupRadioBoxDemo = ({style, Radios = [], label}) => {
    return (
        <div className={`grid grid-cols-8 w-full space-x-2`}>
            <Label className="text-[18px] cursor-pointer col-span-8 md:col-span-1">{label}</Label>
            <RadioGroup defaultValue="option-one" className={style}>
                {
                    Radios.map((item, index) => {
                        return (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={item?.InputValue} id={item?.LabelId} defaultChecked={true}/>
                                <Label htmlFor={item?.LabelId} className="cursor-pointer text-[18px] font-[600]">{item?.PlaceHolder}</Label>
                            </div>
                        )
                    })
                }
            </RadioGroup>
        </div>

    );
};

export default GroupRadioBoxDemo;