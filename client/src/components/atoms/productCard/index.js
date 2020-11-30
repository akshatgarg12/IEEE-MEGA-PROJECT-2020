import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './style.css';
const ProductCard = ({product, onClick}) => {
  return (
    <div className="product-card">
      <Card color="faded">
        <CardImg top width="100%" src={product.img} alt="product-img" />
        <CardBody>
          <CardTitle tag="h5">{product.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{product.price}</CardSubtitle>
          <CardText>{product.description}</CardText>
          <Button color="info" onClick={onClick}>Analyse</Button>
        </CardBody>
      </Card>
    </div>
  );
}
 
export default ProductCard;