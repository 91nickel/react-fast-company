import React from 'react'
import PropTypes from 'prop-types'
import UserEditForm from '../../ui/userEditForm'

const UserEditPage = ({id}) => {
    return (
        <div className="col-12 col-md-6 mt-5">
            <UserEditForm id={id}/>
        </div>
    )
}

UserEditPage.propTypes = {
    id: PropTypes.string.isRequired,
}

export default UserEditPage
