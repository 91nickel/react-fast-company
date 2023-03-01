import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

function NavBar ({pages}) {
    const location = useLocation()
    return (
        <div className="row">
            <div className="col-12">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-nav">
                        {pages.filter(page => page.nav)
                            .map((page, i) => {
                                const isActive = page.exact ? page.path === location.pathname : location.pathname.includes(page.path)
                                const classList = 'nav-item nav-link' + (isActive ? ' active' : '')
                                return <Link key={`ntm_${i}`} className={classList} to={page.path}>{page.name}</Link>
                            })}
                    </div>
                </nav>
            </div>
        </div>
    )
}

NavBar.propTypes = {
    pages: PropTypes.array.isRequired,
}

export default NavBar
