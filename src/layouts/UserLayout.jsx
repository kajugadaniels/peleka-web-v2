import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../components/'

const UserLayout = () => {
    return (
        <div className='wrapper'>
            <div className="tf-top-bar style-1 flex items-center justify-center">
                <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
            </div>

            <Header />

            <Outlet />

            <Footer />
        </div>
    )
}

export default UserLayout