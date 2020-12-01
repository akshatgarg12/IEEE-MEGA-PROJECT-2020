import ProductList from "../../molecules/productList";

const ProductPage = (props) => {
  const products = props.location.state.products;
  return (
    <ProductList 
      products= {products}
    />
  );
}
 
export default ProductPage;