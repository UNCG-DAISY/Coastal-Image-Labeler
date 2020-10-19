import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '@/components/Utils/Auth/getSession'
import { getUserDB } from '@/components/API/post/getUserDB'
import ErrorCard from '@/components/ErrorCards'
import { determineNavItems } from '@/components/Utils/Auth/determineNavItems'
import { HomeText, NoAssigned, TextBox } from '@/components/StaticText/home'
import { ResumeTagging } from '@/components/Tables/ResumeTagging'
import { ResumeTaggingDataCatalog, UserProp } from '@/interfaces/index'
import { getResumeTableData } from '@/components/API/post/getResumeTableData'
import { getHasAssignedImages } from '@/components/API/post/userHasAssignedImages'
import { tabLogoURL } from '@/components/Constants'
import { getGlobalNotifications } from '@/components/API/get/getGlobalNotifications'
import { NotificationDocument } from '@/interfaces/models'
import { Typography, Divider } from '@material-ui/core'

interface Props {
  user: UserProp
  resumeTableData: ResumeTaggingDataCatalog[]
  success: boolean
  message?: string
  hasAssignedImages: any[]
  notifications: NotificationDocument[]
}

export const Home = (props: Props): JSX.Element => {
  const { user, success, message, hasAssignedImages, notifications } = props
  const [resumeData, setResumeData] = useState<ResumeTaggingDataCatalog[]>(null)

  console.log(notifications)

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
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              style={{ padding: 10 }}
            >
              Welcome
            </Typography>

            <HomeText displayName={user?.displayName} />
            <Divider />

            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              style={{ padding: 10 }}
            >
              Messages
            </Typography>

            {notifications.map((notification, index) => {
              return (
                <TextBox date={notification.dateAdded} key={index}>
                  {notification.message}
                </TextBox>
              )
            })}
            {hasAssignedImages.length > 0 && resumeData?.length > 0 ? (
              <React.Fragment>
                <Divider />
                <Typography
                  variant="h5"
                  component="h1"
                  gutterBottom
                  style={{ padding: 10 }}
                >
                  Images to Resume Tagging
                </Typography>
                <ResumeTagging data={resumeData} />
              </React.Fragment>
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

  const notifications = await getGlobalNotifications()

  return {
    props: {
      success: true,
      user,
      hasAssignedImages: hasAssignedImages.data,
      notifications: notifications.data.notifications,
    },
  }
}

export default Home
