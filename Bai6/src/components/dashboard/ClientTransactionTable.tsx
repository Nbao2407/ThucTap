"use client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { JoinedPagination } from "@/components/ui/joined-pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    type ColumnDef,
    type PaginationState,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useId, useState } from "react";

import { mockData, type Transaction } from "@/components/Mockdata/mockdata";

import { AddTransactionModal } from "./AddTransactionModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo } from "react";
import { PencilSquareIcon, TrashIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export default function ClientTransactionTable() {
    const id = useId();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [data, setData] = useState<Transaction[]>(mockData);

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: "clientName",
            desc: false,
        },
    ]);

    const handleDelete = (id: string) => {
        setData((prev) => prev.filter((item) => item.id !== id));
    };

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id);
    };

    const columns = useMemo<ColumnDef<Transaction>[]>(() => [
        {
            header: "Mã GD",
            accessorKey: "id",
            cell: ({ row }) => <div className="font-medium text-gray-500">{row.getValue("id")}</div>,
            size: 100,
        },
        {
            header: "Khách hàng",
            accessorKey: "clientName",
            cell: ({ row }) => <div className="font-medium text-gray-700">{row.getValue("clientName")}</div>,
            size: 200,
        },
        {
            header: "Ngày",
            accessorKey: "date",
            cell: ({ row }) => <div className="text-gray-500">{row.getValue("date")}</div>,
            size: 150,
        },
        {
            header: "Loại giao dịch",
            accessorKey: "type",
            cell: ({ row }) => {
                const type = row.getValue("type") as string;
                return (
                    <Badge
                        variant="outline"
                        className={cn(
                            "font-normal border-0 px-3 py-1 rounded-full",
                            type === "Payment"
                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                : "bg-red-50 text-red-600 hover:bg-red-100"
                        )}
                    >
                        {type === "Payment" ? "Thanh toán" : "Hoàn tiền"}
                    </Badge>
                );
            },
            size: 150,
        },
        {
            header: "Số tiền",
            accessorKey: "amount",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"));
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount);
                return <div className="text-gray-700 font-medium">{formatted}</div>;
            },
            size: 120,
        },
        {
            id: "actions",
            header: () => <div className="text-center w-full">Thao tác</div>,
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="text-gray-600 bg-gray-100/50 hover:bg-gray-200/80 cursor-pointer p-1.5 rounded-lg flex items-center justify-center w-8 h-8 rotate-90 outline-none transition-all duration-200">
                                <EllipsisHorizontalIcon className="w-5 h-5" strokeWidth={2} />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] bg-white rounded-xl shadow-lg border-gray-100 p-1">
                            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Hành động
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => handleCopyId(row.original.id)}
                                className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
                            >
                                <DocumentDuplicateIcon className="w-4 h-4" />
                                <span>Sao chép ID</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 bg-gray-100" />
                            <DropdownMenuItem
                                className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
                                onClick={() => console.log("Edit", row.original)}
                            >
                                <PencilSquareIcon className="w-4 h-4" />
                                <span>Chỉnh sửa</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDelete(row.original.id)}
                                className="flex items-center gap-2 px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer icon-red"
                            >
                                <TrashIcon className="w-4 h-4" />
                                <span>Xóa</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
            size: 80,
        },
    ], []);

    const handleAddTransaction = (newTransactionData: any) => {
        const newTransaction: Transaction = {
            id: `#${Math.floor(Math.random() * 10000)}`,
            clientName: newTransactionData.clientName,
            date: new Date(newTransactionData.date).toLocaleDateString('en-US'),
            type: newTransactionData.type,
            amount: parseFloat(newTransactionData.amount),
        };
        setData([newTransaction, ...data]);
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        enableSortingRemoval: false,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            pagination,
        },
    });

    const getColumnClasses = (columnId: string) => {
        switch (columnId) {
            case "id":
                return "hidden lg:table-cell";
            case "date":
                return "hidden md:table-cell";
            case "type":
                return "hidden sm:table-cell";
            default:
                return "";
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm shadow-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Danh sách giao dịch</h3>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-steel-blue-600 hover:bg-steel-blue-700 text-white rounded-xl"
                    >
                        Thêm giao dịch
                    </Button>
                    <Button variant="outline" className="text-steel-blue-600 border-steel-blue-200 hover:bg-steel-blue-50 rounded-xl">Xem chi tiết</Button>
                </div>
            </div>

            <AddTransactionModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddTransaction}
            />

            <div className="overflow-x-auto">
                <Table className="table-fixed min-w-[800px] lg:min-w-0">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-b-0">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{ width: `${header.getSize()}px` }}
                                            className={cn(
                                                "h-11 text-gray-400 font-medium border-b-0",
                                                getColumnClasses(header.column.id)
                                            )}
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <div
                                                    className={cn(
                                                        header.column.getCanSort() &&
                                                        "flex h-full cursor-pointer select-none items-center gap-2",
                                                        header.column.id === 'actions' && "justify-center"
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: (
                                                            <ChevronUpIcon
                                                                className="shrink-0 opacity-60 h-3.5 w-3.5"
                                                                strokeWidth={2}
                                                                aria-hidden="true"
                                                            />
                                                        ),
                                                        desc: (
                                                            <ChevronDownIcon
                                                                className="shrink-0 opacity-60 h-3.5 w-3.5"
                                                                strokeWidth={2}
                                                                aria-hidden="true"
                                                            />
                                                        ),
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            ) : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody key={table.getState().pagination.pageIndex} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="border-b-gray-50 hover:bg-gray-50/50">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className={cn("py-4", getColumnClasses(cell.column.id))}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Không có kết quả.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-8 mt-4">
                {/* Results per page */}
                <div className="flex items-center gap-3">
                    <Label htmlFor={id} className="max-sm:sr-only text-gray-500 font-normal">
                        Số hàng mỗi trang
                    </Label>
                    <Select
                        value={table.getState().pagination.pageSize.toString()}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger id={id} className="w-fit whitespace-nowrap border-gray-200">
                            <SelectValue placeholder="Chọn số lượng" />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 25, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Pagination buttons */}
                <div>
                    <JoinedPagination
                        currentPage={table.getState().pagination.pageIndex + 1}
                        totalPages={table.getPageCount()}
                        onPageChange={(page) => table.setPageIndex(page - 1)}
                    />
                </div>
            </div>
        </div>
    );
}
