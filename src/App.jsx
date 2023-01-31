import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import api from './api'
import Users from './components/users'
import SearchStatus from './components/searchStatus'

const App = () => {
    const _users = api.users.fetchAll()
    const [users, setUsers] = useState(_users)

    const handleRemoveUser = (id) => {
        return setUsers(users.filter((user) => user._id !== id))
    }

    const handleBookmark = (id) => {
        setUsers(
            users.map((el) => {
                if (id === el._id) {
                    el.bookmark = !el.bookmark
                    return el
                }
                return el
            })
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <SearchStatus value={users.length} />
                    <Users
                        users={users}
                        onDelete={handleRemoveUser}
                        onBookmark={handleBookmark}
                    />
                </div>
            </div>
        </div>
    )
}
export default App
