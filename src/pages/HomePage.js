import React, { useState, useEffect } from 'react'
import HomePageStyles from './HomePage.module.css'

import SearchLocation from '../components/search/SearchLocation'
import CurrentCard from '../components/currentCard/CurrentCard'
import HourlyCards from '../components/hourlyCards/HourlyCards'
import Weekly from '../components/weekly/Weekly'


import currentLocationWeatherAPI from '../utils/currentLocationWeatherAPI'
import searchLocationWeatherAPI from '../utils/searchLocationWeatherAPI'

import { ApiInputText } from '../components/search/SearchLocation'

const HomePage = () => {
  const [currentLocationWeatherData, setCurrentLocationWeatherData] = useState();
  const [searchLocationWeatherData, setSearchLocationWeatherData] = useState();


  const currentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        currentLocationWeatherAPI(latitude, longitude)
          .then((data) => {
            setCurrentLocationWeatherData(data);
            console.log(data);
          })
          .catch((error) => {
            console.error("Error in fetching weather data:", error);

          });
      });
    }
  };


  const searchLocationName = (SavedcityName) => {

    searchLocationWeatherAPI( SavedcityName || ApiInputText).then((data) => {
      setSearchLocationWeatherData(data)
      console.log(data);
    })
      .catch((error) => {
        console.error("Error in fetching weather data:", error);
      });
  }

  return (
    <>
      <SearchLocation currentLocation={currentLocation} searchLocationName={searchLocationName} />
      <CurrentCard currentLocationWeatherData={currentLocationWeatherData} searchLocationWeatherData={searchLocationWeatherData} searchLocationName={searchLocationName} />
      <HourlyCards currentLocationWeatherData={currentLocationWeatherData} searchLocationWeatherData={searchLocationWeatherData} />
      <Weekly currentLocationWeatherData={currentLocationWeatherData} searchLocationWeatherData={searchLocationWeatherData} />
    </>
  )
}

export default HomePage