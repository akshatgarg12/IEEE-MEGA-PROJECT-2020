import {Navbar,NavbarBrand} from 'reactstrap'


const CustomNavbar = () => {
  return ( 
    <div>
      <Navbar color="dark" dark>
        <NavbarBrand href="/" className="mr-auto">Amazon Product Review</NavbarBrand>
      </Navbar>
    </div>
  );
}
 
export default CustomNavbar;