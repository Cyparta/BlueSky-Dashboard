'use client';

import Link from "next/link";
import Image from "next/image";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteCompany, GetAllCompanies, GetDataReport } from "@/redux/Slices/company-slice/CompanySlice";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTableDemo } from "@/components/helpers-components/DataTabel";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import Pdf from "@/data/Svg/Pdf.svg";
import Exel from "@/data/Svg/Exel.svg";
import allIcons from "@/lib/all-icons";
import { downloadCSV } from "@/lib/downloads";
import Gallery from "@/components/light-gallary/lightGallery";
import { useRouter } from "next/navigation";


const CompaniesTableData = () => {

    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const [pdfData, setPdfData] = useState({});
    const { companies, loading, error } = useSelector(state => state.companies);

    // ---------------------  Public Effect ------------------------
    useEffect(() => {
        if (searchValue.length >= 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllCompanies({ search: searchValue })).then((result) => {
                    console.log(result)
                })

            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [searchValue]);



    // ---------------- Public Function ----------------------
    function handleDeleteCompany(companyID) {
        dispatch(DeleteCompany(companyID)).then((result) => {
            if (result?.meta?.requestStatus === "rejected") {
                toast.success("Company Deleted", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
                dispatch(GetAllCompanies({ search: searchValue }))
            } else {
                toast.error("Error Occur When Deleting This Company", {
                    action: {
                        label: "Hide",
                        onClick: () => toast.dismiss(),
                    }
                })
            }
        });
    }


    const handleChangeSearch = (e) => {
        setSearchValue(e.target.value);
    }


    const handlePagination = (pageNumber) => {
        dispatch(GetAllCompanies({
            page: pageNumber,
            search: searchValue
        }));
    }




    const data = companies?.results?.map((company) => {
        console.log(company)
        return {
            id: company?.id,
            companyName: company?.first_name || "No Company Name Found",
            // companyNumber: company?.user,
            driverCount: company?.drivers_count,
            carsCount: company?.cars_count,
            companyAddress: company?.address,
            createdAt: `${new Date(company?.created_at).toLocaleDateString()}  -   ${new Date(company?.created_at).toLocaleTimeString()}`,
            company_logo: company?.company_logo,
            national_id_number: company?.national_id_number,
            vat_registration_number: company?.vat_registration_number,
        }
    })


    const columns = [
        {
            accessorKey: "company_logo",
            header: () => <div className="text-center">Company Logo</div>,
            cell: ({ row }) =>
                <div className="flex justify-center">
                    <Gallery OneImage_front={row.getValue("company_logo")} />
                </div>,
        },
        {
            accessorKey: "national_id_number",
            header: () => <div className="text-center">National ID</div>,
            cell: ({ row }) => <div className="lowercase text-center">{row.getValue("national_id_number")}</div>,
        },
        {
            accessorKey: "vat_registration_number",
            header: () => <div className="text-center">Vat Registration Number</div>,
            cell: ({ row }) => <div className="lowercase text-center">{row.getValue("vat_registration_number")}</div>,
        },
        {
            accessorKey: "companyName",
            header: () => <div className="text-center">Company Name</div>,
            cell: ({ row }) => <div
                className="lowercase text-center cursor-pointer"
                onClick={() => router.push(`/companies/${row.getValue("id")}`)}>{row.getValue("companyName")}</div>
        },
        // {
        //     accessorKey: "companyNumber",
        //     header: () => <div className="text-center">Company number</div>,
        //     cell: ({ row }) => <div className="lowercase text-center">{row.getValue("companyNumber")}</div>,
        // },
        {
            accessorKey: "driverCount",
            header: () => <div className="text-center">Driver count</div>,
            cell: ({ row }) => <div className=" font-medium text-center">{row.getValue("driverCount")}</div>
        },
        {
            accessorKey: "carsCount",
            header: () => <div className="text-center">Cars count</div>,
            cell: ({ row }) => <div className="text-center font-medium">{row.getValue("carsCount")}</div>
        },
        {
            accessorKey: "companyAddress",
            header: () => <div className="text-center">Company address</div>,
            cell: ({ row }) => <div className="text-center font-medium">{row.getValue("companyAddress")}</div>
        },
        {
            accessorKey: "createdAt",
            header: () => <div className="text-left">Created at</div>,
            cell: ({ row }) => {


                return <div className="text-left font-medium">{row.getValue("createdAt")}</div>
            },
        },
        {
            id: "actions",
            enableHiding: true,
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-full px-4 flex justify-end ">
                                <span className="sr-only">Open menu</span>
                                <p className="h-4 text-[20px] font-bold max-w-fit ">{allIcons.horizental_dots_icon}</p>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem >
                                <Link href={`/companies/${row.getValue("id")}`} className="w-full">Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                <p
                                    className="text-red-800 p-1 rounded-md w-full  cursor-pointer "
                                    onClick={() => handleDeleteCompany(row.getValue("id"))}
                                >
                                    Delete
                                </p>

                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
        {
            accessorKey: "id",
            header: <p className="hidden"></p>,
            cell: ({ row }) => <div className="hidden">{row.getValue("id")}</div>
        },
    ]

     function handlePdf() {
        console.log(companies?.user_type)
        
        if (companies?.user_type == "Admin" || companies?.user_type == "Employee") {
            dispatch(GetDataReport()).then((result) => {
                console.log(result);
                setPdfData(result.payload);
                generatePDF(result.payload, 'admin');
            })
        } else {
            dispatch(GetDataReport()).then((result) => {
               if(result.payload.error ){
                     toast.error(result.payload.error)
                      return;
                    } else{
                        setPdfData(result.payload);
                        generatePDF(result.payload, 'company');
                    }
                
            })
        }
    }
    const generatePDF = async (data, type) => {
        const doc = new jsPDF();
      console.log(data)
        // HTML for header with logo
        const headerHtml = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom:50px">
            <h1 style="font-size: 24px; font-weight: bold;">Sales Report</h1>
            <div style="display: flex; align-items: center; gap: 10px;">
              <p style="font-size: 20px;">Blue_Sky</p>
              <img src='/playstore.png' style="width: 50px; height: 50px;"/>
            </div>
          </div>
        `;
      
        // HTML for 'total_all' table
        const totalAllHtml = `
          <div style="margin-bottom: 50px;">
            <h2 style="font-size:29px; margin-bottom:20px">Sales Overview</h2>
            <table style="width: 100%; border-collapse: separate;">
              <tr style="border-bottom:1px solid black; padding:10px 0px">
                <th colspan="4" style="padding: 10px;width:20%; text-align: left;"></th>
                <th style="padding: 10px; text-align:left">${type === 'admin' ? 'Total Before VAT' : 'Total_completed_price'}</th>
                <th style="padding: 10px; text-align:left">${type === 'admin' ? 'Total After VAT' : 'Total card Completed Price'}</th>
                <th style="padding: 10px; text-align:left">${type === 'admin' ? 'Total Card Completed Price' : 'Total cash Completed Price'}</th>
                <th style="padding: 10px; text-align:left">${type === 'admin' ? 'Total Cash Completed Price' : 'Total Vat Amount'}</th>
                <th style="padding: 10px; text-align:left">${type === 'admin' ? 'Total VAT Amount' : 'Total deducted Amount'}</th>
                ${type === 'admin' ? `<th style="padding: 10px; text-align:left">Total Deducted Amount</th>`:""}
              </tr>
              <tr>
                <td colspan="4" style="padding: 10px; width:20%;">${type === 'admin' ? 'Total all' : 'Total all drivers'}</td>
                <td style="padding:10px">${type === 'admin' ? data.total_all.total_before_vat : data.total_all_drivers.total_completed_price}</td>
                <td style="padding:10px">${type === 'admin' ? data.total_all.total_after_vat : data.total_all_drivers.total_card_completed_price}</td>
                <td style="padding:10px">${type === 'admin' ? data.total_all.total_card_completed_price : data.total_all_drivers.total_cash_completed_price}</td>
                <td style="padding:10px">${type === 'admin' ? data.total_all.total_cash_completed_price : data.total_all_drivers.total_vat_amount}</td>
                <td style="padding:10px">${type === 'admin' ? data.total_all.total_vat_amount : data.total_all_drivers.total_deducted_amount}</td>
                ${type === 'admin' ? `<td style="padding:10px">${data.total_all.total_deducted_amount}</td>` : ''}
              </tr>
            </table>
          </div>
        `;
      
        // HTML for 'company_totals' or 'driver_totals'
        const companyTotalsHtml = `
          <div style="margin-bottom: 50px 0px;">
            <h2 style="font-size:29px; margin-bottom:20px">${type === 'admin' ? 'Company Totals' : 'Driver Totals'}</h2>
            <table style="width: 100%; border-collapse: separate;">
              <tr style="border-bottom:1px solid black; padding:10px 0px">
                <th colspan="4" style="padding: 10px;width:20%; text-align: left;">${type === 'admin' ? 'Company ID' : 'Driver ID'}</th>
                <th style=" padding: 10px; text-align:left">${type === 'admin' ? 'Company Phone' : 'Driver Name'}</th>
                <th style="padding: 10px; text-align:left">Total Before VAT</th>
                <th style="padding: 10px; text-align:left">Total After VAT</th>
                <th style="padding: 10px; text-align:left">Total Card Completed Price</th>
                <th style="padding: 10px; text-align:left">Total Cash Completed Price</th>
                <th style="padding: 10px; text-align:left">VAT Amount</th>
                <th style="padding: 10px; text-align:left">Deducted Amount</th>
              </tr>
              ${type === 'admin' ? data.company_totals.map(company => `
                <tr style="border-bottom:1px solid gray; padding:20px 0px">
                  <td colspan="4" style="padding: 10px;width:20%; text-align: left;">${company.company_id}</td>
                  <td style=" padding: 10px;">${company.company_phone}</td>
                  <td style=" padding: 10px;">${company.total_before_vat}</td>
                  <td style=" padding: 10px;">${company.total_after_vat}</td>
                  <td style=" padding: 10px;">${company.total_card_completed_price}</td>
                  <td style=" padding: 10px;">${company.total_cash_completed_price}</td>
                  <td style=" padding: 10px;">${company.vat_amount}</td>
                  <td style=" padding: 10px;">${company.deducted_amount}</td>
                </tr>
              `).join('') : data.driver_totals.map(driver => `
                <tr style="border-bottom:1px solid gray; padding:20px 0px">
                  <td colspan="4" style="padding: 10px;width:20%; text-align: left;">${driver.driver_id}</td>
                  <td style=" padding: 10px;">${driver.driver_name}</td>
                  <td style=" padding: 10px;">${driver.total_before_vat}</td>
                  <td style=" padding: 10px;">${driver.total_after_vat}</td>
                  <td style=" padding: 10px;">${driver.total_card_completed_price}</td>
                  <td style=" padding: 10px;">${driver.total_cash_completed_price}</td>
                  <td style=" padding: 10px;">${driver.vat_amount}</td>
                  <td style=" padding: 10px;">${driver.deducted_amount}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        `;
      
        // Create container for HTML content
        const container = document.createElement('div');
        container.innerHTML = `
          ${headerHtml}
          ${totalAllHtml}
          ${companyTotalsHtml}
        `;
        document.body.appendChild(container);
      
        // Convert HTML to canvas
        const canvas = await html2canvas(container);
        const imgData = canvas.toDataURL('image/png');
      
        // Add image to PDF
        doc.addImage(imgData, 'PNG', 10, 10, 190, 0); // Adjust width and height if needed
      
        // Remove the container after generating canvas
        document.body.removeChild(container);
      
        // Download PDF
        doc.save('report.pdf');
      };
      
    return (
        <div className="w-full">

            {/* Table Header */}
            <header className="flex items-center justify-between w-full flex-col lg:flex-row">
                <div className="flex items-center gap-4">
                    <Image src={Pdf} alt="pdf" width={30} height={30} className="cursor-pointer" onClick={handlePdf} />
                    <Image src={Exel} alt="excel" width={30} height={30} className="cursor-pointer" onClick={() => downloadCSV(data)} />
                </div>
                <div className="flex items-center justify-center flex-col lg:flex-row py-4 gap-4">
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleChangeSearch}
                        className="outline-0 w-[300px] md:w-[400px] flex-1 focus-visible:ring-1 focus-visible:ring-offset-0 border"
                    />
                    <Link
                        href="/companies/addNewCompanies"
                        className="bg-blue-900 text-gray-200 hover:bg-blue-900 text-[16px] px-4 py-2 rounded-md"
                    >
                        Add New Companies
                    </Link>
                </div>
            </header>

            {/* Table Data */}
            <DataTableDemo data={data} columns={columns} loading={loading} itemsNumber={companies?.count} onPageChange={handlePagination} />
        </div>
    )
};

export default CompaniesTableData;