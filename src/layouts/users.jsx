import React from 'react'
import UsersListPage from 'components/page/usersListPage'
import UserPage from 'components/page/userPage'
import UserEditPage from 'components/page/userEditPage'
import { useParams } from 'react-router-dom'

const Users = () => {
    const params = useParams()
    const {id, type} = params

    const getComponent = () => {
        if (id) {
            if (type === 'edit') {
                return <UserEditPage id={id}/>
            } else {
                return <UserPage id={id}/>
            }
        } else {
            return <UsersListPage/>
        }
    }

    return (
        <div className="row">
            <div className="col-12">{getComponent()}</div>
        </div>
    )
}

export default Users
