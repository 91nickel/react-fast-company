import React, { useState, useEffect } from 'react'
import _ from 'lodash'
// import api from 'api'
import UsersTable from 'components/ui/usersTable'
import Pagination from 'components/common/pagination'
import GroupList from 'components/common/groupList'
import SearchStatus from 'components/ui/searchStatus'
import SearchString from 'components/ui/searchString'
import paginate from 'utils/paginate'
import { useUser } from 'hooks/useUsers'
import { useProfession } from 'hooks/useProfession'
import { useAuth } from '../../../hooks/useAuth'

const UsersListPage = () => {
    const pageSize = 4
    // const [users, setUsers] = useState([])
    // const [professions, setProfessions] = useState()
    const {user} = useAuth();
    const {isLoading: prIsLoading, professions} = useProfession()
    const [currentProfession, setCurrentProfession] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [currentSort, setCurrentSort] = useState({path: 'name', order: 'asc'})
    const [searchQuery, setSearchQuery] = useState('')

    const {users} = useUser()

    // useEffect(() => {
    //     api.professions.fetchAll().then(data => setProfessions(data))
    // }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, currentProfession])

    // useEffect(() => {
    //     setCurrentPage(1)
    // }, [currentProfession])

    const handleDelete = (id) => {
        // return setUsers(users.filter((user) => user._id !== id))
        console.log('handleDelete()', id)
    }

    const handleBookmark = (id) => {
        const newArray = users.map((el) => {
            if (id === el._id) {
                el.bookmark = !el.bookmark
                return el
            }
            return el
        })
        // setUsers(newArray)
        console.log(newArray)
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

    function filterUsers (data) {
        let filteredUsers
        if (currentProfession) {
            filteredUsers = data.filter(u => _.isEqual(u.profession, currentProfession))
        } else if (!!searchQuery) {
            const regexp = new RegExp(searchQuery, 'ig')
            const searchResults = data.filter(u => regexp.test(u.name))
            filteredUsers = searchResults.length > 0 ? searchResults : users
        } else {
            filteredUsers = users
        }
        return filteredUsers.filter(u => u._id !== user._id)
    }

    const filteredUsers = filterUsers(users)
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, currentSort.path, currentSort.order)
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    // console.log(filteredUsers)
    if (!count) {
        return <div className="row mt-3">
            <div className="col-12"><h2>Загрузка ...</h2></div>
        </div>
    }

    return (
        <div className="row mt-3">
            {professions && !prIsLoading &&
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
            }

            {count > 0 &&
            <div className="col-10 d-flex flex-column">
                <SearchStatus value={count}/>
                <SearchString query={searchQuery} onSubmit={handleSearch}/>
                <UsersTable
                    users={userCrop}
                    currentSort={currentSort}
                    onDelete={handleDelete}
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
