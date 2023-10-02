import axios from "axios";

export interface IOpenWeatherApiResponse {
  name: string;
  weather: [{
    main: string,
    description: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string;
  }
}

export async function getServiceApiResponse(cityName: string): Promise<any> {
  const fullUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=pt_br&units=metric&APPID=3ee32176fbc4070662893138e0e9dea6`
  const response = await axios.get<IOpenWeatherApiResponse>(fullUrl)
  return response.data
}