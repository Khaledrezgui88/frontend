import React from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 0) return null;

    return (
        <div>
            <Button
                variant="btn-outline-secondary"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="me-2"
            >
                Previous
            </Button>

            {[...Array(totalPages)].map((_, index) => (
                <Button
                    variant="btn-outline-secondary"
                    className="me-2"
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    active={currentPage === index + 1}
                >
                    {index + 1}
                </Button>
            ))}

            <Button
                className="me-2"
                variant="btn-outline-secondary"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
};

export default Pagination;
