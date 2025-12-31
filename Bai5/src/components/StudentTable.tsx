import React from 'react';
import type { Student } from '../types/student';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

interface StudentTableProps {
    students: Student[];
    onEdit: (student: Student) => void;
    onDelete: (id: string, name: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap">Mã SV</th>
                        <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap">Họ và tên</th>
                        <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap">Email</th>
                        <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap">SĐT</th>
                        <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap">Ngành</th>
                        <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap">Lớp</th>
                        <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap">Ngày sinh</th>
                        <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap">Giới tính</th>
                        <th scope="col" className="px-6 py-4 font-medium sticky right-0 bg-gray-50 z-10 shadow-[-5px_0_5px_-5px_rgb(0_0_0_/_0.1)] text-right whitespace-nowrap">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan={9} className="px-6 py-10 text-center text-gray-400">
                                Không tìm thấy sinh viên nào
                            </td>
                        </tr>
                    ) : (
                        students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 relative group transition-colors duration-200">
                                <td className="px-6 py-4 font-medium text-blue-600 whitespace-nowrap">{student.id}</td>
                                <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                        {student.major}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">{student.classroom}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.dob}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {student.gender === 'Male' ? 'Nam' : student.gender === 'Female' ? 'Nữ' : student.gender}
                                </td>
                                <td className="flex justify-end gap-3 px-6 py-4 sticky right-0 bg-white group-hover:bg-gray-50 z-10 shadow-[-5px_0_5px_-5px_rgb(0_0_0_/_0.1)] whitespace-nowrap transition-colors duration-200">
                                    <button
                                        onClick={() => onEdit(student)}
                                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                                        title="Sửa"
                                    >
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(student.id, student.name)}
                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                        title="Xóa"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
