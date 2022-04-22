import { SetStateAction, useEffect } from "react";

interface IPaginationProps {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    paginate: (pageNumber: SetStateAction<number>) => void
}


export const Pagination: React.FC<IPaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    
    const pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <div>
            <div className="my-1">
                <p className='text-sm text-brown'>
                Showing
                <span className='font-medium'> {currentPage * itemsPerPage - (itemsPerPage - 1)} </span>
                to
                <span className='font-medium'> {(currentPage * itemsPerPage) > totalItems ? totalItems : currentPage * itemsPerPage} </span>
                of
                <span className='font-medium'> {totalItems} </span>
                results
                </p>
            </div>
            <nav className='block'>
                <ul className='flex pl-0 rounded list-none flex-wrap'>
                <li>
                    {pageNumbers.map((number, i) => (
                        <button
                        onClick={() => {
                        paginate(number);
                        }}
                        className={currentPage === number
                            ? "bg-blue hover:bg-blue relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md mx-1"
                            : "bg-white border-brown text-brown hover:bg-blue hover:bg-opacity-30 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md"
                        } key={i}>
                        {number}
                    </button>
                    ))}
                </li>
                </ul>
            </nav>
        </div>
    );
  };