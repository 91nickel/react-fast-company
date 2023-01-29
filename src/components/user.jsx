import React from "react"
import Qualitie from "./qualitie"
import Bookmark from "./bookmark"

const User = (props) => {
    return (
        <tr key={props._id}>
            <td>{props.name}</td>
            <td>{props.qualities.map(quality => <Qualitie {...quality} />)}</td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate}/5</td>
            <td>{<Bookmark id={props._id} status={props.bookmark} onBookmark={props.onBookmark} />}</td>
            <td>
                <button type="button" className="btn btn-danger btn-sm"
                        onClick={() => props.onDelete(props._id)}>delete
                </button>
            </td>
        </tr>
    )
}
export default User