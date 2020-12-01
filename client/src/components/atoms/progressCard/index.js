import { Card, CardTitle, CardText } from 'reactstrap';
import ProgressBar from '../progressBar';
import './style.css';

const ProgressCard = ({title, text, progressBar}) => {
  return (
    <div className="progress-card">
      <Card body outline color="secondary">
          <CardTitle tag="h5">{title}</CardTitle>
          <CardText>{text}</CardText>
          <ProgressBar 
            color= {progressBar.color}
            value = {progressBar.value}
          />
      </Card>
    </div>
  );
}
 
export default ProgressCard;