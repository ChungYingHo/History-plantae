import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Container = styled.div`
    width: 100%;
`

export default function MainLayout(){
    return(
        <Container>
            <Header/>
            <Outlet/>
            <Footer/>
        </Container>
    )
}