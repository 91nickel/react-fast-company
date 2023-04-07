import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProfessionProvider from './hooks/useProfession'
import Users from 'layouts/users'
import Home from 'layouts/home'
import Login from 'layouts/login'
import NotFound from 'layouts/not-found'
import NavBar from 'components/ui/navBar'
import QualityProvider from './hooks/useQuality'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import Logout from './layouts/logout'

const App = () => {
    const pages = [
        {name: 'Home', path: '/', exact: true, nav: true, component: Home},
        {
            name: 'Login',
            path: '/login',
            params: '/:type?',
            exact: false,
            nav: false,
            professions: true,
            component: (params) => <Login id={params.match.params.type}/>
        },
        {
            name: 'Users',
            path: '/users',
            params: '/:id?/:type?',
            exact: false,
            nav: true,
            professions: true,
            auth: true,
            component: (params) => <Users id={params.match.params.id} mode={params.match.params.type}/>
        },
        {name: 'Not Found', path: '/404', exact: false, nav: false, component: NotFound},
        {name: 'Logout', path: '/logout', exact: false, nav: false, component: Logout},
    ]

    return (
        <div className="container">
            <AuthProvider>
                <NavBar {...{pages}}/>
                <div className="row">
                    <div className="col-12">
                        <ProfessionProvider>
                            <QualityProvider>
                                <Switch>

                                    {pages.filter(page => page.professions)
                                        .map(
                                            (page, i) => {
                                                const RouteComponent = page.auth ? ProtectedRoute : Route
                                                return <RouteComponent
                                                    key={`page_${i + 1}`}
                                                    exact={page.exact}
                                                    path={page.path + (page.params ? page.params : '')}
                                                    component={page.component}/>
                                            }
                                        )}
                                    {pages.filter(page => !page.professions)
                                        .map((page, i) =>
                                            <Route
                                                key={`page_${i + 1}`} exact={page.exact}
                                                path={page.path + (page.params ? page.params : '')}
                                                component={page.component}/>)}
                                    <Redirect to="/"/>
                                </Switch>
                            </QualityProvider>
                        </ProfessionProvider>
                    </div>
                </div>
            </AuthProvider>
            <ToastContainer/>
        </div>
    )
}

export default App
