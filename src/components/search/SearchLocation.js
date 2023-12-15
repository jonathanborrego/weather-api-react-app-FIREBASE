import React, { useState, useEffect } from 'react'

import './searchLocation.css'

let ApiInputText = ''

const SearchLocation = ({ currentLocation, searchLocationName, }) => {
  const [inputText, setInputText] = useState('')
  const [placeholderTEXT, setPlaceholderTEXT] = useState('Miami, FL ...')
  const [inputClassNames, setInputClassNames] = useState('searchInput')

  useEffect(() => {
    setInputClassNames('searchInput')
    setPlaceholderTEXT('Miami, FL ...')
    setInputText('')
  }, [currentLocation])


  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);
    // console.log(value);
    ApiInputText = value
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    


    if (inputText == '') {
      setInputClassNames('searchInput searchInputPlaceHolder')
      setPlaceholderTEXT('Enter a valid name!')
    } else {
      setInputClassNames('searchInput')
      setPlaceholderTEXT('Miami, FL ...')
      setInputText('')
      searchLocationName()
    }

  }

  return (
    <>

      <div className={'searchBarDiv'}>
        <form
          onSubmit={handleSubmit}
        >
          <span className={'searchHolder'} >
            <input className={inputClassNames}
              // style={{}}
              type="text" placeholder={placeholderTEXT}
              value={inputText}
              onChange={handleInputChange}
            />
            <h6 className={'searchIcon'} onClick={handleSubmit}
            >Search</h6>
          </span>
        </form>
        <button
          className={'getCurrentLocation'}
          onClick={currentLocation}
        >Current Location</button>
      </div>

    </>
  )
}


export default SearchLocation
export { ApiInputText }