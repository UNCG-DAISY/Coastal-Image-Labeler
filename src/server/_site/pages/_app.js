import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import { throws } from 'assert';
import axios from 'axios'
import { 
  myIp,
  port,
  protocal,
  apiCall
} from '../components/constants'

export default class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.session.passport.user

      //Get the user role if there is any
      const userRoles = await axios.post(apiCall('/api/v1/users/getRoles'),{
        id:pageProps?.user?.id
      })

      const mongoUser = await axios.post(apiCall('/api/v1/users/isUser'),{
        id:ctx?.req?.session?.passport?.user?.id,
        username:ctx?.req?.session?.passport?.user?.displayName
      })
      
      pageProps.user.roles = userRoles.data.data.roles
      pageProps.user.mongoUser = mongoUser.data.data.user
      console.log(mongoUser?.data?.data?.message?.america)
    }

   

    //userRoles
    return { pageProps };

  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    const props = {
      ...pageProps,
      user: this.state.user,
    };

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} user = {this.state.user} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
