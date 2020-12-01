import React, { useState } from 'react';
import SearchForm from '../SearchForm';
import {useHistory} from 'react-router-dom';
import LoadingSpinner from '../../atoms/loadingSpinner';
import PostHandler from '../../../util/postHandler';

const ProductSearchForm = () => {
  const history = useHistory();
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);


  const SubmitHandler = async (e) => {
    e.preventDefault();
    const response = await PostHandler(setLoading,'search_amazon',{product});
    if(response){
      return history.push({
        pathname:"/products",
        state:{
          products:response
        }
      })
    }else return;
    
  }
  if(loading){
    return <LoadingSpinner />
  }

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
      onClick={SubmitHandler}
    />
  );
}
 
export default ProductSearchForm;