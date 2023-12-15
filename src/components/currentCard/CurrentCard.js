import React, { useState, useEffect } from 'react'

import './CurrentCard.css'

import SavedLocations from '../savedLocations/SavedLocations'

import { VideosSrc } from '../../assets/videos/videos'

const CurrentCard = ({ currentLocationWeatherData, searchLocationWeatherData, searchLocationName }) => {
    const [BackgroundVideo, setBackgroundVideo] = useState('');
    const [cityName, setCityName] = useState('---');
    const [Temperature, setTemperature] = useState('---');
    const [CardWeatherCondition, setCardWeatherCondition] = useState('---');
    const [CardWeatherConditionICON, setCardWeatherConditionICON] = useState('');
    const [Humidity, setHumidity] = useState('---');
    const [RealFeel, setRealFeel] = useState('---');
    const [LowTemps, setLowTemps] = useState('---');
    const [HighTemps, setHighTemps] = useState('---');
    const [WindSpeed, setWindSpeed] = useState('---');

    const [CardWidth, setCardWidth] = useState('')
    const [CardTransition, setCardTranssition] = useState('')

    const [SavedLocationContent, setSavedLocationContent] = useState([]);

    useEffect(() => {


        // set backgorund videos depending on weather conditions
        let weatherCondition = currentLocationWeatherData?.current?.condition?.text?.toLowerCase() || '';
        console.log(weatherCondition);

        if (weatherCondition == 'partly cloudy') {
            setBackgroundVideo(VideosSrc.partlyCloudy)

        } else if (weatherCondition == 'cloudy') {
            setBackgroundVideo(VideosSrc.cloudy)

        } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
            setBackgroundVideo(VideosSrc.rainy)

        } else if (weatherCondition.includes('snow') || weatherCondition.includes('ice') || weatherCondition.includes('sleet') || weatherCondition.includes('blizzard')) {
            setBackgroundVideo(VideosSrc.snow)

        } else if (weatherCondition.includes('thunder')) {
            setBackgroundVideo(VideosSrc.thunderStorm)

        } else if (weatherCondition == 'sunny' || weatherCondition == 'clear') {
            // console.log('yes it is sunny')
            setBackgroundVideo(VideosSrc.sunny)

        } else if (weatherCondition == '') {
            setBackgroundVideo('')
        } else {
            setBackgroundVideo(VideosSrc.cloudyDark)
        }

        if (currentLocationWeatherData?.current.is_day < 1) {
            setBackgroundVideo(VideosSrc.nightTime)
        }
        // --------------------END--------------------

        // set current card weather info text 
        if (currentLocationWeatherData?.location?.name) {
            setCityName(currentLocationWeatherData.location.name);
            setTemperature(`${currentLocationWeatherData?.current.temp_f}°F`)
            setCardWeatherConditionICON(currentLocationWeatherData?.current.condition.icon)
            setCardWeatherCondition(currentLocationWeatherData?.current.condition.text)
            setHumidity(`${currentLocationWeatherData?.current.humidity}%`)
            setRealFeel(`${currentLocationWeatherData?.current.feelslike_f}°F`)
            setLowTemps(`${currentLocationWeatherData?.forecast.forecastday[0].day.mintemp_f}°F`)
            setHighTemps(`${currentLocationWeatherData?.forecast.forecastday[0].day.maxtemp_f}°F`)
            setWindSpeed(`${currentLocationWeatherData?.current.wind_mph} mph`)
        }

    }, [currentLocationWeatherData]);


    useEffect(() => {

        let weatherCondition = searchLocationWeatherData?.current?.condition.text.toLowerCase() || '';
        console.log(weatherCondition);

        if (weatherCondition == 'partly cloudy') {
            setBackgroundVideo(VideosSrc.partlyCloudy)

        } else if (weatherCondition == 'cloudy') {
            setBackgroundVideo(VideosSrc.cloudy)

        } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
            setBackgroundVideo(VideosSrc.rainy)

        } else if (weatherCondition.includes('snow') || weatherCondition.includes('ice') || weatherCondition.includes('sleet') || weatherCondition.includes('blizzard')) {
            setBackgroundVideo(VideosSrc.snow)

        } else if (weatherCondition.includes('thunder')) {
            setBackgroundVideo(VideosSrc.thunderStorm)

        } else if (weatherCondition == 'sunny' || weatherCondition == 'clear') {
            console.log('yes it is sunny')
            setBackgroundVideo(VideosSrc.sunny)

        } else if (weatherCondition == '') {
            setBackgroundVideo('')
        } else {
            setBackgroundVideo(VideosSrc.cloudyDark)
        }

        if (searchLocationWeatherData?.current.is_day < 1) {
            setBackgroundVideo(VideosSrc.nightTime)
        }


        if (searchLocationWeatherData?.location?.name) {
            setCityName(searchLocationWeatherData.location.name);
            setTemperature(`${searchLocationWeatherData?.current.temp_f}°F`)
            setCardWeatherConditionICON(searchLocationWeatherData?.current.condition.icon)
            setCardWeatherCondition(searchLocationWeatherData?.current.condition.text)
            setHumidity(`${searchLocationWeatherData?.current.humidity}%`)
            setRealFeel(`${searchLocationWeatherData?.current.feelslike_f}°F`)
            setLowTemps(`${searchLocationWeatherData?.forecast.forecastday[0].day.mintemp_f}°F`)
            setHighTemps(`${searchLocationWeatherData?.forecast.forecastday[0].day.maxtemp_f}°F`)
            setWindSpeed(`${searchLocationWeatherData?.current.wind_mph} mph`)
        }

    }, [searchLocationWeatherData]);

    useEffect(() => {

        if (SavedLocationContent.length > 0) {
            setCardWidth('60%');
            setCardTranssition('all 0.5s ease')

        }
    }, [SavedLocationContent]);




    // -----SAVING SEARCHED LOCATIONS----
    const saveCurrentLocation = () => {
        // Ensure there's data before saving
        if (cityName !== '---' && Temperature !== '---') {
            const newSavedLocation = {
                cityName,
                temperature: Temperature,
                backgroundVideo: BackgroundVideo
            };

            // Update the SavedLocationContent state
            setSavedLocationContent((prevSavedLocations) => [...prevSavedLocations, newSavedLocation]);
        }
    };


    const RunApiCallFromSavedCityName = (savedLocation) => {
        searchLocationName(savedLocation.cityName)
        // console.log(savedLocation.cityName);
    }







    return (
        <div className={'currentCardContainerDiv'}>
            <div className={'currentCardDiv'} style={{ width: CardWidth, transition: CardTransition }} >

                <video src={BackgroundVideo} className={'videoContainer'} muted autoPlay loop playsInline >
                </video>

                <div className={'currentCardLocationDiv'} >
                    <div>
                        <span className={'currentCardLocationTxt'}>
                            {cityName}
                        </span>
                    </div>

                    <div>
                        <span className={'currentCardSaveCityBtn'} onClick={saveCurrentLocation}  >
                            { cityName != '---' ? '+SAVE' : ''}
                        </span>
                    </div>
                </div>

                {/* <!-- ------------------------------------------------ --> */}

                <div className={'currentCardCenterDiv'}>
                    <div className={'tempImgDiv'}>
                        <span className={'currentCardCenterTemperature'}>{Temperature}</span>
                        <img className={'currentCardWeatherImg'}
                            src={CardWeatherConditionICON}
                        />
                    </div>
                    <div>
                        <h2 className={'currentCardWeatherStateTxt'} >{CardWeatherCondition}</h2>
                    </div>
                </div>

                {/* <!-- ------------------------------------------------ --> */}

                <div className={'currentCardWeatherStatsDiv'} >
                    <div className={'cardStatDiv'} >
                        <span className="current-card-humidity-txt">HUMIDITY</span>
                        <span className="current-card-humidity-percent">{Humidity}</span>
                    </div>
                    {/* <!-- ------------------------------------------------ --> */}
                    <div className={'cardStatDiv'} >
                        <span className="current-card-real-feel-txt">REAL FEEL</span>
                        <span className="current-card-real-feel-degrees">{RealFeel}</span>
                    </div>
                    {/* <!-- ------------------------------------------------ --> */}
                    <div className={'cardStatDiv'}>
                        <span className="current-card-low-high-txt">LOW/HIGH</span>
                        <span className="current-card-low-high-degrees">{LowTemps}/{HighTemps}</span>
                    </div>
                    {/* <!-- ------------------------------------------------ --> */}
                    <div className={'cardStatDiv'}>
                        <span className="current-card-wind-txt">WIND</span>
                        <span className="current-card-wind-mph">{WindSpeed}</span>
                    </div>
                    {/* <!-- ------------------------------------------------ --> */}

                </div>

            </div>

            <>
                <SavedLocations SavedLocationContent={SavedLocationContent} onSelectSavedCity={RunApiCallFromSavedCityName} />

            </>


        </div>
    )
}

export default CurrentCard