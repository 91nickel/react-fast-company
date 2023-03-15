import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Comment from './comment'
import api from 'api'
import CommentForm from './commentForm'

const CommentsList = ({id}) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    const updateComments = () => {
        setLoading(true)
        return api.comments.fetchCommentsForUser(id).then(data => {
            const sorted = _.orderBy(data, 'created_at', 'asc')
            setComments(sorted)
            setLoading(false)
        })
    }

    useEffect(() => {
        updateComments()
    }, [])

    const onSubmit = async comment => {
        await api.comments.add({pageId: id, ...comment})
        return updateComments()
    }

    const onRemove = async commentId => {
        await api.comments.remove(commentId)
        return updateComments()
    }

    const hasComments = Object.values(comments).length > 0

    return (<>
        <div className="card mb-2">
            <div className="card-body ">
                <div>
                    <h2>New comment</h2>
                    <CommentForm pageId={id} onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
        {hasComments &&
        <div className="card mb-3">
            <div className="card-body ">
                <h2>Comments</h2>
                <hr/>
                {
                    loading
                        ? <p>Loading...</p>
                        : Object.values(comments).map(comment =>
                            <Comment key={comment._id} comment={comment} onRemove={onRemove}/>)
                }
            </div>
        </div>
        }
    </>)
}

CommentsList.propTypes = {
    id: PropTypes.string.isRequired,
}

export default CommentsList
