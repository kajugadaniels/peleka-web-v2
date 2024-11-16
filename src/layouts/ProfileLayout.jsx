import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Footer, Header, Jumbotron } from '../components'

const ProfileLayout = () => {
    const [userName, setUserName] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        if (user) {
            setUserName(user.name || 'N/A');
            setUserPhoneNumber(user.phone_number || 'N/A');
            setUserEmail(user.email || 'N/A');
        }
    }, [navigate])

    return (
        <div className='wrapper'>
            <div className="tf-top-bar style-1 flex items-center justify-center">
                <p>Intro price. Get UpSkill for Big Sale -95% off.</p>
            </div>

            <Header />

            <Jumbotron userName={userName} userPhoneNumber={userPhoneNumber} userEmail={userEmail} />

            <div className="main-content pt-0">
                <div className="page-inner tf-spacing-1">
                    <div className="tf-container">
                        <div className="row">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <div className="progress-wrap active-progress">
                <svg className="progress-circle svg-content" style={{ width: '100%', height: '100%' }} viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '286.138' }}></path>
                </svg>
            </div>
        </div>
    )
}

export default ProfileLayout