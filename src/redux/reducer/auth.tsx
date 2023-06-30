import { createSlice } from '@reduxjs/toolkit'
import UserSession from '../../pages/Home/services/auth'

const initialState = {
    isLoading: false,
    message: '',
    access_token: null,
    user: null,
}
export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fetchLogin(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        fetchLoginSuccess(state, action) {
            UserSession.setUser(action.payload.data)
            return {
                ...state,
                isLoading: false,
            }
        },
        fetchLoginFailed(state, action) {
            return {
                ...state,
                message: 'User Login Failed',
                isLoading: false,
            }
        },
        fetchRegister(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        fetchRegisterSuccess(state, action) {
            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
            }
        },
        fetchRegisterFailed(state, action) {
            return {
                ...state,
                message: 'User Registration Failed',
                isLoading: false,
            }
        },
    },
})

export const {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
    fetchRegister,
    fetchRegisterSuccess,
    fetchRegisterFailed,
} = authReducer.actions

export default authReducer.reducer
