import { createSlice } from '@reduxjs/toolkit'

// INFO Pseudo users list
const validUsers = [
    { email: 'reactnative@jetdevs.com', password: 'jetdevs@123' }
]

const initialState = {
    errorMessage: '',
    loggedInUser: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { payload } = action
            const foundUser = validUsers.find(user => user.email === payload.email && user.password === payload.password)
            if (foundUser) {
                state.errorMessage = ''
                state.loggedInUser = foundUser
            } else {
                state.errorMessage = 'Login failed'
                state.loggedInUser = null
            }
        },
        logout(state) {
            state.errorMessage = ''
            state.loggedInUser = null
        }
    }
})

export const { login, logout } = authSlice.actions

export const loggedInUser = (state) => state?.auth?.loggedInUser
export const loginError = (state) => state?.auth?.errorMessage

export default authSlice.reducer