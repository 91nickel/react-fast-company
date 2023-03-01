import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookmark from 'components/common/bookmark'
import Qualities from 'components/ui/qualities'
import Table, {TableHeader, TableBody} from 'components/common/table'

const UsersTable = ({users, currentSort, onSort, onDelete, onBookmark, ...rest}) => {
    const columns = {
        // name: {path: 'name', name: 'Имя'},
        name: {
            name: 'Имя',
            component: user => {
                return <Link to={`/users/${user._id}`}>{user.name}</Link>
            }
        },
        qualities: {
            name: 'Качества',
            component: (user) => {
                return <Qualities qualities={user.qualities}/>
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
