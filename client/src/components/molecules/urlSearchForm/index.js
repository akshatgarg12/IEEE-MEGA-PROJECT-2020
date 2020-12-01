import React, { useState } from 'react';
import SearchForm from '../SearchForm';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../atoms/loadingSpinner';

const URLSearchForm = () => {
  const [url, setURL] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(url);
    const response = await axios.post('http://localhost:5000/api/product_review',{
      url:url
    })
    if(response.status === 200){
      console.log(response.data);
      setLoading(false);
      if(response.data.error){
        return;
      }
      return history.push({pathname:'/review', state:{"product":{...response.data, url}}});
    }
    else{
      setLoading(false);
      console.log("error occured");
    }
    
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