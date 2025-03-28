import React, { useState } from 'react';
import './Weather.css';
import { handleError, handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';
function Weather() {
    const [location, setLocation] = useState('');
    const [current, setCurrent] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false); 

    const fetchWeather = async () => {
        if (!city){
            handleError('City name required')
        }
        setLoading(true); 

        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a88485f783ad432198943908242608&q=${city}&aqi=y`);
            const data = await response.json();
            setLocation(data.location);
            setCurrent(data.current);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
            <div className="weather">
                <div className="container">
                    <div className="search">
                        <input 
                            type="text" 
                            onChange={(e) => setCity(e.target.value)} 
                            placeholder="Please Enter The City..." 
                        />
                        <button onClick={fetchWeather}>Search</button>
                    </div>

                    {loading ? (
                        <p className="loader">Loading weather data...</p>
                    ) : location ? (
                        <div>
                            <div className="location">
                                <p>{location.name}, {location.region}, {location.country}</p>
                            </div>
                            <div className="data">
                                <div className="image">
                                    <img src={current.condition.icon} alt="" />
                                    <p><b>{current.condition.text}</b></p>
                                </div>
                                <p className='temp'>{current.temp_c} °C</p>
                                <div className="info">
                                    <p>Wind: {current.wind_kph} KPH</p>
                                    <p>Humidity: {current.humidity}</p>
                                    <p>Cloud: {current.cloud}</p>
                                </div>
                            </div>
                            <div className="cards">
                                <div className="card">
                                    <h3>Temp</h3>
                                    <p>In C: {current.temp_c}</p>
                                    <p>In F: {current.temp_f}</p>
                                </div>
                                <div className="card">
                                    <h3>Wind</h3>
                                    <p>In MPH: {current.wind_mph}</p>
                                    <p>Degree: {current.wind_degree}</p>
                                </div>
                                <div className="card">
                                    <h3>GUST</h3>
                                    <p>In KPH: {current.gust_kph}</p>
                                    <p>In MPH: {current.gust_mph}</p>
                                </div>
                                <div className="card">
                                    <h3>HeatIndex</h3>
                                    <p>In C: {current.heatindex_c}</p>
                                    <p>In F: {current.heatindex_f}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="first">Please enter the city to check the weather status</p>
                    )}
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

export default Weather;
