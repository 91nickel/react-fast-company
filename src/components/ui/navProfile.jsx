import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

function NavProfile () {
    const {user, isAuthorized} = useAuth()

    const [isOpened, setIsOpened] = useState(false)

    const toggleMenu = () => {
        setIsOpened(prevState => !prevState)
    }

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{user.name}</div>
                <img
                    className="img-responsive rounded-circle"
                    src={user.image}
                    alt=""
                    height="40"
                />
            </div>
            <div className={'w-100 dropdown-menu' + (isOpened ? ' show' : '') }>
                <Link to={`/users/${user._id}`} className="dropdown-item">Profile</Link>
                <Link to={`/logout`} className="dropdown-item">Logout</Link>
            </div>
        </div>
    )
}

// NavProfile.propTypes = {
//     pages: PropTypes.array.isRequired,
// }

export default NavProfile
