import React, {useState, useEffect} from 'react';
import Weathercard from './weathercard';
import "./style.css";

const Weather = () => {

    //Title of the site
    useEffect(() => {
        document.title = `Weather`;
      });

    const [searchValue, setSearchValue] = useState("Haridwar");
    const [weatherInfo, setWeatherInfo] = useState({});

    const getWeatherInfo = async () => {
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=bdd752e40e520785512263bd837314b3`;
            const result = await fetch(url);
            console.log('Sandeep'+result);
            const data = await result.json();  
            console.log('data',data) 
            
            const { temp, humidity, pressure } = data.main;
            const { main: weatherMood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys; 
            console.log(temp, humidity, pressure, weatherMood, name, speed, country, sunset);

            const weatherInfoFromApi = {
                temp,
                humidity,
                pressure,
                weatherMood,
                name,
                speed,
                country,
                sunset,
            }
            setWeatherInfo(weatherInfoFromApi);
        }
        catch(error){
            console.log("error occured");
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);

  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input 
                type="search"
                placeholder='Search City Here'
                autoFocus
                id='search'
                className='searchTerm'
                value={searchValue}
                onChange={ (e) => setSearchValue(e.target.value) }
            />
            <button className='searchButton' type='button' onClick={getWeatherInfo}>
                Search
            </button>
        </div>
      </div>
      <Weathercard weatherInfo={weatherInfo} />
    </>
  )
}

export default Weather
