import styled from "styled-components";
import * as styles from '../common/common.styled'
import { Link } from "react-router-dom";

const Container = styled.div`
    margin-top: 5rem;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), ${styles.colors.lightGreen};
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`
const Img = styled.img`
    width: 4rem;
    margin: 0.5rem 0;
`
const IconContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0.5rem 0;
`
const Icon = styled.img`
    width: 2rem;
    margin: 0 1rem;
`
const Paragraph = styled.p`
    font-family: 'Josefin Sans', sans-serif;
    margin: 0.5rem 0;
    color: ${styles.colors.darkGreen};
`

export default function Footer(){
    return(
        <Container>
            <Img src={require('../assets/mainpage/植宇宙_logo-01.png')} alt="logo"/>
            <IconContainer>
                <Link to="https://www.facebook.com/plantae.tw" target='_blank'>
                    <Icon src={require('../assets/mainpage/facebook.png')} alt="facebook"/>
                </Link>
                <Link to="https://www.instagram.com/plantae_taiwan/" target='_blank'>
                    <Icon src={require('../assets/mainpage/instagram.png')} alt="instagram"/>
                </Link>
                <Link to="mailto:plantae.tw@gmail.com">
                    <Icon src={require('../assets/mainpage/email.png')} alt="email"/>
                </Link>
            </IconContainer>
            <Paragraph>
                Copyright
                <span className="brand-trademark">&reg;</span>
                PLANTAE Taiwan
            </Paragraph>
        </Container>
    )
}