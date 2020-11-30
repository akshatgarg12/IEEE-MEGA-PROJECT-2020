import React, { useState } from 'react';
import SearchForm from '../SearchForm';

const URLSearchForm = () => {
  const [url, setURL] = useState('');
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
      onClick={()=>{console.log(url)}}
    />
  );
}
 
export default URLSearchForm;