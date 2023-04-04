import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setTokens } from 'services/localStorage.service'
import userService from 'services/user.service'

const AuthContext = React.createContext()
const httpAuth = axios.create()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [error, setError] = useState(null)

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

    async function signIn ({email, password, ...rest}) {
        // console.log('signIn', email, password)
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
        try {
            const {data} = await httpAuth.post(url, {email, password, returnSecureKey: true})
            // console.log(data)
            setTokens(data)
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
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
        try {
            const {data} = await httpAuth.post(url, {email, password, returnSecureKey: true})
            // console.log(data)
            setTokens(data)
            await createUser({_id: data.localId, email, ...rest})
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

    async function createUser (data) {
        try {
            const {content} = userService.create(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    return <AuthContext.Provider value={{signUp, signIn, user}}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default AuthProvider