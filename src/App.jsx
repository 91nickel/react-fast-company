import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import api from './api'
import Users from './components/users'

const App = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data))
    }, [])

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
