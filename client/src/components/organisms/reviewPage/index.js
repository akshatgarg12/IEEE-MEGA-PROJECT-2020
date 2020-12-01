import ProductDescription from "../../molecules/productDescription";
import {Container, Row, Col} from 'reactstrap'
import SentimentScore from "../../molecules/sentimentScore";
import SentimentData from './data/sentiment.json';
import ProductData from './data/product.json';
import ReviewBox from "../../atoms/reviewBox";
import Heading from "../../atoms/heading";
import './style.css';
const ReviewPage = () => {
  return (
    <Container className="review-page">
      <Row sm="1" md="1" lg="1">
        <Col>
          <ProductDescription 
            product={ProductData}
          />
          <Heading 
            text="Longest Review"
          />
          <ReviewBox 
            review={ProductData.largest_review}
          />
        </Col>
        
        <Col>
        <Heading 
            text="Sentiment Analysis on reviews"
          />
        <SentimentScore 
          scores = {SentimentData}
        />
        </Col>
      </Row>
    </Container>
  );
}
 
export default ReviewPage;