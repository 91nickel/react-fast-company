import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Users from './components/users'
import User from './components/user'
import NavBar from './components/navBar'
import Home from './components/home'
import Login from './components/login'
import NotFound from './components/not-found'
import { Route, Switch, Redirect } from 'react-router-dom'

const App = () => {
    const pages = [
        {name: 'Home', path: '/', exact: true, nav: true, component: Home},
        {name: 'Login', path: '/login', exact: false, nav: true, component: Login},
        {name: 'Users', path: '/users', exact: true, nav: true, component: Users},
        {name: 'User', path: '/users', params: '/:id?', exact: false, nav: false, component: (params) => <User id={params.match.params.id}/>},
        {name: 'Not Found', path: '/404', exact: false, nav: false, component: NotFound},
    ]

    return (
        <div className="container">
            <NavBar {...{pages}}/>
            <div className="row">
                <div className="col-12">
                    <Switch>
                        {pages.map((page, i) =>
                            <Route
                                key={`page_${i + 1}`} exact={page.exact}
                                path={page.path + (page.params ? page.params : '')}
                                component={page.component}/>)}
                        <Redirect to="/404"/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default App
