import './style.css';

const ProductAvatar = ({img}) => {
  return (
    <div className="product-avatar">
      <img  alt="product-img" src={img} />
   </div>
  );
}
 
export default ProductAvatar;