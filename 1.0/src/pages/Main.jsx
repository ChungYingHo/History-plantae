import styled from "styled-components"
import * as styles from '../common/common.styled'
// import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import MyCarousel from "../components/Carousel"
import OryzaPic from '../assets/mainpage/main-oryza.jpg'
import WheatPic from '../assets/mainpage/wheat.jpg'

const Container = styled(styles.Container)`
    display: flex;
    align-items: center;
    position: relative;

    @media (max-width: 900px){
        width: 100%;
        background-image: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url(${OryzaPic});
        background-size: cover;
    }
    @media (max-width: 500px){
        background-image: none;
    }
`
const Paragraph = styled.section`
    height: fit-content;
    width: 40%;
    font-family: ${styles.fonts.ch};
    h3{
        color: ${styles.colors.darkGreen};
    }
    p{
        color: ${styles.colors.darkGray};
        line-height: 2rem;
        margin: 0;
    }

    @media (max-width: 900px){
        width: 80%;
        text-align: center;
        margin: 0 auto;
        padding: 2rem 0;
        p{
            color: ${styles.colors.black};
        }
    }
    @media (max-width: 500px){
        width: 90%;
        padding: 0.5rem 0;
        p{
            line-height: 1.5rem;
            color: ${styles.colors.darkGray};
        }
    }
`
const GradientImg = styled.div`
    height: 100%;
    width: 60%;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url(${OryzaPic});
    background-size: cover;
    border-radius: 0 1rem 1rem 0;

    @media (max-width: 900px){
        display: none;
    }
`
const MaxContainer = styled(styles.Container)`
    width: 100%;
    height: 60vh;
    display: flex;
    align-items: center;
    position: relative;
    &::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(${WheatPic});
        background-size: cover;
        opacity: 0.9;
        z-index: -1;
    }

    @media (max-width: 900px){
        min-height: 35vh;
        height: fit-content;
    }
`
const MaxParagraph = styled(Paragraph)`
    width: 50%;
    margin: 0 auto;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 0.5rem;
    text-align: center;
    p{
        color: ${styles.colors.black};
    }
    .en{
        font-family: ${styles.fonts.en};
    }

    @media (max-width: 900px){
        width: 80%;
    }
    @media (max-width: 500px){
        .en{
            display: none;
        }
    }
`
const ThirdContainer = styled(styles.Container)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 900px){
        flex-direction: column;
    }
`
const SubCarousel = styled(Carousel)`
    width: 50%;
    height: 40vh;

    @media (max-width: 900px){
        width: 80%;
        height: 30vh;
        margin-bottom: 1rem;
    }
    @media (max-width: 500px){
        width: 90%;
        height: 25vh;
    }
`
const Img = styled.img`
    height: 40vh;
    width: 100%;
    border-radius: 1rem;
    object-fit: cover;

    @media (max-width: 900px){
        width: 100%;
        height: 30vh;
    }
    @media (max-width: 500px){
        width: 100%;
        height: 25vh;
    }
`

export default function Main(){
    return(
        <>
            <MyCarousel/>
            <Container>
                <Paragraph>
                    <h3>農藝，農．藝</h3>
                    <p>
                        農藝，指的是研究農業科學的技術。但對植宇宙來說，藝，不只是技術，也是一門藝術，一門將大地的禮物、農人的耕耘送至您生活中成為一幅風景的藝術。
                        <br/>
                        我們的夢想，是擔當藝術的掮客，甚至是創作的藝術的人，將屬於台灣大地的美、人們的情，送至千家萬戶的心裡。
                    </p>
                </Paragraph>
                <GradientImg/>
            </Container>

            <MaxContainer>
                <MaxParagraph>
                    <h3>屬於台灣的味道</h3>
                    <p className="ch">植宇宙定期配合在地小農採收，隨著時節轉移，推出季節性產品，將屬於台灣不同季節的美好呈現在您的餐桌</p>
                    <p className="en">PLANTAE Taiwan regularly collaborates with local small-scale farmers, harvesting in sync with the seasons to bring you seasonal products that showcase the unique beauty of Taiwan's different seasons at your dining table</p>
                </MaxParagraph>
            </MaxContainer>

            <ThirdContainer>
                <SubCarousel>
                    <Carousel.Item>
                        <Img src={require('../assets/mainpage/product.JPG')} alt="cookie"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Img src={require('../assets/mainpage/product2.JPG')} alt="mango"/>
                    </Carousel.Item>
                </SubCarousel>
                <Paragraph>
                    <h3>屬於植宇宙的獨特</h3>
                    <p>如同星空有著它的神秘、植物有它的奧妙，植宇宙現正致力於開發屬於我們獨特。我們將研發自家的手作商品，並且會定期分享各項覺得有趣的農業新知。</p>
                </Paragraph>
            </ThirdContainer>
        </>
    )
}