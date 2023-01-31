import React, { useState } from 'react'
import User from './user'
import Pagination from './pagination'
import paginate from '../utils/paginate'
import PropTypes from 'prop-types'

const Users = ({ users, onDelete, onBookmark }) => {
    const pageSize = 4
    const count = users.length
    const [currentPage, setCurrentPage] = useState(1)
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const userCrop = paginate(users, currentPage, pageSize)
    if (count > 0) {
        return (
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col">x</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                {...user}
                                onDelete={onDelete}
                                onBookmark={onBookmark}
                            />
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    itemsCount={count}
                    onPageChange={handlePageChange}
                />
            </>
        )
    }

    return ''
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
}

export default Users
