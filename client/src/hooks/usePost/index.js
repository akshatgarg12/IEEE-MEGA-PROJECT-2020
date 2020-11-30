import {useCallback, useState} from 'react';
import axios from 'axios';

const useFetch = ({url, headers, payload})=>{
  const [result, setResult] = useState({data:null, error:null, loading :false});
  const postData = useCallback(()=>{
    setResult((prev) => ({...prev, loading:true}));
    axios.post(url,payload,headers).then(res => {
      // console.log(JSON.parse(res.data));
      setResult({data: res.data, loading: false, error: null});
   }).catch((error) => {
    setResult({data: null, loading: false, error});
   })
  },[url, headers, payload]);

  return [result, postData];
}

export default useFetch;