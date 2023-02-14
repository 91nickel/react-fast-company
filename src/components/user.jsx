import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../api'
import QualitiesList from './qualitiesList'

const User = ({id}) => {
    const [user, setUser] = useState()
    useEffect(() => {
        api.users.getById(id).then(data => setUser(data))
    }, [])

    if (!user)
        return <div className="col-12 col-md-3 mt-5"><h2>Загрузка ...</h2></div>

    return (user &&
        <div className="card col-12 col-md-3 mt-5">
            <div className="card-header"><h5>{user.name}</h5></div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <b>Профессия: </b>
                    <span>{user.profession.name}</span>
                </li>
                <li className="list-group-item">
                    <QualitiesList qualities={user.qualities}/>
                </li>
                <li className="list-group-item">
                    <b>Встретился раз: </b>
                    <span>{user.completedMeetings}</span>
                </li>
                <li className="list-group-item">
                    <b>Рейтинг: </b>
                    <span>{user.rate}</span>
                </li>
            </ul>
            <div className="card-footer">
                <Link to="/users" className="btn btn-primary">Все пользователи</Link>
            </div>
        </div>
    )
}

User.propTypes = {
    id: PropTypes.string.isRequired,
}

export default User
