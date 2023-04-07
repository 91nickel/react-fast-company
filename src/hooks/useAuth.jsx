import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import localStorageService, { setTokens } from 'services/localStorage.service'
import userService from 'services/user.service'
import { useHistory } from 'react-router'

const AuthContext = React.createContext()
export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const history = useHistory();
    const [user, setUser] = useState({})
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const isAuthorized = Object.keys(user).length > 0

    async function getUserData () {
        try {
            const {content} = await userService.getCurrentUser()
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData()
        } else {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }
    }, [error])

    function errorCatcher (error) {
        const {message} = error.response.data.error
        setError(message)
    }

    function randomInt (min = 0, max = 100) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async function signIn ({email, password, ...rest}) {
        // console.log('signIn', email, password)
        const url = 'accounts:signInWithPassword'
        try {
            const {data} = await httpAuth.post(url, {email, password, returnSecureToken: true})
            console.log(data)
            setTokens(data)
            await getUserData()
        } catch (error) {
            errorCatcher(error)
            const {code, message} = error.response.data.error
            // console.log(code, message)
            if (code === 400) {
                if (message === 'INVALID_PASSWORD') {
                    const errObject = {password: 'Неверный пароль'}
                    throw errObject
                }
                if (message === 'INVALID_PASSWORD') {
                    const errObject = {password: 'Email не найден'}
                    throw errObject
                }
            }
        }
    }

    async function signUp ({email, password, ...rest}) {
        // console.log('signUp', email, password)
        const url = 'accounts:signUp'
        try {
            const {data} = await httpAuth.post(url, {email, password, returnSecureToken: true})
            // console.log(data)
            setTokens(data)
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
                ...rest
            })
        } catch (error) {
            errorCatcher(error)
            const {code, message} = error.response.data.error
            // console.log(code, message)
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errObject = {email: 'Пользователь с таким email уже существует'}
                    throw errObject
                }
            }
            // throw new Error()
        }
    }

    function logout () {
        localStorageService.removeAuthData()
        setUser({})
        history.push('/')
    }

    async function createUser (data) {
        try {
            const {content} = await userService.create(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    return (
        <AuthContext.Provider value={{signUp, signIn, logout, user, isAuthorized}}>
            {!isLoading ? children : 'Loading...'}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default AuthProvider