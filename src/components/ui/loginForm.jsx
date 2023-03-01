/* eslint-disable */
import React, { useEffect, useState } from 'react'
import TextField from 'components/common/form/textField'
import { validator } from 'utils/validator'
import CheckboxField from '../common/form/checkboxField'

const LoginForm = () => {
    const [data, setData] = useState({email: '', password: '', stayOn: false})
    const [errors, setErrors] = useState({})

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

    const handleChange = (target) => {
        setData(prevState => ({
                ...prevState,
                [target.name]: target.value,
            }
        ))
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
        <form className="aa" onSubmit={handleSubmit}>
            <TextField label="Электронная почта" type="text" name="email" value={data.email} error={errors.email}
                       onChange={handleChange}/>
            <TextField label="Пароль" type="password" name="password" value={data.password} error={errors.password}
                       onChange={handleChange}/>
            <CheckboxField
                label=""
                name="stayOn"
                value={data.stayOn}
                error={errors.stayOn}
                onChange={handleChange}
            >
                Запомнить меня
            </CheckboxField>

            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Отправить</button>
        </form>
    )
}

export default LoginForm
