import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY;
const countryBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';
const weatherBaseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const weatherQuery = 'today?unitGroup=metric&include=fcst,current&contentType=json&key='+api_key;

const getAllCountries = () => {
	const request = axios.get(`${countryBaseUrl}all`);
	return request.then(response => response.data);
}

const getWeather = (lat,lon) => {
	const url = `${weatherBaseUrl}${lat},${lon}/${weatherQuery}`;
	const request = axios.get(url);
	return request.then(response => response.data);
}



export default { getAllCountries,getWeather}