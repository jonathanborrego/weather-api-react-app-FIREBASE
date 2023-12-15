import React, { useState, useEffect } from 'react'

import './HourlyCards.css'


const HourlyCards = ({ currentLocationWeatherData, searchLocationWeatherData }) => {
    const [hourlyContent, setHourlyContent] = useState([]);
    const [dataSource, setDataSource] = useState();



    useEffect(() => {
        if (currentLocationWeatherData?.location?.name) {
            setDataSource(currentLocationWeatherData);
        }
    }, [currentLocationWeatherData]);

    useEffect(() => {
        if (searchLocationWeatherData?.location?.name) {
            setDataSource(searchLocationWeatherData);
        }
    }, [searchLocationWeatherData]);


    useEffect(() => {
        if (dataSource?.location?.name) {
            addHourlyContent(dataSource);
        };
    }, [dataSource]);



    const RenderHourly = () => {

        return (
            <div className={'hourlyTempsContainerDiv'}>

                {hourlyContent.map((item, index) => (
                    <div key={index} className={'hourlyContentDiv'}>
                        {
                            <div className={'hourlyTempsContainerDiv'} >

                                <div className={'hourlyContentDiv'} >
                                    <div className={'hourlyTempsDiv1'} >
                                        <span>{item.time}</span>
                                        <div className={'hourlyTempsDiv2'} >
                                            <img src={item.icon}
                                                className={'hourlyTempImg'}
                                            />
                                            <span>{item.temperature}</span>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        }
                    </div>
                ))}

            </div>
        );
    }

    // CONVERT HOURLY TIME FROM API DATA TO 12 HOUR FORMAT
    const convertTo12HourFormat = (militaryTime) => {
        // Split the military time string into hours and minutes
        const [hours, minutes] = militaryTime.split(':');

        // Convert the hours to a number
        const militaryHours = parseInt(hours);

        // Determine whether it's AM or PM
        const period = militaryHours >= 12 ? 'PM' : 'AM';

        // Convert military hours to 12-hour format
        const hours12 = militaryHours > 12 ? militaryHours - 12 : militaryHours;

        // Add leading zero to minutes if needed
        const formattedMinutes = minutes.padStart(2, '0');

        // Return the time in 12-hour format
        return `${hours12}:${formattedMinutes} ${period}`;
    }


    const addHourlyContent = (dataSource) => {
        setHourlyContent([])

        const newHourlyContent = [];

        for (const currentDayHour of dataSource?.forecast.forecastday[0]?.hour) {

            const dateTimeString = currentDayHour.time;
            const perDayTime = dateTimeString.substring(11, 16);

            const militaryTime = perDayTime;

            const twelveHourTime = convertTo12HourFormat(militaryTime);

            newHourlyContent.push({ time: twelveHourTime, icon: currentDayHour.condition.icon, temperature: `${currentDayHour.temp_f}°F` })
        }

        setHourlyContent(newHourlyContent);
    }


    return (
        <RenderHourly />
    )
}

export default HourlyCards