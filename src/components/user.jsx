import React from "react"

const User = (props) => {
    console.log('User', props)

    const renderUserQualities = () => {
        return props.qualities.map(el => {
            return <span key={el._id} className={`badge bg-${el.color}`}>{el.name}</span>
        })
    }

    return (
        <tr key={props._id}>
            <td>{props.name}</td>
            <td>{renderUserQualities()}</td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate}/5</td>
            <td>
                <button type="button" className="btn btn-outline-dark btn-sm"
                        onClick={() => props.onBookmark(props._id)}>
                    <i className={`bi ${props.bookmark ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                </button>
            </td>
            <td>
                <button type="button" className="btn btn-danger btn-sm"
                        onClick={() => props.onDelete(props._id)}>delete
                </button>
            </td>
        </tr>
    )
}
export default User