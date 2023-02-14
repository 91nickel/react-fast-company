import React, { useState, useEffect } from 'react'
import api from '../api'
import UsersTable from './usersTable'
import Pagination from './pagination'
import paginate from '../utils/paginate'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import _ from 'lodash'

const Users = () => {
    const pageSize = 4
    const [users, setUsers] = useState([])
    const [professions, setProfessions] = useState()
    const [currentProfession, setCurrentProfession] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [currentSort, setCurrentSort] = useState({path: 'name', order: 'asc'})

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data))
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [currentProfession])

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

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleProfessionSelect = item => {
        setCurrentProfession(item)
    }

    const clearFilter = () => {
        setCurrentProfession(undefined)
    }

    const handleSort = (item) => {
        setCurrentSort(item)
    }

    const filteredUsers = currentProfession
        ? users.filter(user => _.isEqual(user.profession, currentProfession))
        : users
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, currentSort.path, currentSort.order)
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    if (!count)
        return <div className="row mt-3"><div className="col-12"><h2>Загрузка ...</h2></div></div>

    return (
        <div className="row mt-3">
            <div className="col-2">
                <GroupList
                    items={professions}
                    currentItem={currentProfession}
                    valueProperty="_id"
                    contentProperty="name"
                    onItemSelect={handleProfessionSelect}
                />
                {count > 0 &&
                <button className="btn btn-secondary mt-2" type="button" onClick={clearFilter}>Сбросить фильтр</button>}
            </div>

            {count > 0 &&
            <div className="col-10 d-flex flex-column">
                <SearchStatus value={count}/>
                <UsersTable
                    users={userCrop}
                    currentSort={currentSort}
                    onDelete={handleRemoveUser}
                    onBookmark={handleBookmark}
                    onSort={handleSort}
                />
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

export default Users
