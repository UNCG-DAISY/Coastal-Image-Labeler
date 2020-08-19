import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/post/getUserDB'
import ErrorCard from '../../components/ErrorCards'
import { determineNavItems } from '../../components/Utils/Auth/determineNavItems'
import { HomeText, NoAssigned } from '../../components/StaticText/home'
import { ResumeTagging } from '../../components/Tables/ResumeTagging'
import { ResumeTaggingDataCatalog, UserProp } from '../../../interfaces'
import { getResumeTableData } from '../../components/API/post/getResumeTableData'
import { getHasAssignedImages } from '../../components/API/post/userHasAssignedImages'
// import { performance } from 'perf_hooks'

interface Props {
  user: UserProp
  resumeTableData: ResumeTaggingDataCatalog[]
  success: boolean
  message?: string
  hasAssignedImages: boolean
}

export const Home = (props: Props): JSX.Element => {
  const { user, success, message, hasAssignedImages } = props
  const [resumeData, setResumeData] = useState<ResumeTaggingDataCatalog[]>(null)

  async function getResumeObject() {
    //Get resume table data
    if (hasAssignedImages) {
      const getTableResponse = await getResumeTableData()
      setResumeData(getTableResponse.data.taggedCount)
      //console.log(getTableResponse.data.taggedCount)
    } else {
      setResumeData([])
    }
  }

  useEffect(() => {
    if (resumeData === null) {
      getResumeObject()
    }
  })

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
      >
        {!success ? (
          <ErrorCard message={message} title="Error" />
        ) : (
          <React.Fragment>
            <HomeText displayName={user?.displayName} />
            {hasAssignedImages ? (
              <ResumeTagging data={resumeData} />
            ) : (
              <React.Fragment>
                <NoAssigned />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
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

  const hasAssignedImages = await getHasAssignedImages({
    cookie: context?.req?.headers?.cookie,
    res: context.res,
  })

  // const t2 = performance.now()
  // console.log(`Time ${t2 - t1} ms`)
  return {
    props: {
      success: true,
      user,
      //resumeTableData: resumeData.data,
      hasAssignedImages: hasAssignedImages.data,
    },
  }
}

export default Home
