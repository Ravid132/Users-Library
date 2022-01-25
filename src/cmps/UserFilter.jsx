import { Component, useState } from 'react';
import { useForm } from '../hooks/useForm';

export const UserFilter = ({ onChangeFilter }) => {
  const [filterBy, handleChange] = useForm(
    {
      email: '',
      name: '',
    },
    onChangeFilter
  );

  const { email, name } = filterBy;
  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Filter:</h3>
      <form className='user-filter flex  justify-center align-center '>
        <label htmlFor='name' className='flex justify-center align-center'>
          Name:
          <input
            value={name}
            type='text'
            id='name'
            name='name'
            onChange={handleChange}
          />
        </label>

        <label htmlFor='email' className='flex justify-center align-center'>
          Email:
          <input
            value={email}
            type='email'
            id='email'
            name='email'
            onChange={handleChange}
          />
        </label>
      </form>
    </>
  );
};
