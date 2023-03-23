import React from 'react'
import UsersListPage from 'components/page/usersListPage'
import UserPage from 'components/page/userPage'
import UserEditPage from 'components/page/userEditPage'
import { useParams } from 'react-router-dom'
import UserProvider from '../hooks/useUsers'

const Users = () => {
    const params = useParams()
    const {id, type} = params

    return (
        <div className="row">
            <div className="col-12">
                <UserProvider>
                    {id
                        ? (
                            type === 'edit'
                                ? <UserEditPage id={id}/>
                                : <UserPage id={id}/>
                        )
                        : (
                            <UsersListPage/>
                        )
                    }
                </UserProvider>
            </div>
        </div>
    )
}

export default Users
