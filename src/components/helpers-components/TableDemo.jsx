import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import LoaderStyle from "@/style/loader.module.css";


const TableDemo = ({ headers = [], Rows = [], Loading = false }) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {
                        headers.map((header, index) => (
                            <TableHead key={index} className={header?.className}>{header.label}</TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Loading ?
                        <TableRow className={`h-[500px] flex justify-center items-center`}>
                            <TableCell className={`${LoaderStyle.loader}`}></TableCell>
                        </TableRow>
                        : Rows?.length > 0 ? (
                            Rows?.map((Row, index) => (
                                <TableRow key={index} className={`cursor-pointer ${Row?.tableBodyClassName}`}>
                                    {
                                        Row?.items.map((item, index) => (
                                            <TableCell key={index} className={item?.className}>{item.label}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        ) :
                            <TableRow className="h-[500px] w-full flex justify-center items-center ">
                                <TableCell className="text-[18px] font-bold text-gray-400">No Data Found</TableCell>
                            </TableRow>
                }
            </TableBody>
        </Table>
    );
};

export default TableDemo;