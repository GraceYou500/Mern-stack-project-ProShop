import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, Route } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} className='row g-3'>
      <div className='col-auto'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          className='mr-sm-3 ml-sm-5'
        ></Form.Control>
      </div>
      <div className='col-auto'>
        <Button type='submit' variant='outline-success' className='p-2 ml-sm-4'>
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchBox;
