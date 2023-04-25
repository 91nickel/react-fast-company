import { combineReducers, configureStore } from '@reduxjs/toolkit'
import QualityReducer from 'store/quality'
import ProfessionReducer from 'store/profession'
import UserReducer from 'store/user'

const rootReducer = combineReducers({
    quality: QualityReducer,
    profession: ProfessionReducer,
    user: UserReducer,
})

export function createStore () {
    return configureStore({
        reducer: rootReducer,
    })
}