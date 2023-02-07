/* eslint-disable */

import React, { useState, useEffect } from 'react'
import User from './user'
import Pagination from './pagination'
import paginate from '../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import api from '../api'

const Users = ({users: allUsers, onDelete, onBookmark}) => {
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [currentProfession, setCurrentProfession] = useState()

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [currentProfession])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleProfessionSelect = item => {
        setCurrentProfession(item)
    }
    const clearFilter = () => setCurrentProfession(undefined)

    const filteredUsers = currentProfession
        ? allUsers.filter(user => _.isEqual(user.profession, currentProfession))
        : allUsers
    const userCrop = paginate(filteredUsers, currentPage, pageSize)
    const count = filteredUsers.length

    return (
        <div className="d-flex">
            <div className="flex-shrink-0 p-3">
                <GroupList items={professions}
                           currentItem={currentProfession}
                           valueProperty="_id"
                           contentProperty="name"
                           onItemSelect={handleProfessionSelect}
                />
                {count > 0 && <button className="btn btn-secondary mt-2" type="button" onClick={clearFilter}>Сбросить фильтр</button>}
            </div>

            {count > 0 &&
            <div className="d-flex flex-column">
                <SearchStatus value={count}/>
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
                    <tbody>{userCrop.map((user) => (
                        <User key={user._id} {...user} onDelete={onDelete} onBookmark={onBookmark}/>))}</tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        currentPage={currentPage}
                        pageSize={pageSize}
                        itemsCount={count}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            }
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
}

export default Users
