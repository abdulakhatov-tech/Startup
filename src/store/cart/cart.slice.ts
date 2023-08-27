import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BooksType } from 'src/interfaces/books.interface';
import { CourseType } from 'src/interfaces/course.interface';
import { CartInitialState } from './cart.interface';

const initialState: CartInitialState = {
  books: [],
  courses: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addBookToCart: (state, { payload }: PayloadAction<BooksType>) => {
      state.books = [...state.books, payload];
    },
    addCourseToCart: (state, { payload }: PayloadAction<CourseType>) => {
      state.courses = [...state.courses, payload];
    },
    removeBookFromCart: (
      state,
      { payload }: PayloadAction<string | undefined>
    ) => {
      const newArr = state.books.filter((c) => c._id !== payload);
      state.books = newArr;
    },
    removeCourseFromCart: (state, { payload }: PayloadAction<string>) => {
      const newArr = state.courses.filter((c) => c._id !== payload);
      state.courses = newArr;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartSliceAction = cartSlice.actions;
