import { usePagination } from "@/components/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type JoinedPaginationProps = {
    currentPage: number;
    totalPages: number;
    paginationItemsToDisplay?: number;
    onPageChange: (page: number) => void;
};

function JoinedPagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay = 5,
    onPageChange,
}: JoinedPaginationProps) {
    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    });

    const handlePageChange = (page: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <Pagination>
            <PaginationContent className="inline-flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
                <PaginationItem className="[&:first-child>a]:rounded-s-lg [&:last-child>a]:rounded-e-lg">
                    <PaginationLink
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                            }),
                            "rounded-none border-0 shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50",
                        )}
                        href="#"
                        onClick={handlePageChange(currentPage - 1)}
                        aria-label="Go to previous page"
                        aria-disabled={currentPage === 1}
                    >
                        <ChevronLeftIcon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    </PaginationLink>
                </PaginationItem>

                {showLeftEllipsis && (
                    <PaginationItem>
                        <PaginationLink
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                }),
                                "pointer-events-none rounded-none border-0 shadow-none",
                            )}
                        >
                            ...
                        </PaginationLink>
                    </PaginationItem>
                )}

                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                }),
                                "rounded-none border-0 shadow-none focus-visible:z-10",
                                page === currentPage
                                    ? "bg-steel-blue-500 text-white hover:bg-steel-blue-600 hover:text-white transition-colors duration-500 ease-in-out rounded-lg p-2"
                                    : "hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors duration-500 ease-in-out rounded-lg",
                            )}
                            href="#"
                            onClick={handlePageChange(page)}
                            isActive={page === currentPage}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {showRightEllipsis && (
                    <PaginationItem>
                        <PaginationLink
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                }),
                                "pointer-events-none rounded-none border-0 shadow-none",
                            )}
                        >
                            ...
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem className="[&:first-child>a]:rounded-s-lg [&:last-child>a]:rounded-e-lg">
                    <PaginationLink
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                            }),
                            "rounded-none border-0 shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50",
                        )}
                        href="#"
                        onClick={handlePageChange(currentPage + 1)}
                        aria-label="Go to next page"
                        aria-disabled={currentPage === totalPages}
                    >
                        <ChevronRightIcon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export { JoinedPagination };
