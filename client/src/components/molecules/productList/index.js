import { Container, Row, Col } from 'reactstrap';
import ProductCard from '../../atoms/productCard';
import './style.css';

const ProductList = ({products}) => {
  return (
    <Container className="product-list">
      <Row xs="1" sm="2" md="3">
        
        {
          products && products.map((product, index)=>{
            return <Col key={index}><ProductCard product={product} onClick={()=>{}}/></Col>
          })
        }
       
      </Row>
    </Container>
  );
}
 
export default ProductList;