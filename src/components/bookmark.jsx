import React from "react"

const Bookmark = ({id, status, onBookmark}) => {

    return (
        <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => onBookmark(id)}>
            <i className={`bi ${status ? 'bi-bookmark-fill' : 'bi-bookmark'}`}/>
        </button>
    )

}

export default Bookmark