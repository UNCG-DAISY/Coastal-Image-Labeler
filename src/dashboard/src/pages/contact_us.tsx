import React from 'react'
import Head from 'next/head'

//import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { GetServerSideProps } from 'next'
import Layout from '@/components/Layout'
import {
  TwitterLink,
  EmailLink,
  EmailLinkShah,
  LinkedinShah,
} from '@/components/ColoredLink'
import { tabLogoURL } from '@/components/Constants'
import { determineNavItems } from '@/components/Utils/Auth/determineNavItems'
import { getUserDB } from '@/components/API/post/getUserDB'
import getSession from '@/components/Utils/Auth/getSession'

export const Home = (props): JSX.Element => (
  <div className="container">
    <Head>
      <title>Coastal Image Labeler</title>
      <link rel="icon" href={tabLogoURL} />
    </Head>
    <Layout navItems={determineNavItems(props?.user)} drawer>
      <Typography variant="h5" component="h1" gutterBottom>
        Dr.Evan Goldstein
      </Typography>
      <Typography variant="body1" component="h1" gutterBottom>
        <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
          Dr.Evan Goldstein is the Project Supervisor. You can contact him via
          Email {<EmailLink />} or via his {<TwitterLink />} page.
        </Paper>
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        Shah Nafis Rafique
      </Typography>
      <Typography variant="body1" component="h1" gutterBottom>
        <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
          Shah Nafis Rafique is the main developer. You can contact him via
          Email {<EmailLinkShah />} or via his {<LinkedinShah />} page.
        </Paper>
      </Typography>
    </Layout>
  </div>
)

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  //Add user data from db
  const user: any = getSession(context.req)
  user.data =
    (await getUserDB({
      cookie: context?.req?.headers?.cookie,
      res: context.res,
      redirect: false,
    })) ?? {}
  //check if valid
  if (Object.keys(user.data).length === 0) {
    return {
      props: {
        success: false,
        message: 'Error getting User data',
      },
    }
  }

  return {
    props: {
      success: true,
      user,
    },
  }
}

export default Home
