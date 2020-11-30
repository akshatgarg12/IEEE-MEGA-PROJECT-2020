import React from 'react';
import ProductSearchForm from '../../molecules/productSearchForm';
import URLSearchForm from '../../molecules/urlSearchForm';

const HomePage = () => {
  return (
  <div> 
    <URLSearchForm />
    <ProductSearchForm />
  </div>
  );
}
 
export default HomePage;