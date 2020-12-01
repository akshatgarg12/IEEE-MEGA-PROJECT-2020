import { Container, Row, Col } from 'reactstrap';
import ProgressCard from '../../atoms/progressCard';
import './style.css';

const SentimentScore = ({scores}) => {
  return (
    <Container className="sentiment-scores">
    <Row xs="1" sm="2" md ="3">
      {
        scores && 
        scores.map((score, index)=>{
          return <Col key = {index}>
            <ProgressCard 
              title={score.title}
              text={score.text}
              progressBar = {
                {
                  color:score.color,
                  value:score.value
                }
              }
            />
          </Col>
        })
        }
    </Row>
    </Container>
  );
}
 
export default SentimentScore;