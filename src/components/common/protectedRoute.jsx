import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from 'hooks/useAuth'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({component: Component, children, ...rest}) => {
    const {user, isAuthorized} = useAuth()

    const render = (props) => {
        if (!isAuthorized) {
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }
        return Component ? <Component {...props} /> : children
    }

    return <Route {...rest} render={render}/>

}

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default ProtectedRoute
