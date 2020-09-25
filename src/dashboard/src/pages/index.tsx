import React from 'react'
import Head from 'next/head'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Layout from '@/components/Layout'
import { RepoLink, EmailLink, DocsLink } from '@/components/ColoredLink'
import { navigationItems, tabLogoURL } from '@/components/Constants'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Coastal Image Labeler</title>
      <link rel="icon" href={tabLogoURL} />
    </Head>
    <Layout navItems={navigationItems.landingPage} drawer>
      <Box my={4}>
        <Typography variant="body1" component="h1" gutterBottom>
          <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
            Welcome to the Coastal Image Labeler! Please log in to begin labeling 
            images. Check out the GitHub <RepoLink /> and/or the <DocsLink /> to learn
            more about the project. If you have questions, please contact Evan Goldstein: {<EmailLink />}
          </Paper>
        </Typography>
      </Box>
    </Layout>
  </div>
)

export default Home
