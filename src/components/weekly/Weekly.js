import React, { useState, useEffect } from 'react'

import './Weekly.css'

import { VideosSrc } from '../../assets/videos/videos'

const Weekly = ({ currentLocationWeatherData, searchLocationWeatherData }) => {
    const [WeeklyContent, setWeeklyContent] = useState([])
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
            addWeeklyContent(dataSource);
        };
    }, [dataSource]);



    const RenderWeekly = () => {

        return (
            <div className={'weeklyForecastContainerDiv'} >
                <div className={'weeklyForecastDiv'}>

                    {WeeklyContent.map((item, index) => (
                        <div key={index} className={'weeklyForecastDayDiv'}>
                            {
                                <>
                                    <video src={item.videoSource} className={'videoContainer'} muted autoPlay loop playsInline ></video>

                                    <div className={'dayTitleImgDiv'}>
                                        <span className={'weeklyDayTxt'} >{item.weekDay}</span>
                                        <img src={item.icon} className={'weeklyDayImg'}
                                        />
                                    </div>

                                    <div className={'percentRainLowHighDiv'}>
                                        <span className={'percentRainTxt'}>{item.rainPercent}</span>
                                        <span className={'lowHighTxt'}>{item.lowTemp} / {item.highTemp}</span>
                                    </div>
                                </>

                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    const getDayName = (date) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[date.getUTCDay()];
    }


    const addWeeklyContent = (dataSource) => {
        setWeeklyContent([])
        let backgroundVideo = ''

        const forecastDays = dataSource.forecast.forecastday;

        const newWeeklyContent = [];

        forecastDays.forEach(day => {
            // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
            const currentDate = new Date();
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            const currentDayName = daysOfWeek[currentDate.getDay()];


            const date = new Date(day.date);
            let dayName = getDayName(date);
            if (dayName == currentDayName) {
                dayName = 'Today'
            }

            console.log(`Date: ${day.date}, Day: ${dayName}`);

            let weatherCondition = day.day.condition.text.toLowerCase()
            console.log(weatherCondition);

            if (weatherCondition == 'partly cloudy') {
                backgroundVideo = VideosSrc.partlyCloudy

            } else if (weatherCondition == 'cloudy') {
                backgroundVideo = VideosSrc.cloudy

            } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
                backgroundVideo = VideosSrc.rainy

            } else if (weatherCondition.includes('snow') || weatherCondition.includes('ice') || weatherCondition.includes('sleet') || weatherCondition.includes('blizzard')) {
                backgroundVideo = VideosSrc.snow

            } else if (weatherCondition.includes('thunder')) {
                backgroundVideo = VideosSrc.thunderStorm

            } else if (weatherCondition == 'sunny' || weatherCondition == 'clear') {
                // console.log('yes it is sunny')
                backgroundVideo = VideosSrc.sunny

            } else if (weatherCondition == '') {
                backgroundVideo = ''
            } else {
                backgroundVideo = VideosSrc.cloudyDark
            }

            newWeeklyContent.push(
                { weekDay: dayName, icon: day.day.condition.icon, rainPercent: `${day.day.daily_chance_of_rain}%`, lowTemp: `${day.day.mintemp_f}°F`, highTemp: `${day.day.maxtemp_f}°F`, videoSource: backgroundVideo }
            )
        })

        setWeeklyContent(newWeeklyContent);
    }

    return (
        // <>
        //     <div className={'weeklyForecastContainerDiv'} >
        //         <div className={'weeklyForecastDiv'}>

        //             <div className={'weeklyForecastDayDiv'} >
        //                 <video src={VideosSrc.snow} className={'videoContainer'} muted autoPlay loop></video>

        //                 <div className={'dayTitleImgDiv'}>
        //                     <span className={'weeklyDayTxt'} >Monday</span>
        //                     <img src="./assets/icons/day/176.png" className={'weeklyDayImg'}
        //                     />
        //                 </div>

        //                 <div className={'percentRainLowHighDiv'}>
        //                     <span className={'percentRainTxt'}>40%</span>
        //                     <span className={'lowHighTxt'}>54°F / 72°F</span>
        //                 </div>

        //             </div>

        //         </div>
        //     </div>
        // </>

        <RenderWeekly />
    )
}

export default Weekly