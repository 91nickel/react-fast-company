import { createSlice } from '@reduxjs/toolkit'
import service from 'services/user.service'

const slice = createSlice({
    name: 'user',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceived: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
    }
})

const {reducer, actions} = slice
const {usersRequested, usersReceived, usersRequestFailed} = actions

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested())
    try {
        const {content} = await service.get()
        dispatch(usersReceived(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
}

export const loadUser = () => async (dispatch, getState) => {
    dispatch(usersRequested())
    try {
        const {content} = await service.get()
        dispatch(usersReceived(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
}

export const getUser = (id) => state => state.user?.entities.find(u => u._id === id)
export const getUsers = () => state => state.user.entities
export const getUsersIsLoading = () => state => state.user.isLoading

export default reducer
