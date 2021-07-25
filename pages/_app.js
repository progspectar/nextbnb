import App from 'next/app';
import { StoreProvider } from 'easy-peasy';
import store from '../store';

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  let user = null;

  if (
    appContext.ctx.req &&
    appContext.ctx.req.session &&
    appContext.ctx.req.session.passport &&
    appContext.ctx.req.session.passport.user
  ) {
    user = appContext.ctx.req.session.passport.user;
  }
  return { ...appProps, user: user };
};

function MyApp({ Component, pageProps, user }) {
  if (user) {
    store.getActions().user.setUser(user);
  }

  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
