import { Component, createRef, useEffect, useState } from 'react';
import { UserModal } from '../cmps/UserModal';
import { useForm } from '../hooks/useForm';
import { showErrorMsg } from '../services/event-bus.service';
import { userService } from '../services/user.service';

export const UserEdit = (props) => {
  const [user, handleChange, setUser] = useForm(null);
  const [show, setShow] = useState(false);

  const onHandleClose = () => setShow(false);
  const onHandleShow = (ev) => {
    ev.preventDefault();
    setShow(true);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const id = props.match.params.id;

    const user = id
      ? await userService.getById(id)
      : userService.getEmptyUser();
    setUser(user);
  };

  const onBack = () => {
    props.history.push('/');
  };

  const onSaveUser = async (ev) => {
    ev.preventDefault();
    onHandleClose();
    if (user.firstName.length < 3) {
      showErrorMsg('The name needs to be more than 3 characters');
      return;
    }
    const foundUser = await userService.findUserByEmail(user.email);
    if (foundUser) {
      showErrorMsg('This email is already taken');
      return;
    }
    if (user.email) await userService.save(user);
    props.history.push('/');
  };

  if (!user) return <div>Lodaing...</div>;
  const {
    title,
    firstName,
    lastName,
    country,
    city,
    streetNum,
    streetName,
    email,
    userImage,
  } = user;
  return (
    <div>
      <form
        className='user-edit flex column align-center'
        onSubmit={onHandleShow}
      >
        <img className='edit-user-img' src={userImage} />
        <div className='input-container'>
          <label htmlFor='title'>Title</label>
          <input
            value={title}
            name='title'
            type='text'
            id='title'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-container'>
          <label htmlFor='firstName'>First Name</label>
          <input
            value={firstName}
            name='firstName'
            type='text'
            id='firstName'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-container'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            value={lastName}
            name='lastName'
            type='text'
            id='lastName'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-container'>
          <label htmlFor='email'>Email</label>
          <input
            value={email}
            name='email'
            type='email'
            id='email'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-container'>
          <label htmlFor='country'>Country</label>
          <input
            value={country}
            name='country'
            type='text'
            id='country'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-container'>
          <label htmlFor='city'>City</label>
          <input
            value={city}
            name='city'
            type='text'
            id='city'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-container'>
          <label htmlFor='streetName'>Street Name</label>
          <input
            value={streetName}
            name='streetName'
            type='text'
            id='streetName'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-container'>
          <label htmlFor='streetNum'>Street Number</label>
          <input
            value={streetNum}
            name='streetNum'
            type='text'
            id='streetNum'
            onChange={handleChange}
            required
          />
        </div>
        <div className='action-btns'>
          <button className='back-btn' onClick={onBack}>
            Go Back
          </button>
          <button className='save-btn' type='submit'>
            Save
          </button>
        </div>
      </form>
      {show && (
        <UserModal
          handleClose={onHandleClose}
          saveUser={onSaveUser}
          show={show}
        />
      )}
    </div>
  );
};
