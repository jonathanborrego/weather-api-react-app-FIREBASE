import React, { useState, useEffect } from 'react'

import './SavedLocations.css'

let selectedCityName = ''


const SavedLocations = ({ SavedLocationContent, onSelectSavedCity, }) => {


    if (SavedLocationContent.length == 0) {
        return null
    }


    return (

        <div className={'savedLocations'} >
            {SavedLocationContent.map((savedLocation, index) => (

                <div
                    key={index}
                    onClick={() => onSelectSavedCity(savedLocation)}
                    className={'savedCityContainerDiv'}
                >
                    {/* <video src={savedLocation.backgroundVideo} className={'savedCityImg'}  muted autoPlay loop>
                    </video> */}
                    <div className={'savedCityContent'} >
                        <div className="savedCityName" >

                            <h2>{savedLocation.cityName}</h2>
                        </div>
                        <div className="savedCityTemp" >
                            <h2>{savedLocation.temperature}</h2>

                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default SavedLocations
export { selectedCityName }