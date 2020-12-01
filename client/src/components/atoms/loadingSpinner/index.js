import { Spinner } from 'reactstrap';

const LoadingSpinner = () => {
  return (   
    <div style={{display:"block" ,padding:"50px", textAlign:"center", minHeight:"50vh", margin:"auto"}}>
        <Spinner color="info" />
     </div> 
  );
}
 
export default LoadingSpinner;