import React, { useState, useEffect } from 'react';
import type { Student } from '../types/student';
import { SearchableSelect } from './ui/searchable-select';

interface StudentFormProps {
    initialData?: Student | null;
    onSubmit: (data: Omit<Student, 'id'>) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
    majors: string[];
    classes: string[];
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting = false, majors, classes }) => {
    const formatDateForInput = (dateStr: string) => {
        if (!dateStr) return '';
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = parts[1].padStart(2, '0');
            const year = parts[2];
            return `${year}-${month}-${day}`;
        }
        return dateStr;
    };

    const formatDateForSubmit = (dateStr: string) => {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day}/${month}/${year}`;
        }
        return dateStr;
    };

    const [formData, setFormData] = useState<Omit<Student, 'id'>>({
        name: '',
        email: '',
        phone: '',
        major: '',
        classroom: '',
        dob: '',
        gender: 'Male',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                email: initialData.email,
                phone: initialData.phone,
                major: initialData.major,
                classroom: initialData.classroom,
                dob: formatDateForInput(initialData.dob),
                gender: initialData.gender,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submissionData = {
            ...formData,
            dob: formatDateForSubmit(formData.dob)
        };
        onSubmit(submissionData);
    };

    const inputClasses = "block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-gray-900/10 pb-6">
                <p className="text-sm leading-6 text-gray-500 mb-6">
                    Vui lòng điền đầy đủ thông tin bên dưới.
                </p>

                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Họ và tên
                        </label>
                        <div className="mt-2">
                            <input tabIndex={1}
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="VD: Nguyễn Văn A"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input tabIndex={2}
                                type="email"
                                name="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="VD: email@example.com"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                            Số điện thoại
                        </label>
                        <div className="mt-2">
                            <input tabIndex={3}
                                type="tel"
                                name="phone"
                                id="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="VD: 0912345678"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                            Ngày sinh
                        </label>
                        <div className="mt-2">
                            <input tabIndex={4}
                                type="date"
                                name="dob"
                                id="dob"
                                required
                                value={formData.dob}
                                onChange={handleChange}
                                max={new Date().toISOString().split("T")[0]}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="major" className="block text-sm font-medium leading-6 text-gray-900">
                            Ngành học
                        </label>
                        <div className="mt-2">
                            <SearchableSelect
                                id="major"
                                name="major"
                                value={formData.major}
                                onChange={(val) => setFormData(prev => ({ ...prev, major: val }))}
                                options={majors}
                                placeholder="Nhập hoặc chọn ngành học"
                                tabIndex={5}
                                required
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="classroom" className="block text-sm font-medium leading-6 text-gray-900">
                            Lớp
                        </label>
                        <div className="mt-2">
                            <SearchableSelect
                                id="classroom"
                                name="classroom"
                                value={formData.classroom}
                                onChange={(val) => setFormData(prev => ({ ...prev, classroom: val }))}
                                options={classes}
                                placeholder="Nhập hoặc chọn lớp"
                                tabIndex={6}
                                required
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                            Giới tính
                        </label>
                        <div className="mt-2">
                            <select tabIndex={7}
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={inputClasses}
                            >
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-x-3">
                <button tabIndex={9}
                    type="button"
                    onClick={onCancel}
                    className="text-sm font-semibold leading-6 text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                    Hủy
                </button>
                <button tabIndex={8}
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                >
                    {isSubmitting ? 'Đang lưu...' : 'Lưu thông tin'}
                </button>
            </div>
        </form>
    );
};

export default StudentForm;
