import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { studentService } from '../../services/studentService';
import type { Student } from '../../types/student';

// Define the state interface
interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  currentStudent: Student | null;
}

// Initial state
const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
  currentStudent: null,
};

// Async Thunks
export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await studentService.getAll();
      // Sort by ID descending
      const sortedData = [...data].sort((a, b) => b.id.localeCompare(a.id));
      return sortedData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch students');
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  'students/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await studentService.getById(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch student');
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/create',
  async (studentData: Omit<Student, 'id'>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { students: StudentState };
      const students = state.students.students;

      // Generate new ID pattern SVxxx
      const svIds = students
        .map(s => s.id)
        .filter(id => /^SV\d{3}$/.test(id))
        .map(id => parseInt(id.replace('SV', ''), 10));

      const maxId = svIds.length > 0 ? Math.max(...svIds) : 0;
      const newId = `SV${String(maxId + 1).padStart(3, '0')}`;

      const newStudent = await studentService.create({ ...studentData, id: newId } as any);
      return newStudent;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create student');
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, data }: { id: string; data: Partial<Student> }, { rejectWithValue }) => {
    try {
      const updatedStudent = await studentService.update(id, data);
      return updatedStudent;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update student');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await studentService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete student');
    }
  }
);

// Slice
const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentStudent: (state, action: PayloadAction<Student | null>) => {
      state.currentStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all students
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch student by ID
    builder
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create student
    builder
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = [action.payload, ...state.students];
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update student
    builder
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete student
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(s => s.id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentStudent } = studentSlice.actions;
export default studentSlice.reducer;
