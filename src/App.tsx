import styled from 'styled-components';
import './App.css';
import { SearchCityInput } from './components/SearchCityInput';
import { InfoWeather } from './components/InfoWeather';
import { useEffect, useState } from 'react';
import { IOpenWeatherApiResponse, getServiceApiResponse } from './serviceApi/serviceApi';
import clearWeather from '../src/assets/clearWeather.jpg';
import cloudyWeather from '../src/assets/cloudyWeather.jpg';
import rainyWeather from '../src/assets/rainyWeather.jpg';
import defaultImage from '../src/assets/defaultImage.jpg';
import clearWeatherNight from '../src/assets/clearWeatherNight.jpg'
import cloudyWeatherNight from '../src/assets/cloudyWeatherNight.jpg'
import rainyWeatherNight from '../src/assets/rainyWeatherNight.jpg'
import { ErrorDialog } from './components/ErrorDialog';

function mapWeatherToBackground(weatherDescription: unknown) {
  const getTimeValue = new Date().getHours()
  const isDay = getTimeValue <= 17
  const isNight = getTimeValue >= 18

  if (isDay) {
    if (weatherDescription === 'Clouds') {
      return 'cloudy'
    } else if (weatherDescription === 'Rain') {
      return 'rainy'
    } else if (weatherDescription === 'Clear') {
      return 'clear'
    } else {
      return 'default'
    }
  } else if (isNight) {
    if (weatherDescription === 'Clouds') {
      return 'cloudyNight'
    } else if (weatherDescription === 'Rain') {
      return 'rainyNight'
    } else if (weatherDescription === 'Clear') {
      return 'clearNight'
    } else {
      return 'default'
    }
  }

}

const HomePage = styled.div`
  display: flex;
  background-image: url(${defaultImage});
  background-size: cover;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  text-align: center;  
  text-align: center;
  &.default {
    background-image: url(${defaultImage});
    background-size: cover;
  };
  &.rainy {
    background-image: url(${rainyWeather});
    background-size: cover;
  };
  &.cloudy {
    background-image:  url(${cloudyWeather});
    background-size: cover;
  };
  &.clear {
    background-image: url(${clearWeather});
    background-size: cover;
  };
  &.clearNight {
    background-image: url(${clearWeatherNight});
    background-size: cover;
  };
  &.cloudyNight {
    background-image: url(${cloudyWeatherNight});
    background-size: cover;
  };
  &.rainyNight {
    background-image: url(${rainyWeatherNight});
    background-size: cover;
  };
  & h1 {
    font-family: 'Yeseva One';
    font-size: 2.8em
  };
`

const Box = styled.div`
background-color: rgba(10,23,55,0.4);
border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
color: #fff;
padding: 4em;

`

const SearchCity = styled.div`
  margin: 2.5em  0 2em 0
`

function App() {
  const [cityName, setCityName] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<IOpenWeatherApiResponse | undefined>(undefined);
  const [errorData, setErrorData] = useState<boolean>(false);

  const hadleCityName = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCityName(inputValue);
    }
  };
  useEffect(() => {
    if (cityName) {
      setErrorData(false);
      setLoading(true);
      getServiceApiResponse(cityName)
        .then((responseData) => {
          setResponseData(responseData);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setErrorData(true);
          }
          console.error('Erro ao obter os dados:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [cityName])

  const weatherBackground = mapWeatherToBackground(responseData?.weather[0]?.main);

  return (
    <HomePage className={`App ${weatherBackground}`}>
      <Box>
        <h1>Previsão do Tempo</h1>
        <SearchCity>
          <SearchCityInput onChange={hadleCityName} inputValue={inputValue} handleKeyPress={handleKeyPress} />
        </SearchCity>
        {loading ? (
          <p style={{ color: '#fff', fontSize: '2.8em' }}>Carregando...</p>)
          : errorData ?
            (<ErrorDialog />) :
            responseData ?
              (<InfoWeather
                city={responseData.name}
                uf={responseData.sys.country}
                temperature={Math.floor(responseData?.main?.temp)}
                forecast={responseData?.weather[0]?.description}
              />)
              :
              (null)
        }

      </Box>
    </HomePage>
  );
}

export default App;
