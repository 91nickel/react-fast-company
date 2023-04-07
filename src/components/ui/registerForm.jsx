/* eslint-disable */
import React, { useEffect, useState } from 'react'
import TextField from 'components/common/form/textField'
import { validator } from 'utils/validator'
import api from 'api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import CheckboxField from '../common/form/checkboxField'
import MultiSelectField from '../common/form/multiSelectField'
import { useQuality } from '../../hooks/useQuality'
import { useProfession } from '../../hooks/useProfession'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'


const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        license: false
    })
    const {signUp} = useAuth()
    const [errors, setErrors] = useState({})
    // const [professions, setProfessions] = useState([])
    // const [qualities, setQualities] = useState({})
    const {qualities} = useQuality()
    const qualitiesList = qualities.map(q => ({label: q.name, value: q._id}))

    const {professions} = useProfession()
    const professionsList = professions.map(p => ({label: p.name, value: p._id}))

    // useEffect(() => {
    //     api.professions.fetchAll().then(data => setProfessions(data))
    //     api.qualities.fetchAll().then(data => setQualities(data))
    // }, [])

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
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            },
            min: {
                message: 'Минимальная длина имени - #value# символа',
                value: 3,
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const userFields = {
            ...data,
            profession: professions.find(p => p._id === data.profession)?._id,
            qualities: Object.values(qualities).filter(q => data.qualities.includes(q._id)).map(q => q._id),
        }
        // console.log('userFields', userFields)
        try {
            await signUp(userFields)
            history.push('/')
        } catch (error) {
            setErrors(error)
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0
    return (
        <form className="aa" onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                type="text"
                name="email"
                value={data.email}
                error={errors.email}
                onChange={handleChange}
            />
            <TextField
                label="Имя"
                type="text"
                name="name"
                value={data.name}
                error={errors.name}
                onChange={handleChange}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                error={errors.password}
                onChange={handleChange}
            />
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
                defaultValue="Choose your destiny..."
                error={errors.profession}
                options={professionsList}
                onChange={handleChange}
            />
            <MultiSelectField
                label="Выберите ваши качества"
                name="qualities"
                value={data.qualities}
                error={errors.qualities}
                options={qualitiesList}
                onChange={handleChange}
            />
            <CheckboxField
                label="Согласие с лицензионным соглашением"
                name="license"
                value={data.license}
                required={true}
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
