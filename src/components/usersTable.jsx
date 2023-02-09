import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const UsersTable = ({users, currentSort, onSort, onDelete, onBookmark, ...rest}) => {
    const columns = {
        name: {path: 'name', name: 'Имя'},
        qualities: {
            name: 'Качества',
            component: (user) => {
                return <QualitiesList qualities={user.qualities}/>
            }
        },
        profession: {path: 'profession.name', name: 'Профессия'},
        completedMeetings: {path: 'completedMeetings', name: 'Встретился, раз'},
        rate: {path: 'rate', name: 'Оценка'},
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: user => {
                return (<Bookmark
                    id={user._id}
                    status={user.bookmark}
                    onBookmark={() => onBookmark(user._id)}
                />)
            }
        },
        delete: {
            component: user => {
                return (
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(user._id)}>
                        delete
                    </button>
                )
            },
        },
    }
    return (
        <Table onSort={onSort} currentSort={currentSort} columns={columns} data={users}>
            <TableHeader {...{columns, currentSort, onSort}} />
            <TableBody {...{columns, data: users}} />
        </Table>
    )
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    currentSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired,
}

export default UsersTable
