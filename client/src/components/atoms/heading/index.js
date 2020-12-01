const Heading = ({text}) => {
  return (
    <div style={{textAlign:"center"}}>
     <h1 style={{display:"inline",fontSize:"2rem", textAlign:"center", margin:"auto", borderBottom:"1px solid black", }}>{text}</h1>
    </div>
  );
}
 
export default Heading;