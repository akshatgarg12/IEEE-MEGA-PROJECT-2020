import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const SearchBox = ({label,type,placeholder,value,setValue}) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleUrl">{label}</Label>
        <Input
          type={type}
          value={value}
          onChange={((e) => setValue(e.target.value))}
          placeholder={placeholder}
        />
      </FormGroup>
    </Form>
  );
  
}
 
export default SearchBox;