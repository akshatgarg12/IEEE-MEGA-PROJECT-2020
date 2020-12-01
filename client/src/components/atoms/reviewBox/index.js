import './style.css';
const ReviewBox = ({review}) => {
  return (
    <div>
        <div className="review-box">
          <p className="lead">{review}</p>
        </div>
    </div>
  );
}
 
export default ReviewBox;