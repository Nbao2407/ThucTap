import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { studentService } from '../services/studentService';
import type { Student } from '../types/student';

const StudentAddEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState<Student | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            setLoading(true);
            studentService.getById(id)
                .then((data) => {
                    setInitialData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch student details:', error);
                    alert('Failed to load student data');
                    navigate('/');
                });
        }
    }, [isEditMode, id, navigate]);

    const handleSubmit = async (data: Omit<Student, 'id'>) => {
        setIsSubmitting(true);
        try {
            if (isEditMode && id) {
                await studentService.update(id, data);
                alert('Student updated successfully!');
            } else {
                await studentService.create(data);
                alert('Student added successfully!');
            }
            navigate('/');
        } catch (error) {
            console.error('Operation failed:', error);
            alert('Failed to save student');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Student' : 'Add New Student'}</h2>
            <StudentForm
                initialData={initialData}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isSubmitting={isSubmitting}
                majors={[]}
                classes={[]}
            />
        </div>
    );
};

export default StudentAddEdit;
