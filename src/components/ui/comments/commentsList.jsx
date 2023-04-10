import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
// import _ from 'lodash'
import Comment from './comment'
// import api from 'api'
import CommentForm from './commentForm'
import { useParams } from 'react-router'
import { useComment } from '../../../hooks/useComment'

const CommentsList = () => {
    const {id: pageId} = useParams()
    const {createComment, removeComment, comments, isLoading} = useComment()

    const updateComments = () => {
        // setIsLoading(true)
        // return api.comments.fetchCommentsForUser(id).then(data => {
        //     const sorted = _.orderBy(data, 'created_at', 'asc')
        //     setComments(sorted)
        //     setIsLoading(false)
        // })
    }

    useEffect(() => {
        updateComments()
    }, [])

    const onSubmit = async comment => createComment(comment)

    const onRemove = async commentId => removeComment(commentId)

    const hasComments = Object.values(comments).length > 0

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <div>
                        <h2>New comment</h2>
                        <CommentForm pageId={pageId} onSubmit={onSubmit}/>
                    </div>
                </div>
            </div>
            {hasComments &&
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr/>
                    {
                        isLoading
                            ? <p>Loading...</p>
                            : Object.values(comments).map(comment =>
                                <Comment key={comment._id} comment={comment} onRemove={onRemove}/>)
                    }
                </div>
            </div>
            }
        </>
    )
}

CommentsList.propTypes = {
    // id: PropTypes.string.isRequired,
}

export default CommentsList
