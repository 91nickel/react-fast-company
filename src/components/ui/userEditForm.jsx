import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as yup from 'yup'
import TextField from 'components/common/form/textField'
import RadioField from 'components/common/form/radioField'
import SelectField from 'components/common/form/selectField'
import MultiSelectField from 'components/common/form/multiSelectField'
import api from 'api'

const UserEditForm = ({id}) => {
    const [user, setUser] = useState()
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState({})

    useEffect(() => {
        api.users.getById(id).then(data => {
            setUser(data)
            setData({
                ...data,
                profession: data.profession._id,
                qualities: data.qualities.map(q => (q._id))
            })
        })
        api.professions.fetchAll().then(data => setProfessions(data))
        api.qualities.fetchAll().then(data => setQualities(data))
    }, [])

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = (target) => {
        setData(prevState => (
            {
                ...prevState,
                [target.name]: target.value,
            }
        ))
    }

    const createUserFields = () => {
        return {
            ...user,
            ...data,
            profession: Object.values(professions).find(p => p._id === data.profession),
            qualities: Object.values(qualities).filter(q => data.qualities.includes(q._id)),
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!validate() || !hasDifference()) return false
        api.users.update(id, createUserFields())
        window.location = `/users/${id}`
        console.log('handleSubmit()->userFields', createUserFields())
    }


    const validate = () => {

        const validateScheme = yup.object().shape({
            email: yup.string().required('Электронная почта обязательна для заполнения').email('Электронная почта указана в неверном формате'),
            name: yup.string().required('Имя должно быть указано'),
        })

        validateScheme.validate(data)
            .then(() => setErrors({}))
            .catch(err => setErrors({[err.path]: err.message}))

        return Object.keys(errors).length === 0
    }

    const hasDifference = () => {
        return !_.isEqual(user, createUserFields())
    }

    const isValid = Object.keys(errors).length === 0

    if (!user || !Object.values(professions).length || !Object.values(qualities).length)
        return <h2>Загрузка ...</h2>

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя"
                type="text"
                name="name"
                value={data.name}
                error={errors.name}
                onChange={handleChange}/>
            <TextField
                label="Электронная почта"
                type="text"
                name="email"
                value={data.email}
                error={errors.email}
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
                defaultValue="Choose your destiny..."
                error={errors.profession}
                options={Object.values(professions).map(p => ({name: p.name, value: p._id}))}
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
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid || !hasDifference()}>Сохранить</button>
        </form>
    )
}

UserEditForm.propTypes = {
    id: PropTypes.string.isRequired,
}

export default UserEditForm
