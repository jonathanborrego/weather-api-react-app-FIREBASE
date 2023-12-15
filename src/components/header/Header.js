import React, { useState, useEffect } from 'react'

import './Header.css'


const Header = () => {
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        getTimeDate()
        const timeInterval = setInterval(getTimeDate, 60000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(timeInterval);
    }, [])


    const getTimeDate = () => {
        const now = new Date()
        // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const timeHour = { hour: 'numeric', minute: '2-digit', hour12: true, };
        const timeDate = { year: 'numeric', month: 'long', day: 'numeric', };

        const localTime = now.toLocaleString([], timeHour)
        const localDate = now.toLocaleDateString([], timeDate)

        setTime(localTime)
        setDate(localDate)
    }


    return (
        <>
            <header className={'headerContainer'}>
                <h1 className={'logoText'} >MyWeather</h1>
                <div className={'dateTimeDiv'}>
                    <span className={'time'}>{time}</span>
                    <span className={'date'}>{date}</span>
                </div>
            </header>
            <hr />
        </>
    )
}

export default Header