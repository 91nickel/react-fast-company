import React from 'react'
import UsersListPage from 'components/page/usersListPage'
import UserPage from 'components/page/userPage'
import { useParams } from 'react-router-dom'

const Users = () => {
    const params = useParams()
    const {id} = params

    return (
        <div className="row">
            <div className="col-12">
                <>{!!id ? <UserPage id={id}/> : <UsersListPage/>}</>
            </div>
        </div>
    )
}

export default Users
