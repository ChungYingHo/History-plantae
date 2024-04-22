import styled from "styled-components";
import * as styles from '../common/common.styled'
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

// *styled component
const Container = styled.div`
    width: 100%;
    margin: 0;
    background-color: rgba(255, 255, 255, 0.6);
    position: sticky;
    top: 0;
    transition: transform 0.3s ease-in-out;
    transform: translateY(0%);
    z-index: 100;
    // 滾輪下滑隱藏
    ${props => !props.$isNavVisible && `
        transform: translateY(-100%);
    `}
`
const Nav = styled.nav`
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 900px){
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        position: relative;
    }
`
const Img = styled.img`
    height: 3.5rem;
    margin: 1rem 0;

    @media (max-width: 900px){
        grid-column: 2/3;
        margin: 1rem auto;
    }
    @media (max-width: 500px){
        height: 3rem;
    }
`
const Ul = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;

    @media (max-width: 900px){
        position: absolute;
        top: 100%;
        left: 0;
        margin: 0;
        width: 100vw;
        height: fit-content;
        display: flex;
        flex-flow: column nowrap;
        transition: transform 0.3s ease-out;
        transform: scale(1, 0);
        transform-origin: top;
        li{
            opacity: 0;
        }
        ${props => props.$hamburgerOpen && !props.$isUlHidden &&`
            border-top: ${styles.colors.lightGreen} solid 5px;
            background-color: rgba(255, 255, 255, 0.9);
            transform: scale(1, 1);
            z-index: 100;
            li{
                margin: 0.75rem 0;
                opacity: 1;
                transition: opacity 0.2s ease-out 0.15s;
                font-size: 1.5rem;
                @media (max-width: 900px){
                    font-size: 1.2rem;
                }
            }
        `}
    }
`
const Li = styled.li`
    list-style-type: none;
    text-decoration: none;
    color: ${styles.colors.darkGreen};
    font-family: ${styles.fonts.en};
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0 1rem;
    cursor: pointer;
    &:hover{
        color: ${styles.colors.lightGreen};
    }
    ${props => props.$isActive && `
        color: rgba(79, 96, 54, 0.7);
    `}
`
const Hamburger = styled.div`
    width: 2rem;
    height: 2rem;
    display: none;

    @media (max-width: 900px){
        grid-column: 3/4;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        justify-self: end;
        margin-right: 1rem;
    }
`
const Burger = styled.div`
    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    background-color: ${styles.colors.darkGreen};
    ${props => props.$hamburgerOpen && `
        background-color: ${styles.colors.lightGreen};
    `}
`


// *Header here
export default function Header(){
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [hamburgerOpen, setHamburgerOpen] = useState(false)
    // !為了額外控管而增設的
    const [isUlHidden, setIsUlHidden] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    // !控制 navbar 隨 scroll 方向顯示
    useEffect(() => {
        const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        
        if(currentScrollPos > prevScrollPos && Math.round(currentScrollPos - prevScrollPos) > 20){
            setIsNavVisible(false)
            setIsUlHidden(true)
        }else if(currentScrollPos < prevScrollPos){
            setIsNavVisible(true)
            setIsUlHidden(false)
            setHamburgerOpen(false)
        }

        setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    // 控制 hamburger
    const handleHamburger = ()=>{
        setHamburgerOpen(!hamburgerOpen)
    }

    return(
        <Container $isNavVisible={isNavVisible}>
            <Nav>
                <Img src={require('../assets/mainpage/植宇宙_標準字 since2022.png')} alt="logo"/>
                <Ul $isUlHidden={isUlHidden} $hamburgerOpen={hamburgerOpen}>
                    <Li onClick={()=>navigate('/home')} $isActive={location.pathname.startsWith('/home')}>Home</Li>
                    <Li onClick={()=>navigate('/story')} $isActive={location.pathname.startsWith('/story')}>Story</Li>
                    <Li onClick={()=>navigate('/menu')} $isActive={location.pathname.startsWith('/menu')}>Menu</Li>
                </Ul>
                <Hamburger onClick={handleHamburger}>
                    <Burger $hamburgerOpen={hamburgerOpen}/>
                    <Burger $hamburgerOpen={hamburgerOpen}/>
                    <Burger $hamburgerOpen={hamburgerOpen}/>
                </Hamburger>
            </Nav>
        </Container>
    )
}