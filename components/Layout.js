import { useStoreState, useStoreActions } from 'easy-peasy';

import Header from './Header';
import Modal from './Modal';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';

const Layout = (props) => {
  const showModal = useStoreState((state) => state.modals.showModal);
  const showLoginModal = useStoreState((state) => state.modals.showLoginModal);
  const showRegistrationModal = useStoreState(
    (state) => state.modals.showRegistrationModal
  );

  const setHideModal = useStoreActions(
    (actions) => actions.modals.setHideModal
  );
  const setShowLoginModal = useStoreActions(
    (actions) => actions.modals.setShowLoginModal
  );
  const setShowRegistrationModal = useStoreActions(
    (actions) => actions.modals.setShowRegistrationModal
  );

  return (
    <div>
      <Header></Header>
      <main>{props.content}</main>
      {showModal && (
        <Modal close={() => setHideModal()}>
          {showLoginModal && (
            <LoginModal
              showSignup={() => {
                setShowRegistrationModal();
              }}
            />
          )}
          {showRegistrationModal && (
            <RegistrationModal
              showLogin={() => {
                setShowLoginModal();
              }}
            />
          )}
        </Modal>
      )}
      <style jsx global>{`
        body {
          margin: 0;
          font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: #333;
        }
      `}</style>
      <style jsx global>
        {`
          main {
            position: relative;
            max-with: 56em;
            background-color: white;
            padding: 2em;
            margin: 0 auto;
            box-sizing: border-box;
          }
          button {
            background-color: rgb(255, 90, 95);
            color: white;
            font-size: 13px;
            width: 100%;
            border: none;
            height: 40px;
            border-radius: 4px;
            cursor: pointer;
          }

          input[type='text'],
          input[type='email'],
          input[type='password'] {
            display: block;
            padding: 20px;
            font-size: 20px !important;
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
