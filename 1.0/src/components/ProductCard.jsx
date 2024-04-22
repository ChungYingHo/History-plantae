import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import * as styles from '../common/common.styled'

const StyledCard = styled(Card)`
    width: 30%;
    height: fit-content;
    min-height: 70vh;
    @media (max-width: 900px){
        width: 80%;
        min-height: fit-content;
        margin-bottom: 2rem;
    }
`
const Img = styled(Card.Img)`
    height: 28vh;
    object-fit: cover;
`
const Title = styled(Card.Title)`
    color: ${styles.colors.darkGreen};
    font-family: ${styles.fonts.ch};
    span{
        font-family: ${styles.fonts.en};
    }
`
const Text = styled(Card.Text)`
    color: ${styles.colors.darkGray};
    font-family: ${styles.fonts.ch};
    line-height: 2rem;
    margin-bottom: 1rem;
`

export default function ProductCard({name_ch, name_en, img, des}){
    return(
        <StyledCard>
            <Img variant="top" src={img}/>
            <Card.Body>
                <Title>{name_ch} <span>{name_en}</span></Title>
                <Text>{des}</Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </StyledCard>
    )
}