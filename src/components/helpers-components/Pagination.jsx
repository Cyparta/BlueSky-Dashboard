
'use client'

import ReactPaginate from 'react-paginate';

export default function PaginatedItems({ itemNumber = 1, onPageChange = () => { } }) {

    const pageCount = Math.ceil(Number(itemNumber) / 10);

    if (pageCount < 1) {
        return null;
    }

    return (
        <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={onPageChange}
            containerClassName="flex justify-center items-center mt-1 px-4 h-[50px]"
            pageClassName="mx-1 px-2 py-1 hover:bg-gray-300 rounded-lg Transition cursor-pointer"
            activeClassName="bg-white text-blue-700 font-bold  rounded-lg shadow-md border py-1"
            previousClassName="rounded-l-lg hover:bg-red-400 Transition bg-blue-700 text-white px-3  px-2 py-1 mr-2"
            nextClassName="rounded-r-lg hover:bg-red-400 Transition bg-blue-700 text-white px-2 py-1 ml-2"
            breakClassName="text-gray-500 "
            disabledClassName="opacity-50"
        />
    );
}