import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const YoutubeLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default YoutubeLayout
