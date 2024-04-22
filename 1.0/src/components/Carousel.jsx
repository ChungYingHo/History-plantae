import styled from 'styled-components';
import * as styles from '../common/common.styled'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const Img = styled.img`
    width: 100%;
    height: 55vh;
    object-fit: cover;

    @media (max-width: 900px){
        height: 35vh;
    }
    @media (max-width: 500px){
        height: 30vh;
    }
`
const H3 = styled.h3`
    font-family: ${styles.fonts.ch};
    @media (max-width: 500px){
        font-size: 1.25rem;
    }
`
const Paragraph = styled.p`
    font-family: ${styles.fonts.en};
    @media (max-width: 500px){
        display: none;
    }
`

function MyCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Img src={require('../assets/mainpage/tree.jpg')} alt="tree"/>
        <Carousel.Caption>
          <H3>獻給您，大自然的贈禮</H3>
          <Paragraph>The gift of the nature, the gift for you</Paragraph>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Img src={require('../assets/mainpage/tea3.jpg')} alt="tea"/>
        <Carousel.Caption>
          <H3>屬於台灣的味道</H3>
          <Paragraph>
            When it comes to Taiwan, what comes to your mind? Summer mangoes? Mid-Autumn pomelos? You're absolutely right. Let us introduce the Taiwan's flavor to you
          </Paragraph>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Img src={require('../assets/mainpage/farm.jpg')} alt="farm"/>
        <Carousel.Caption>
          <H3>分享台灣的美好</H3>
          <Paragraph>
            Each agricultural product is a symphony composed by the earth and the hardworking farmers, and it's our responsibility to ensure that you get to savor this beautiful composition.
          </Paragraph>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
