import ProductDescription from "../../molecules/productDescription";
import {Container, Row, Col} from 'reactstrap'
import SentimentScore from "../../molecules/sentimentScore";
import ReviewBox from "../../atoms/reviewBox";
import Heading from "../../atoms/heading";
import './style.css';


const ReviewPage = (props) => {
  const productData = props.location.state.product
  console.log(productData);

  return (
    <Container className="review-page">
      <Row sm="1" md="1" lg="1">
        <Col>
          <ProductDescription 
            product={productData}
          />
          <Heading 
            text="Longest Review"
          />
          <ReviewBox 
            review={productData.largest_review}
          />
        </Col>
        
        <Col>
        <Heading 
            text="Sentiment Analysis on reviews"
          />
        <SentimentScore 
          scores = {productData.score}
        />
        </Col>
      </Row>
    </Container>
  );
}
 
export default ReviewPage;