import styled from "styled-components";
import * as styles from '../common/common.styled'
import useImgFadeIn from "../hook/ImgFadeIn";

const Container = styled(styles.Container)`
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Img = styled.img`
    width: 10rem;
    object-fit: cover;
    margin-bottom: 1rem;
    @media (max-width: 500px){
        width: 7.5rem;
    }
`
const Paragraph = styled.section`
    height: fit-content;
    width: 50%;
    text-align: center;
    font-family: ${styles.fonts.ch};
    h3{
        color: ${styles.colors.darkGreen};
    }
    p{
        color: ${styles.colors.darkGray};
        line-height: 2rem;
        margin: 0;
    }
    span{
        font-family: ${styles.fonts.en};
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

export default function Story(){
    const imageSrc = require('../assets/storypage/banner.JPG')
    const isBannerLoaded = useImgFadeIn(imageSrc)
    return(
        <>
            <styles.Banner src={require('../assets/storypage/banner.JPG')} alt="banner" $loaded={isBannerLoaded}/>
            <Container>
                <Paragraph>
                    <h3>關於名字</h3>
                    <p>
                        <span>Plantae</span>，是生物分類法中植物界的意思，是一切包羅萬象的植物。如果一種植物是一顆星星，那植物界就是包容那閃爍繁星的宇宙。
                        <br/>
                        而我們期許，能將這片屬於植物宇宙中的美好呈現給您。
                    </p>
                </Paragraph>
            </Container>
            <Container>
                <Img src={require('../assets/mainpage/植宇宙_logo-01.png')} alt='logo'/>
                <Paragraph>
                    <h3>關於 <span>Logo</span></h3>
                    <p>
                        北歐神話世界中，有個世界之樹，
                        枝幹直達天際，根系深植地底，
                        支撐宇宙的一切，樹枝連接各個國度。
                        我們藉這個意象，說明產品拓展的願景，
                        傳達與自然共存的精神。
                    </p>
                </Paragraph>
            </Container>
            <Container>
                <Paragraph>
                    <h3>我們的願景</h3>
                    <p>
                        2022 年的秋天，四位 85 年次，來自農藝 × 中文領域的夥伴創立了夢想中的品牌。
                        我們的信念如同小小種子，在這年種下，
                        期許著，未來能如世界樹般開展枝椏，
                        “植宇宙 <span>PLANTAE Taiwan</span>”化為一份禮物，以夢想為名，
                        在臺灣的土地上紮根，
                        成長、茁壯，陪您走過接下來的每一段路。
                    </p>
                </Paragraph>
            </Container>
        </>
    )
}