import { Container, Row , Col } from 'reactstrap';
import ProductAvatar from '../../atoms/productAvatar';
import ProductInfo from '../../atoms/productInfo';
import './style.css';

const ProductDescription = ({product}) => {
  return (
    <Container className="product-description">
      <Row xs="1" sm="1" md="1" lg="2">
        <Col>
          <ProductAvatar img={product.img} />
        </Col>
        <Col className="product-info">
            <ProductInfo 
              product = {product}
            />
        </Col>
      </Row>
    </Container>
  );
}
 
export default ProductDescription;