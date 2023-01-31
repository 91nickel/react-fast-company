import React from 'react'
import Qualitie from './qualitie'
import Bookmark from './bookmark'
import PropTypes from 'prop-types'

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onDelete,
    onBookmark
}) => {
    return (
        <tr key={_id}>
            <td>{name}</td>
            <td>
                {qualities.map((quality, i) => (
                    <Qualitie {...quality} key={`quality_${i}`} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                {
                    <Bookmark
                        id={_id}
                        status={bookmark}
                        onBookmark={onBookmark}
                    />
                }
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
}

export default User
