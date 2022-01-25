import { Link } from 'react-router-dom';

export function UserPreview({ user, removeUser }) {
  function onRemoveUser(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    removeUser(user._id);
  }

  return (
    <div className='user-preview flex column justify-center align-center space-between'>
      <h2>
        {user.title}. {user.firstName} {user.lastName}
      </h2>
      <img className='user-img' src={user.userImage} alt='' />
      <p>{user.email}</p>
      <p>country: {user.country}</p>
      <p>city: {user.city}</p>
      <p>
        street: {user.streetName} ,{user.streetNum}
      </p>
      <section className='actions'>
        <Link to={'/user/edit/' + user._id} className='btn-edit'>
          Edit
        </Link>
        <button onClick={onRemoveUser} className='btn-delete'>
          Delete
        </button>
      </section>
    </div>
  );
}
