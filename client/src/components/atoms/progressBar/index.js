import { Progress } from 'reactstrap';

const ProgressBar = ({value, color}) => {
  return (
    <Progress animated color={color} value={value} />
  );
}
 
export default ProgressBar;