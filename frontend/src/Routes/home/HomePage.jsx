import React from 'react'
import UsersList from '../../components/UsersList';
import './Home.css'


function Home() {
    return (
        <div className='home-page'>
            <div className="left">
                <UsersList />
            </div>

            <div className="right">
                <h1>DOGBOOK</h1>
                <p>
                    <span>WELCOME</span>
                    <span>TO</span>
                    <span>OUR</span>
                    <span>DOGGY</span>
                    <span>DAYCARE</span>
                </p>
                <img src="/dog-olympics.jpg" alt="Dog Olympics" />
            </div>
        </div>
    )
}

export default Home;
