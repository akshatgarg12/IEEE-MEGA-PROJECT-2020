import axios from 'axios';

const PostHandler = async (setLoading,url,body) => {
  setLoading(true);
  console.log(body);
  const response = await axios.post(`http://localhost:5000/api/${url}`,body)
  setLoading(false);
  if(response.status === 200){
    console.log(response.data);
    if(response.data.error){
      return null;
    }
    return response.data;
  }
  else{
    console.log("error occured");
  }
  
}
export default PostHandler;