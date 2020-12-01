import React, { useState } from 'react';
import SearchForm from '../SearchForm';
import {useHistory} from 'react-router-dom';

import LoadingSpinner from '../../atoms/loadingSpinner';
import PostHandler from '../../../util/postHandler';

const URLSearchForm = () => {
  const [url, setURL] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const response = await PostHandler(setLoading,'product_review',{url});
    if(response){
      return history.push({pathname:'/review', state:{"product":{...response, url}}});
    }else return;
  }
  if(loading){
    return <LoadingSpinner />
  }
  return (
    <SearchForm 
      title="Sentiment Analysis of Product"
      searchBox = {{
        label:"URL of product homepage",
        type:"url",
        placeholder:"url of product",
        value:url,
        setValue:setURL
      }}
      onClick={SubmitHandler}
      />
  );
}
 
export default URLSearchForm;