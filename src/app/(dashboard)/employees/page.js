import EmployeeTableData from "@/data/table-data/employees/EmployeeTableData";

const EmployeePage = () => {
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-4">
            <h1 className="text-[18px] font-bold text-blue-800 uppercase">Employees</h1>
            <p className="text-gray-400">This is your most recent cars at the top</p>
            <EmployeeTableData/>
        </section>
    );
};

export default EmployeePage;