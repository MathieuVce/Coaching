interface IPaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginateBack:() => void;
    paginateFront: () => void;
    currentPage: number;
}


export const Pagination: React.FC<IPaginationProps> = ({ itemsPerPage, totalItems, paginateBack, paginateFront, currentPage }) => {
    
    return (
        <div>
            <div className="my-1">
                <p className='text-sm text-gray-700'>
                Showing
                <span className='font-medium'> {totalItems == 0 ? 0 :currentPage * itemsPerPage - (itemsPerPage - 1)} </span>
                to
                <span className='font-medium'> {(currentPage * itemsPerPage) > totalItems ? totalItems : currentPage * itemsPerPage} </span>
                of
                <span className='font-medium'> {totalItems} </span>
                    {totalItems < 2 ? 'result' : 'results'}
                </p>
            </div>
            <nav className='block'></nav>
            <div>
                <nav
                className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                aria-label='Pagination'
                >
                <button onClick={() => {
                    if (currentPage > 1) {
                        paginateBack()
                    }
                }} className='relative inline-flex items-center px-2 py-2 rounded-l-md border bg-white text-sm font-medium hover:bg-blue'>
                    <span>Previous</span>
                </button>
                <button onClick={() => {
                    if ((currentPage + 1) * itemsPerPage - (itemsPerPage - 1) < totalItems) {
                        paginateFront()
                    }
                }} className='relative inline-flex items-center px-2 py-2 rounded-r-md border bg-white text-sm font-medium hover:bg-blue'>
                    <span>Next</span>
                </button>
                </nav>
            </div>
        </div>
    );
  };