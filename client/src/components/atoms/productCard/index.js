import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import CustomPopover from '../popover';
import './style.css';
const ProductCard = ({product, onClick}) => {
  return (
    <div className="product-card">
      <Card color="faded">
        <CardImg top src={product.images} className="product-img" alt="product-img"/>
        <CardBody>
          <CardTitle tag="h5">{product.title}</CardTitle>

          <CardSubtitle tag="h6" className="mb-2 text-muted">{product.price}</CardSubtitle>
          
          <CardText>total reviews: {product.reviews}</CardText>

          <div className="row-flex">
            <Button color="info" onClick={onClick}>Analyse</Button>
            <CustomPopover />
          </div>
          
        </CardBody>
      </Card>
    </div>
  );
}
 
export default ProductCard;