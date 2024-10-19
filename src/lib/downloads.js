import { toast } from "sonner";

export const downloadCSV = (row_data) => {
    if (!row_data || row_data.length === 0) {
        toast.error("No data available to download");
        return;
    }
    console.log(row_data);
    const headers = Object.keys(row_data[0]).join(',') + '\n';
    const rows = row_data.map(row => Object.values(row).join(',')).join('\n');
    const csvData = headers + rows;
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'table_data.csv';
    link.click();
};
