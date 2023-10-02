import styled from 'styled-components'

const ErrorBox = styled.div`
background-color: rgba(10,23,55,0.4);
border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
color: #fff;
padding: 4.5em;
p {
  font-size: 1.5em;
  margin-top: 1em;
}
`
export const ErrorDialog = () => {
  return (
    <ErrorBox>
      <h1>Erro ao obter dados!</h1>
      <p>Por favor, verifique se o nome da cidade foi digitado corretamente.</p>
    </ErrorBox>
  )
}
