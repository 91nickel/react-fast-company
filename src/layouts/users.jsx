import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import UsersListPage from 'components/page/usersListPage'
import UserPage from 'components/page/userPage'
import UserEditPage from 'components/page/userEditPage'

import { getUsersIsLoading, loadUsersList } from 'store/user'

const Users = () => {
    const dispatch = useDispatch()
    const {id, type} = useParams()

    useEffect(() => {
        dispatch(loadUsersList())
    }, [])

    const isLoading = useSelector(getUsersIsLoading())

    const getComponent = () => {
        if (isLoading) {
            return <h2>Loading ...</h2>
        } else if (id) {
            return type === 'edit'
                ? <UserEditPage id={id}/>
                : <UserPage id={id}/>
        } else {
            return <UsersListPage/>
        }
    }

    return (
        <div className="row">
            <div className="col-12">
                {getComponent()}
            </div>
        </div>
    )
}

export default Users
