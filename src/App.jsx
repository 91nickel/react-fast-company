import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Users from './components/users'

const App = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Users />
                </div>
            </div>
        </div>
    )
}

export default App
