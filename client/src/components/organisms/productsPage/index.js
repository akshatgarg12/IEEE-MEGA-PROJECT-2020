import ProductList from "../../molecules/productList";

const ProductPage = () => {
  return (
    <ProductList 
      products= {
        [
          {
            img:"https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
            name:"football",
            price:"Rs. 2000",
            description:"A really ligh weight and great football"
          },
          {
            img:"https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
            name:"football",
            price:"Rs. 2000",
            description:"A really ligh weight and great football"
          }
        ]
      }
    />
  );
}
 
export default ProductPage;