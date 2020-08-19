import React from 'react'
import Head from 'next/head'

import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Layout from '../components/Layout'
import { RepoLink, EmailLink } from '../components/ColoredLink'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Welcome to Coastal Image Labeler</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <Box my={4}>
        <Typography variant="body1" component="h1" gutterBottom>
          <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
            Welcome to Coastal Image Labeler, please login. You can read about
            the project <RepoLink />. If you have questions, please contact Evan
            Goldstein: {<EmailLink />}
          </Paper>
        </Typography>
      </Box>
    </Layout>
  </div>
)

export default Home
