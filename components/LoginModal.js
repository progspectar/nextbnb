import { useState } from 'react';
import axios from 'axios';
import { useStoreActions } from 'easy-peasy';

export default (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const setHideModal = useStoreActions(
    (actions) => actions.modals.setHideModal
  );

  return (
    <>
      <h2>Sign up</h2>
      <div>
        <form
          onSubmit={async (event) => {
            try {
              const response = await axios.post('/api/auth/login', {
                email,
                password,
              });
              if (response.data.status === 'error') {
                alert(response.data.message);
                return;
              }
              setUser(email);
              setHideModal();
            } catch (error) {
              alert(error.response.data.message);
              return;
            }
            event.preventDefault();
          }}
        >
          <input
            id='email'
            type='email'
            placeholder='Email address'
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            id='password'
            type='password'
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
          />
          <button>Log in</button>
        </form>
        <p>
          Don't have an account yet?{' '}
          <a href='#' onClick={() => props.showSignup()}>
            Sign up
          </a>
        </p>
      </div>
    </>
  );
};
