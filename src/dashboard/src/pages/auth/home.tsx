import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '@/components/Utils/Auth/getSession'
import { getUserDB } from '@/components/API/post/getUserDB'
import ErrorCard from '@/components/ErrorCards'
import { determineNavItems } from '@/components/Utils/Auth/determineNavItems'
import { HomeText, NoAssigned } from '@/components/StaticText/home'
import { ResumeTagging } from '@/components/Tables/ResumeTagging'
import { ResumeTaggingDataCatalog, UserProp } from '../../../interfaces'
import { getResumeTableData } from '@/components/API/post/getResumeTableData'
import { getHasAssignedImages } from '@/components/API/post/userHasAssignedImages'
import { tabLogoURL } from '@/components/Constants'

interface Props {
  user: UserProp
  resumeTableData: ResumeTaggingDataCatalog[]
  success: boolean
  message?: string
  hasAssignedImages: any[]
}

export const Home = (props: Props): JSX.Element => {
  const { user, success, message, hasAssignedImages } = props
  const [resumeData, setResumeData] = useState<ResumeTaggingDataCatalog[]>(null)

  async function getResumeObject() {
    //Get resume table data
    if (hasAssignedImages.length > 0) {
      const getTableResponse = await getResumeTableData()
      setResumeData(getTableResponse?.data?.taggedCount)
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
        <link rel="icon" href={tabLogoURL} />
      </Head>

      <Layout
        user={props.user}
        title={`Welcome ${user?.displayName}`}
        navItems={determineNavItems(user)}
        drawer
      >
        {!success ? (
          <ErrorCard message={message} title="Error" />
        ) : (
          <React.Fragment>
            <HomeText displayName={user?.displayName} />
            {hasAssignedImages.length > 0 ? (
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

  return {
    props: {
      success: true,
      user,
      hasAssignedImages: hasAssignedImages.data,
    },
  }
}

export default Home
