"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
    clientName: z.string().min(2, {
        message: "Tên khách hàng phải có ít nhất 2 ký tự.",
    }),
    amount: z.string().min(1, {
        message: "Vui lòng nhập số tiền.",
    }),
    date: z.string().min(1, {
        message: "Vui lòng chọn ngày.",
    }),
    type: z.enum(["Payment", "Refund"]),
})

interface AddTransactionModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (data: z.infer<typeof formSchema>) => void
}

export function AddTransactionModal({ isOpen, onClose, onAdd }: AddTransactionModalProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientName: "",
            amount: "",
            date: new Date().toISOString().split('T')[0],
            type: "Payment",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        onAdd(values)
        form.reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white text-slate-900">
                <DialogHeader>
                    <DialogTitle>Thêm giao dịch mới</DialogTitle>
                    <DialogDescription>
                        Nhập thông tin chi tiết về giao dịch mới tại đây. Nhấn lưu để hoàn tất.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="clientName" className="text-right">
                            Khách hàng
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="clientName"
                                className="col-span-3 border-gray-200 focus:ring-steel-blue-100"
                                {...form.register("clientName")}
                            />
                            {form.formState.errors.clientName && (
                                <span className="text-xs text-red-500 mt-1">{form.formState.errors.clientName.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Số tiền
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="amount"
                                type="number"
                                className="col-span-3 border-gray-200 focus:ring-steel-blue-100"
                                {...form.register("amount")}
                            />
                            {form.formState.errors.amount && (
                                <span className="text-xs text-red-500 mt-1">{form.formState.errors.amount.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Ngày
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="date"
                                type="date"
                                className="col-span-3 border-gray-200 focus:ring-steel-blue-100"
                                {...form.register("date")}
                            />
                            {form.formState.errors.date && (
                                <span className="text-xs text-red-500 mt-1">{form.formState.errors.date.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Loại
                        </Label>
                        <div className="col-span-3">
                            <Select
                                onValueChange={(value) => form.setValue("type", value as "Payment" | "Refund")}
                                defaultValue={form.getValues("type")}
                            >
                                <SelectTrigger className="w-full border-gray-200 focus:ring-steel-blue-100" id="type">
                                    <SelectValue placeholder="Chọn loại giao dịch" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Payment">Thanh toán</SelectItem>
                                    <SelectItem value="Refund">Hoàn tiền</SelectItem>
                                </SelectContent>
                            </Select>
                            {form.formState.errors.type && (
                                <span className="text-xs text-red-500 mt-1">{form.formState.errors.type.message}</span>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-steel-blue-600 hover:bg-steel-blue-700 text-white rounded-xl">Lưu thay đổi</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
