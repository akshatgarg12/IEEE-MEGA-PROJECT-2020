import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import PostHandler from '../../../util/postHandler';
import LoadingSpinner from '../../atoms/loadingSpinner';
import ProductCard from '../../atoms/productCard';
import './style.css';

const ProductList = ({products}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const ClickHandler =async (url) => {
    const response = await PostHandler(setLoading,'product_review',{url});
    if(response){
      return history.push({
        pathname:'/review',
        state:{
          "product":{
            ...response,
            url
          }
        }
      })
    } else return;
  }

  if(loading) return <div style={{minHeight:"90vh"}}><LoadingSpinner /></div>
  return (
    <Container className="product-list">
      <Row xs="1" sm="2" md="3">
        {
          products && products.map((product, index)=>{
            return <Col key={index}><ProductCard product={product} onClick={()=>{ClickHandler(`https://www.amazon.in${product.url}`)}}/></Col>
          })
        }
      </Row>
    </Container>
  );
}
 
export default ProductList;