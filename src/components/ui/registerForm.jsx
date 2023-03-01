/* eslint-disable */
import React, { useEffect, useState } from 'react'
import TextField from 'components/common/form/textField'
import { validator } from 'utils/validator'
import api from 'api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import CheckboxField from '../common/form/checkboxField'
import MultiSelectField from '../common/form/multiSelectField'

const RegisterForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        license: false
    })
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState({})

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data))
        api.qualities.fetchAll().then(data => setQualities(data))
    }, [])

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
        profession: {
            isRequired: {
                message: 'Необходимо выбрать профессию'
            },
        },
        sex: {
            isRequired: {
                message: 'Необходимо выбрать пол'
            },
        },
        license: {
            isRequired: {
                message: 'Вы не можете использовать наш сервис без подтверждения'
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

    console.log()

    return (
        <form className="aa" onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                type="text"
                name="email"
                value={data.email}
                error={errors.email}
                onChange={handleChange}/>
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                error={errors.password}
                onChange={handleChange}/>
            <RadioField
                label="Выберите ваш пол"
                name="sex"
                value={data.sex}
                error={errors.sex}
                options={[
                    {name: 'Male', value: 'male'},
                    {name: 'Female', value: 'female'},
                    {name: 'Other', value: 'other'},
                ]}
                onChange={handleChange}
            />
            <SelectField
                label="Выберите вашу профессию"
                name="profession"
                value={data.profession}
                error={errors.profession}
                options={professions.map(p => ({name: p.name, value: p._id}))}
                onChange={handleChange}
            />
            <MultiSelectField
                label="Выберите ваши качества"
                name="qualities"
                value={data.qualities}
                error={errors.qualities}
                options={qualities}
                onChange={handleChange}
            />
            <CheckboxField
                label="Согласие с лицензионным соглашением"
                name="license"
                value={data.license}
                error={errors.license}
                onChange={handleChange}
            >
                Согласен с <a href="#">лицензионным соглашением</a>
            </CheckboxField>
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Отправить</button>
        </form>
    )
}

export default RegisterForm
