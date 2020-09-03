import React from 'react'
import Head from 'next/head'

import Layout from '@/site/components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '@/site/components/Utils/Auth/getSession'
import { getUserDB } from '@/site/components/API/post/getUserDB'
//import { catalogMembership } from '@/site/components/API/post/catalogMembership'
import ErrorCard from '@/site/components/ErrorCards'
import { determineNavItems } from '@/site/components/Utils/Auth/determineNavItems'
import { ImageTag } from '@/site/components/Cards/ImageTag'

import { checkUserRole } from '@/site/components/Utils/Auth/checkRole'
import { generateUnAuthObj } from '@/site/components/Utils/Auth/unAuthError'
//import { isValidArchive } from '@/site/components/API/post/isValidArchive'
import { getUserAssignedImage } from '@/site/components/API/post/getUserAssignedImage'
import { catalogQuestionSet } from '@/site/components/API/post/getCatalogQuestionSet'
import { tabLogoURL } from '@/site/components/Constants'
import { getCatalog } from '@/site/components/API/post/getCatalog'
import { getArchive } from '@/site/components/API/post/getArchive'

import { ImageDocument } from '@/interfaces/models'
import { log } from '@/site/components/Utils/logger'

export default function TagImage(props) {
  const { user, success, message, questionSetDocument } = props
  const imageDocument: ImageDocument = props.imageDocument

  return (
    <React.Fragment>
      <Head>
        <title>Coastal Image Labeler</title>
        <link rel="icon" href={tabLogoURL} />
      </Head>

      <Layout
        user={props.user}
        navItems={determineNavItems(user)}
        drawer
        title={`You're labeling now! 👍`}
      >
        {!success ? (
          <ErrorCard message={message} title="Error" />
        ) : (
          <React.Fragment>
            <ImageTag
              user={user}
              imageDocument={imageDocument}
              questionSetDocument={questionSetDocument}
              catalog={props.catalog}
              archive={props.archive}
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

  const [
    resGetUserAssignedImage,
    resGetCatalogQuestionSet,
    resGetCatalog,
    resGetArchive,
  ] = await Promise.all([
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
    getCatalog({
      cookie: context?.req?.headers?.cookie,
      res: context.res,
      catalogId: catalog as string,
    }),
    getArchive({
      cookie: context?.req?.headers?.cookie,
      res: context.res,
      archiveId: archive as string,
    }),
  ])

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
  if (!resGetCatalog.success) {
    return {
      props: {
        user,
        ...generateUnAuthObj({
          message: resGetCatalog.message,
        }),
      },
    }
  }
  if (!resGetArchive.success) {
    return {
      props: {
        user,
        ...generateUnAuthObj({
          message: resGetArchive.message,
        }),
      },
    }
  }
  log({
    message: 'Data for tagging image',
    type: 'info',
  })
  log({ message: '--- image ---' })
  log({ message: resGetUserAssignedImage.data.assignedImage })

  return {
    props: {
      success: true,
      user,
      imageDocument: resGetUserAssignedImage.data.assignedImage ?? {},
      questionSetDocument: resGetCatalogQuestionSet.data.questionSet ?? {},
      catalog: resGetCatalog.data?.advancedResults.data[0],
      archive: resGetArchive.data?.advancedResults.data[0],
    },
  }
}
