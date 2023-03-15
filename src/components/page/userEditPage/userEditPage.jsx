import React from 'react'
import PropTypes from 'prop-types'
import UserEditForm from '../../ui/userEditForm'
import { Link, useLocation } from 'react-router-dom'

const UserEditPage = ({id}) => {
    return (<>
        <div className="col-12 mt-5">
            <Link to={`/users/${id}`} className="btn btn-primary">
                <i className="bi bi-caret-left"/>
                Назад
            </Link>
        </div>
        <div className="col-12 mt-5 d-flex justify-content-center">
            <div className="card w-50">
                <div className="card-body">
                    <UserEditForm id={id}/>
                </div>
            </div>
        </div>
    </>)
}

UserEditPage.propTypes = {
    id: PropTypes.string.isRequired,
}

export default UserEditPage
