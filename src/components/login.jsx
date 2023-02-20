/* eslint-disable */
import React, { useEffect, useState } from 'react'
import TextField from './textField'
import { validator } from '../utils/validator'

const Login = () => {
    const [errors, setErrors] = useState({})
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        validate()
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Электронная почта указана в неверном формате'
            },
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            },
            min: {
                message: 'Минимальная длина пароля - #value# символов',
                value: 8,
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одну цифру'
            },
        },
    }

    const handleChange = ({target}) => {
        setData(prevState => ({...prevState, [target.name]: target.value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    return (
        <div className="row">
            <div className="col-12 col-md-6 offset-md-3 mt-5 p-4 shadow">
                <h3 className="mb-4">Login</h3>
                <form className="aa" onSubmit={handleSubmit}>
                    <TextField label="Электронная почта" type="text" name="email" value={data.email} error={errors.email}
                               onChange={handleChange}/>
                    <TextField label="Пароль" type="password" name="password" value={data.password} error={errors.password}
                               onChange={handleChange}/>
                    <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Отправить</button>
                </form>
            </div>
        </div>
    )
}

export default Login
