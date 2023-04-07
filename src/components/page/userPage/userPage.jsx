import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
// import api from 'api'
import QualitiesList from 'components/ui/qualities/qualitiesList'
import CommentsList from 'components/ui/comments/commentsList'
import { useUser } from 'hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'

const UserPage = ({id}) => {
    const loc = useLocation()
    const {getUser} = useUser()
    const {user} = useAuth()
    const profile = getUser(id)
    const isMyProfile = profile._id === user._id
    // const [user, setUser] = useState()
    // useEffect(() => {
    //     api.users.getById(id).then(data => setUser(data))
    // }, [])


    if (!profile)
        return <h2 className="mt-5">Загрузка ...</h2>

    return (profile &&
        <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
                <div className="card mb-3">
                    <div className="card-body">
                        {isMyProfile &&
                        <button
                            className="position-absolute top-0 end-0 btn btn-light btn-sm"
                            onClick={() => location.replace(`${loc.pathname}/edit`)}
                        >
                            <i className="bi bi-gear"/>
                        </button>}
                        <div className="d-flex flex-column align-items-center text-center position-relative">
                            <img
                                src={profile.image}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="150"
                                height="150"
                            />
                            <div className="mt-3">
                                <h4>{profile.name}</h4>
                                <p className="text-secondary mb-1">{profile.profession.name}</p>
                                <div className="text-muted">
                                    <i className="bi bi-caret-down-fill text-primary" role="button"/>
                                    <i className="bi bi-caret-up text-secondary" role="button"/>
                                    <span className="ms-2">{profile.rate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body d-flex flex-column justify-content-center text-center">
                        <h5 className="card-title">
                            <span>Qualities</span>
                        </h5>
                        <p className="card-text">
                            <QualitiesList qualities={profile.qualities}/>
                        </p>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card mb-3">
                        <div className="card-body d-flex flex-column justify-content-center text-center">
                            <h5 className="card-title">
                                <span>Completed meetings</span>
                            </h5>
                            <h1 className="display-1">{profile.completedMeetings}</h1>
                        </div>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body d-flex flex-column justify-content-center text-center">
                        <Link to="/users" className="btn btn-primary">Назад</Link>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <CommentsList id={id}/>
            </div>
        </div>
    )
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired,
}

export default UserPage
