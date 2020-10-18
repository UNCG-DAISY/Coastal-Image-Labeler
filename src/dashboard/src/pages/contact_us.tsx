import React from 'react'
import Head from 'next/head'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { GetServerSideProps } from 'next'
import Layout from '@/components/Layout'
import {
  TwitterLink,
  EmailLink,
  EmailLinkShah,
  LinkedinShah,
  DocsLink,
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
        Shah Nafis Rafique
      </Typography>
      <Typography variant="body1" component="h1" gutterBottom>
        <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
          Shah Nafis Rafique is the main developer. You can contact him via
          email {<EmailLinkShah />} or via his {<LinkedinShah />} page.
        </Paper>
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        Evan Goldstein, Ph.D.
      </Typography>
      <Typography variant="body1" component="h1" gutterBottom>
        <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
          Evan Goldstein is a Research Scientist in the Dept. of Geography, Environment, and 
          Sustainability at UNCG. You can contact him via email {<EmailLinkEvan />} or via his {<TwitterLinkEvan />} page.
        </Paper>
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        Somya Mohanty, Ph.D.
      </Typography>
      <Typography variant="body1" component="h1" gutterBottom>
        <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
          Somya Mohanty is an Assistant Profesor in the Dept. of Computer Science at UNCG.
        </Paper>
      </Typography>

      <Typography variant="h5" component="h1" gutterBottom>
        Documentation
      </Typography>
      <Typography variant="body1" component="h1" gutterBottom>
        <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
          Project documentation can be found at the <DocsLink /> site.
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
