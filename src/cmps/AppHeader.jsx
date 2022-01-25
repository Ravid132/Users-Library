import { UserMsg } from './UserMsg';

export const AppHeader = () => {
  return (
    <section className='app-header'>
      <div className='app-title'>
        <h1>The Users Library</h1>
      </div>
      <UserMsg />
    </section>
  );
};
