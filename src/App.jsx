import React from 'react'
import Users from 'layouts/users'
import Home from 'layouts/home'
import Login from 'layouts/login'
import NotFound from 'layouts/not-found'
import NavBar from 'components/ui/navBar'
import { Route, Switch, Redirect } from 'react-router-dom'

const App = () => {
    const pages = [
        {name: 'Home', path: '/', exact: true, nav: true, component: Home},
        {name: 'Login', path: '/login', params: '/:type?', exact: false, nav: true, component: (params) => <Login id={params.match.params.type}/>},
        {name: 'Users', path: '/users', params: '/:id?/:type?', exact: false, nav: true, component: (params) => <Users id={params.match.params.id} mode={params.match.params.type}/>},
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
