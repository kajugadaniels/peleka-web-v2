import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header, Hero } from '../components/'

const UserLayout = () => {
    return (
        <div className='wrapper'>
            <div className="tf-top-bar style-1 flex items-center justify-center">
                <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
            </div>

            <Header />

            <Hero />

            <div class="main-content">
                <Outlet />

                <Footer />
            </div>

            <div className="progress-wrap active-progress">
                <svg className="progress-circle svg-content" style={{ width: '100%', height: '100%' }} viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '286.138' }}></path>
                </svg>
            </div>
        </div>
    )
}

export default UserLayout