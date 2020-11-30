import SearchBox from '../../atoms/searchBox';
import { Jumbotron, Button } from 'reactstrap';
import './style.css';

const SearchForm = ({title, searchBox, onClick}) => {
  return (
    <div className="search-form">
      <Jumbotron>
         <h4 className="display-4">{title}</h4>
         <SearchBox 
           label={searchBox.label}
           type={searchBox.type}
           placeholder={searchBox.placeholder}
           value={searchBox.value}
           setValue={searchBox.setValue}
         />
         <Button color="primary" onClick={onClick}>Search</Button>

      </Jumbotron>
    </div>
  );
}
 
export default SearchForm;