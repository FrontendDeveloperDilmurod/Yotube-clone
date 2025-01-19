import React, { useState } from 'react'
import Sidibar from '../../components/Sidibar'
import Feed from '../../components/Feed'

const Home = () => {
    return (
        <div className="flex">
            <Sidibar />
            <main className="flex-1 max-w-[1320px] mx-auto mt-24">
                <Feed />
            </main>
        </div>
    )
}

export default Home
