import styled, {keyframes} from "styled-components";

const colors = {
    darkGreen: '#4f6036',
    lightGreen: '#93b662',
    black: '#1d1612',
    darkGray: '#747474',
    lightGray: '#9b9b9b'
}

const fonts = {
    en: `'Josefin Sans',sans-serif`,
    ch: `'Noto Sans TC', sans-serif`
}


const Container = styled.div`
    width: 70%;
    height: 40vh;
    margin: 3rem auto;

    @media (max-width: 900px){
        width: 90%;
        height: fit-content;
    }
`

const Banner = styled.img`
  width: 100%;
  height: 55vh;
  object-fit: cover;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(${props => (props.$loaded ? '0' : '-10px')});
  opacity: ${props => (props.$loaded ? '1' : '0')};

  @media (max-width: 900px){
      height: 35vh;
  }
  @media (max-width: 500px){
      height: 30vh;
  }
`

export {
    colors,
    fonts,
    Container,
    Banner
}