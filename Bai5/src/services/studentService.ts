import axiosClient from '../api/axiosClient';
import type { Student } from '../types/student';

export const studentService = {
  getAll: (params?: any) => {
    return axiosClient.get<Student[], Student[]>('/students', { params });
  },

  getById: (id: string) => {
    return axiosClient.get<Student, Student>(`/students/${id}`);
  },

  create: (data: Omit<Student, 'id'>) => {
    return axiosClient.post<Student, Student>('/students', data);
  },

  update: (id: string, data: Partial<Student>) => {
    return axiosClient.put<Student, Student>(`/students/${id}`, data);
  },

  delete: (id: string) => {
    return axiosClient.delete<void, void>(`/students/${id}`);
  },
};
