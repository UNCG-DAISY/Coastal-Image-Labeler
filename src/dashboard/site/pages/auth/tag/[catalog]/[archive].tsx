import React from 'react'
import Head from 'next/head'

import Layout from '../../../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../../../components/Utils/Auth/getSession'
import { getUserDB } from '../../../../components/API/post/getUserDB'
//import { catalogMembership } from '../../../../components/API/post/catalogMembership'
import ErrorCard from '../../../../components/ErrorCards'
import { determineNavItems } from '../../../../components/Utils/Auth/determineNavItems'
import { ImageTag } from '../../../../components/Cards/ImageTag'

import { checkUserRole } from '../../../../components/Utils/Auth/checkRole'
import { generateUnAuthObj } from '../../../../components/Utils/Auth/unAuthError'
//import { isValidArchive } from '../../../../components/API/post/isValidArchive'
import { getUserAssignedImage } from '../../../../components/API/post/getUserAssignedImage'
import { catalogQuestionSet } from '../../../../components/API/post/getCatalogQuestionSet'

//import { performance } from 'perf_hooks'

import { ImageDocument } from '../../../../../interfaces/models'

export default function TagImage(props) {
  const { user, success, message, questionSetDocument } = props
  const imageDocument: ImageDocument = props.imageDocument

  return (
    <React.Fragment>
      <Head>
        <title>Tag Image: {imageDocument?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        user={props.user}
        navItems={{ center: [], right: [] }}
        drawer={{ list: determineNavItems(user) }}
        title={`Welcome ${user?.displayName}`}
      >
        {!success ? (
          <ErrorCard message={message} title="Error" />
        ) : (
          <React.Fragment>
            <ImageTag
              user={user}
              imageDocument={imageDocument}
              questionSetDocument={questionSetDocument}
            />
          </React.Fragment>
        )}
      </Layout>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  //const t1 = performance.now()
  //Add user data from db
  const user: any = getSession(context.req)
  user.data = await getUserDB({
    cookie: context?.req?.headers?.cookie,
    res: context.res,
  })

  /*
    STEPS 
    1. Check user role
    2. Check if catalog is part of user
    3. Check for errors
    4. Check to see if archive is valid,and part of catalog
    5. Check for errors
    6. Get assigned Image
      a. If one is assigned, return
      b. If not
        1. Get catalog serve type
        2. Select image
        3. Assign
        4. Return
    7. Return
  */

  //check if user is a tagger
  const isTagger = checkUserRole({ roles: user.data?.roles, role: 'tagger' })
  if (!isTagger.success) {
    return {
      props: {
        user,
        ...generateUnAuthObj({
          message: `User ${user.data.userName} is not allowed to access this page`,
        }),
      },
    }
  }

  //get dynamic route variables
  const { catalog = '', archive = '' } = context.query

  //Get assigned Image and catalog question

  const [resGetUserAssignedImage, resGetCatalogQuestionSet] = await Promise.all(
    [
      getUserAssignedImage({
        cookie: context?.req?.headers?.cookie,
        res: context.res,
        archiveId: archive as string,
      }),
      catalogQuestionSet({
        cookie: context?.req?.headers?.cookie,
        res: context.res,
        catalogId: catalog as string,
      }),
    ]
  )

  if (!resGetUserAssignedImage.success) {
    return {
      props: {
        user,
        ...generateUnAuthObj({
          message: resGetUserAssignedImage.message,
        }),
      },
    }
  }
  if (!resGetCatalogQuestionSet.success) {
    return {
      props: {
        user,
        ...generateUnAuthObj({
          message: resGetCatalogQuestionSet.message,
        }),
      },
    }
  }

  // const t2 = performance.now()
  // console.log(`Time ${t2 - t1} ms`)
  return {
    props: {
      success: true,
      user,
      imageDocument: resGetUserAssignedImage.data.assignedImage ?? {},
      questionSetDocument: resGetCatalogQuestionSet.data.questionSet ?? {},
    },
  }
}
