import { useState } from 'react';

const usePagination = (items, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = items?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items?.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return {
        currentPage,
        currentItems,
        totalPages,
        handlePageChange,
        setCurrentPage
    };
};

export default usePagination;
