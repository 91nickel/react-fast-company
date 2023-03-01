import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import api from 'api'
import UsersTable from 'components/ui/usersTable'
import Pagination from 'components/common/pagination'
import GroupList from 'components/common/groupList'
import SearchStatus from 'components/ui/searchStatus'
import SearchString from 'components/ui/searchString'
import paginate from 'utils/paginate'

const UsersListPage = () => {
    const pageSize = 4
    const [users, setUsers] = useState([])
    const [professions, setProfessions] = useState()
    const [currentProfession, setCurrentProfession] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [currentSort, setCurrentSort] = useState({path: 'name', order: 'asc'})
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data))
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery])

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
        clearSearch()
    }

    const clearFilter = () => {
        setCurrentProfession(undefined)
    }

    const handleSort = (item) => {
        setCurrentSort(item)
    }

    const handleSearch = (value) => {
        setSearchQuery(value)
        clearFilter()
    }

    const clearSearch = () => {
        setSearchQuery('')
    }

    let filteredUsers
    if (currentProfession) {
        filteredUsers = users.filter(user => _.isEqual(user.profession, currentProfession))
    } else if (!!searchQuery) {
        const regexp = new RegExp(searchQuery, 'ig')
        const searchResults = users.filter(user => regexp.test(user.name))
        filteredUsers = searchResults.length > 0 ? searchResults : users
    } else {
        filteredUsers = users
    }
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, currentSort.path, currentSort.order)
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    if (!count) {
        return <div className="row mt-3">
            <div className="col-12"><h2>Загрузка ...</h2></div>
        </div>
    }

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
                <button
                    className="btn btn-secondary mt-2"
                    type="button"
                    disabled={!currentProfession}
                    onClick={clearFilter}
                >Сбросить фильтр</button>}
            </div>

            {count > 0 &&
            <div className="col-10 d-flex flex-column">
                <SearchStatus value={count}/>
                <SearchString query={searchQuery} onSubmit={handleSearch}/>
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

export default UsersListPage
