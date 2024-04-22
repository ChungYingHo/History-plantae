import styled from "styled-components";
import * as styles from '../common/common.styled'
import ProductCard from "../components/ProductCard";
import { productList } from "../data/product";
import useImgFadeIn from "../hook/ImgFadeIn";

const Container = styled(styles.Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: fit-content;

    @media (max-width: 900px){
        flex-direction: column;
    }
`

export default function Menu(){
    const imageSrc = require('../assets/menupage/banner.JPG')
    const isBannerLoaded = useImgFadeIn(imageSrc)
    return(
        <>
            <styles.Banner src={require('../assets/menupage/banner.JPG')} alt="banner" $loaded={isBannerLoaded}/>
            <Container>
                {productList.map(data =>{
                    return(
                        <ProductCard key={data.id} name_ch={data.name_ch} name_en={data.name_en} img={data.img} des={data.des}/>
                    )
                })}
            </Container>
        </>
    )
}