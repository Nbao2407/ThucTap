import { useEffect, useState } from 'react';
import type { Student } from '../types/student';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/StudentForm';
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Pagination, PaginationContent, PaginationItem } from '../components/ui/pagination';
import { Button } from '../components/ui/button-1';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchStudents, createStudent, updateStudent, deleteStudent } from '../store/slices/studentSlice';

const StudentList = () => {
    // Redux state
    const dispatch = useAppDispatch();
    const { students, loading, error } = useAppSelector((state) => state.students);

    // Local UI state
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { showToast } = useToast();

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sinh viên ${name}?`)) {
            try {
                await dispatch(deleteStudent(id)).unwrap();
                showToast(`Đã xóa sinh viên ${name}`, 'success');
            } catch (err) {
                showToast('Xóa thất bại', 'error');
            }
        }
    };

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingStudent(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
    };

    const handleSubmit = async (data: Omit<Student, 'id'>) => {
        setIsSubmitting(true);
        try {
            if (editingStudent) {
                await dispatch(updateStudent({ id: editingStudent.id, data })).unwrap();
                showToast('Cập nhật sinh viên thành công!', 'success');
            } else {
                await dispatch(createStudent(data)).unwrap();
                showToast('Thêm sinh viên thành công!', 'success');
                setCurrentPage(1);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Operation failed:', error);
            showToast('Có lỗi xảy ra, vui lòng thử lại.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMajor = selectedMajor === '' || student.major === selectedMajor;
        const matchesGender = selectedGender === '' || student.gender === selectedGender;
        const matchesClass = selectedClass === '' || student.classroom === selectedClass;
        return matchesSearch && matchesMajor && matchesGender && matchesClass;
    });

    const uniqueMajors = Array.from(new Set(students.map(s => s.major))).sort();
    const uniqueGenders = Array.from(new Set(students.map(s => s.gender))).sort();
    const uniqueClasses = Array.from(new Set(students.map(s => s.classroom))).sort();

    // Pagination Logic
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    // Reset page on search or filter
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedMajor, selectedGender]);

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8 bg-gray-50 min-h-screen relative flex flex-col">
            {/* Action Bar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 gap-4 items-center">
                    {/* Search */}
                    <div className="relative w-full max-w-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-lg border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 shadow-sm"
                            placeholder="Tìm kiếm theo tên, mã SV, email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter Button & Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium shadow-sm transition-colors ${selectedMajor
                                ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-gray-700'
                                }`}
                        >
                            <FunnelIcon className="h-5 w-5" />
                            Bộ lọc
                            {selectedMajor && <span className="ml-1 rounded bg-blue-200 px-1.5 py-0.5 text-xs text-blue-800 font-semibold">1</span>}
                        </button>

                        {isFilterOpen && (
                            <div className="absolute left-0 mt-2 w-72 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 p-4 space-y-4">
                                {/* Filter */}
                                <div>
                                    <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Lọc theo Ngành
                                    </div>
                                    <select
                                        value={selectedMajor}
                                        onChange={(e) => setSelectedMajor(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Tất cả các ngành</option>
                                        {uniqueMajors.map((major) => (
                                            <option key={major} value={major}>
                                                {major}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Gender Filter */}
                                <div>
                                    <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Lọc theo Giới tính
                                    </div>
                                    <select
                                        value={selectedGender}
                                        onChange={(e) => setSelectedGender(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Tất cả giới tính</option>
                                        {uniqueGenders.map((gender) => (
                                            <option key={gender} value={gender}>
                                                {gender === 'Male' ? 'Nam' : gender === 'Female' ? 'Nữ' : gender}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Class Filter */}
                                <div>
                                    <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Lọc theo Lớp
                                    </div>
                                    <select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Tất cả lớp</option>
                                        {uniqueClasses.map((classroom) => (
                                            <option key={classroom} value={classroom}>
                                                {classroom}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {(selectedMajor || selectedGender || selectedClass) && (
                                    <button
                                        onClick={() => {
                                            setSelectedMajor('');
                                            setSelectedGender('');
                                            setSelectedClass('');
                                            setIsFilterOpen(false);
                                        }}
                                        className="w-full text-center text-xs text-blue-600 hover:underline pt-2 border-t"
                                    >
                                        Xóa tất cả bộ lọc
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Add Button */}
                <button
                    onClick={handleAdd}
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Thêm sinh viên
                </button>
            </div>

            <div className="flex-grow">
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Đang tải dữ liệu...</div>
                ) : error ? (
                    <div className="text-center py-10 text-red-500">{error}</div>
                ) : (
                    <>
                        <StudentTable students={currentStudents} onEdit={handleEdit} onDelete={handleDelete} />

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                                <div className="text-sm text-gray-500">
                                    <span className="font-medium">{indexOfFirstItem + 1}</span>-
                                    <span className="font-medium">{Math.min(indexOfLastItem, filteredStudents.length)}</span>
                                    {' '}/{' '}
                                    <span className="font-medium">{filteredStudents.length}</span>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <Button
                                                    variant="ghost"
                                                    disabled={currentPage === 1}
                                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    className="gap-1 pl-2.5"
                                                >
                                                    <ChevronLeft className="h-4 w-4" />
                                                    <span>Trước</span>
                                                </Button>
                                            </PaginationItem>

                                            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((page) => (
                                                <PaginationItem key={page}>
                                                    <Button
                                                        variant={currentPage === page ? "primary" : "ghost"}
                                                        onClick={() => setCurrentPage(page)}
                                                    >
                                                        {page}
                                                    </Button>
                                                </PaginationItem>
                                            ))}

                                            {totalPages > 5 && (
                                                <PaginationItem>
                                                    <span className="px-2 text-gray-400">...</span>
                                                </PaginationItem>
                                            )}

                                            <PaginationItem>
                                                <Button
                                                    variant="ghost"
                                                    disabled={currentPage === totalPages}
                                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                    className="gap-1 pr-2.5"
                                                >
                                                    <span>Sau</span>
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                                <div className="hidden sm:block sm:w-[100px]"></div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                            onClick={handleCloseModal}
                        ></div>

                        {/* Modal Panel */}
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">
                                        {editingStudent ? 'Cập nhật sinh viên' : 'Thêm sinh viên mới'}
                                    </h3>
                                    <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <StudentForm
                                    initialData={editingStudent}
                                    onSubmit={handleSubmit}
                                    onCancel={handleCloseModal}
                                    isSubmitting={isSubmitting}
                                    majors={uniqueMajors}
                                    classes={uniqueClasses}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;
