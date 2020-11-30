import React, { useState } from 'react';
import SearchForm from '../SearchForm';

const ProductSearchForm = () => {
  const [product, setProduct] = useState('');
  return (
    <SearchForm 
      title="Search a product"
      searchBox = {{
        label:"Product name",
        type:"text",
        placeholder:"product",
        value:product,
        setValue:setProduct
      }}
      onClick={()=>{console.log(product)}}
    />
  );
}
 
export default ProductSearchForm;