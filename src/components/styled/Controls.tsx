import styled from 'styled-components'

export const Outer = styled.div`
    display: flex;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
`

export const Inner = styled.div`
    max-width: 1000px;
    flex-shrink: 0;
    margin: 20px;
    border: 4px solid transparent;
    background-origin: border-box;
    background-clip: content-box, border-box;
    background-size: cover;
    box-sizing: border-box;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(to bottom left, #7d7d7d,#4747a5);
`

export const Content = styled.div`
    padding: 20px;
`

export const Button = styled.button`
    margin-left: 12px;
    cursor: pointer;
`

export const Input = styled.input`
    width: 40px;
    margin: 4px;
`

export const InputWrapper = styled.div`
`
