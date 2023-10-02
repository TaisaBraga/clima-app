import styled from 'styled-components'

interface ISearchCityInput {
  onChange: (event: any) => void,
  inputValue: string
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const NavegateMenu = styled.div`
input {
  border: none;
  border-radius: 8px;
  box-shadow: 1px 1px 3px #B5B5B5;
  font-family: 'PT Serif';
  font-size: 1.1em;
  height: 2.8em;
  padding: 10px;
  outline: 0;
  width: 25em;
}
`

export const SearchCityInput = (props: ISearchCityInput) => {
  return (
    <NavegateMenu>
      <input
        type="text"
        placeholder='Digite o nome da cidade...'
        maxLength={50}
        minLength={3}
        onChange={props.onChange}
        value={(props.inputValue).toUpperCase()}
        onKeyDown={props.handleKeyPress}
        required
      />
    </NavegateMenu>
  )
}
