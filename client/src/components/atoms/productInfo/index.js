import {Button} from 'reactstrap';
import './style.css';

const ProductInfo = ({product}) => {
  return (
    <div className="product-info">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <h4>{product.price}</h4>
      <Button color="info">Purchase</Button>
    </div>
  );
}
 
export default ProductInfo;