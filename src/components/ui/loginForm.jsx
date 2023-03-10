/* eslint-disable */
import React, { useEffect, useState } from 'react'
import TextField from 'components/common/form/textField'
// import { validator } from 'utils/validator'
import CheckboxField from '../common/form/checkboxField'
import * as yup from 'yup'

const LoginForm = () => {
    const [data, setData] = useState({email: '', password: '', stayOn: false})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = (target) => {
        setData(prevState => ({
                ...prevState,
                [target.name]: target.value,
            }
        ))
    }

    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: 'Электронная почта обязательна для заполнения'
    //         },
    //         isEmail: {
    //             message: 'Электронная почта указана в неверном формате'
    //         },
    //     },
    //     password: {
    //         isRequired: {
    //             message: 'Пароль обязателен для заполнения'
    //         },
    //         isCapitalSymbol: {
    //             message: 'Пароль должен содержать хотя бы одну заглавную букву'
    //         },
    //         isContainDigit: {
    //             message: 'Пароль должен содержать хотя бы одну цифру'
    //         },
    //         min: {
    //             message: 'Минимальная длина пароля - #value# символов',
    //             value: 8,
    //         },
    //     },
    // }

    const validateScheme = yup.object().shape({
        password: yup.string()
            .required('Пароль обязателен для заполнения')
            .matches(/^(?=.*[A-Z])/, 'Пароль должен содержать хотя бы одну заглавную букву')
            .matches(/^(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
            .matches(/^(?=.*[!"№$%^&*])/, 'Пароль должен содержать хотя бы один спецсимвол')
            .matches(/^(?=.{8,})/, 'Минимальная длина пароля - 8 символов'),
        email: yup.string().required('Электронная почта обязательна для заполнения').email('Электронная почта указана в неверном формате'),
    })


    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    const validate = () => {
        // const errors = validator(data, validatorConfig)
        validateScheme.validate(data)
            .then(() => setErrors({}))
            .catch(err => setErrors({[err.path]: err.message}))
        // setErrors(errors)
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
