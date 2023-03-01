/* eslint-disable */
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoginForm from 'components/ui/loginForm'
import RegisterForm from '../components/ui/registerForm'

const Login = () => {
    const {type} = useParams()
    const [formType, setFormType] = useState(type === 'register' ? type : 'login')
    const handleChange = ({target}) => {
        setData(prevState => ({...prevState, [target.name]: target.value}))
    }
    return (
        <div className="row">
            <div className="col-12 col-md-6 offset-md-3 mt-5 p-4 shadow">
                <h3 className="mb-4">{type === 'register' ? 'Register' : 'Login'}</h3>
                {
                    type === 'register'
                        ?
                        <>
                            <RegisterForm/>
                            <p>Already have account? <Link to="/login" role="button">Sign In</Link></p>
                        </>
                        :
                        <>
                            <LoginForm/>
                            <p>Dont have account? <Link to="/login/register" role="button">Sign Up</Link></p>
                        </>
                }
            </div>
        </div>
    )
}

export default Login
