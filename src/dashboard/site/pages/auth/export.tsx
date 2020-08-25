import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/post/getUserDB'
import { determineNavItems } from '../../components/Utils/Auth/determineNavItems'
import { ResumeTaggingDataCatalog, UserProp } from '../../../interfaces'

interface Props {
  user: UserProp
  resumeTableData: ResumeTaggingDataCatalog[]
  success: boolean
  message?: string
  hasAssignedImages: any[]
}

export const Home = (props: Props): JSX.Element => {
  const { user } = props

  return (
    <div className="container">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        user={props.user}
        title={`Welcome ${user?.displayName}`}
        navItems={determineNavItems(user)}
        drawer
      >
        exportTags
      </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  // const t1 = performance.now()
  //Add user data from db
  const user: any = getSession(context.req)
  user.data =
    (await getUserDB({
      cookie: context?.req?.headers?.cookie,
      res: context.res,
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

  // const t2 = performance.now()
  // console.log(`Time ${t2 - t1} ms`)
  return {
    props: {
      success: true,
      user,
      //resumeTableData: resumeData.data,
      //hasAssignedImages: hasAssignedImages.data,
    },
  }
}

export default Home
