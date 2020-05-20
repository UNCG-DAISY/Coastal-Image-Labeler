/*
  Both _app.js and _document.js are on each page. This page gets the user and
  makes it so that its accessable in the whole program. I think it would be best
  to use useMemo for the user.
*/

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
import {getAllowedPages} from '../components/utils/getAllowedPages'
import endpoints from '../components/endpoints'


export default class MyApp extends App {

  static async getInitialProps(context) {
    const { Component, ctx } =context
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    //If there is a passport session
    if (ctx.req && ctx.req.session.passport) {

      //Then get the passport user
      pageProps.user = ctx.req.session.passport.user
      
      //If there is indeed a user,get role and check if in mongo
      if(pageProps?.user?.id) {   
       
        //First using the passportId, see if this passport user is in mongoDb already
        let getMongoUserById = {};
        try {
          getMongoUserById = await axios.post(
            apiCall(
              endpoints.findUser//`/api/v1/users/findUser`
            ),
            {
              userId: ctx?.req?.session?.passport?.user?.id
            }
          )
        } catch(error) {
          console.log(error)
        }

        //If the returned user is undefined, that means this is a user who has
        //recently register and not been entered into the db So enter them into
        //the DB
        if(!getMongoUserById?.data?.data?.user) {
          console.log('New registered user not in mongoDB, adding now...'.bgRed)

          //Get the newly created user
          try{
            getMongoUserById = await axios.post(apiCall(endpoints.createUser),{ //'/api/v1/users/createUser'
              passportUser:pageProps?.user
            })
          } catch(error) {
            console.log(error)
          }
        
  
        }

        //Add this to the user prop so other may use.
        pageProps.user.mongoUser = getMongoUserById.data.data.user

        //Add on the allowed pages for this user. 
        pageProps.user.allowedPages = await getAllowedPages(pageProps.user,ctx)
        //Show a message
        //console.log(getMongoUserById.data.data.message.green,'--------')
      }
     
    }

    return { pageProps };

  }

  constructor(props) {
    super(props);
    
    //Add user to state
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
          <title>CIL Dashboard</title>
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
