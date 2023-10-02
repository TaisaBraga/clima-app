import React from 'react'
import styled from 'styled-components'

interface IInfoWeatherProps {
  city?: string,
  uf?: string,
  temperature: number,
  forecast: string
}

const InfoWeatherDiv = styled.div`
h2{
  font-family: 'Noto Serif';
  font-size: 2em;
  padding: 10px;

}
h3{
  font-family: 'Noto Serif';
  font-size: 2em;
  marign-top: 1em;
}
p{
  padding: 10px;
  font-family: 'PT Serif';
  font-size: 2em;
}
`;

const TemperatureInfo = styled.div`
background-color: rgba(10,23,55,0.4);
align-items: center;
border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
display: flex;
height: 12em;
margin: 2em auto;
width: 12em;
h2 {
  font-family: 'Noto Serif';
  font-size: 2em;
};
p {
  color: #fff;
  font-family: 'Teko';
  font-size: 4em;
  margin: 0 auto;
  text-shadow: 3px 3px 2px rgba(0, 0, 0, 0.73);
};
`;

export const InfoWeather = (props: IInfoWeatherProps) => {
  const getDateTime = new Date().toDateString()
  return (
    <InfoWeatherDiv>
      <h2>{props.city}, {props.uf}</h2>
      <p>{getDateTime}</p>
      <TemperatureInfo>
        <p>{`${props.temperature}°`}</p>
      </TemperatureInfo>
      <h3 color='black'>{(props.forecast).toLocaleUpperCase()}</h3>
    </InfoWeatherDiv >
  )
}
