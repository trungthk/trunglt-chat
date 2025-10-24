// src/app/hooks.ts
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Dùng thay cho useDispatch thông thường, có kiểu dữ liệu chuẩn
export const useAppDispatch: () => AppDispatch = useDispatch

// Dùng thay cho useSelector, tự động gợi ý kiểu RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
