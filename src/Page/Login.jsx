import React from 'react'
import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

const Login = () => {
    return (
        <Template
            title="Welcome Back"
            description1="Discover your passions,"
            description2="Be Unstoppable"
            image={loginImg}
            formType="login"
        />
    )
}

export default Login
