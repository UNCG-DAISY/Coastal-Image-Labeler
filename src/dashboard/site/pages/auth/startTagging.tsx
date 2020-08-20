import React from 'react'
import Head from 'next/head'

import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/post/getUserDB'
import { getStartTaggingTableData } from '../../components/API/post/startTaggingData'
import { determineNavItems } from '../../components/Utils/Auth/determineNavItems'
import { SelectArchive } from '../../components/Tables/SelectArchive'
import { CatalogSelectionData } from '../../../interfaces'
import { checkUserRole } from '../../components/Utils/Auth/checkRole'
import { generateUnAuthObj } from '../../components/Utils/Auth/unAuthError'
import ErrorCard from '../../components/ErrorCards'

interface Props {
  user: any
  selectionData: CatalogSelectionData[]
  success: boolean
  message: string
}

const StartTagging = (props: Props): JSX.Element => {
  const { user, selectionData, success, message } = props
  return (
    <div className="container">
      <Head>
        <title>Start Tagging</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        user={props.user}
        navItems={{ center: [], right: [] }}
        drawer={{ list: determineNavItems(user) }}
        title={`Welcome ${user.displayName}`}
      >
        {!success ? (
          <ErrorCard message={message} title="Error" />
        ) : (
          <React.Fragment>
            <SelectArchive data={selectionData} />
          </React.Fragment>
        )}
      </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  //Add user data from db
  const user: any = getSession(context.req)
  user.data = await getUserDB({
    cookie: context?.req?.headers?.cookie,
    res: context.res,
  })

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

  //Get the data for the selection table
  const selectionData = await getStartTaggingTableData({
    cookie: context?.req?.headers?.cookie,
    res: context.res,
  })

  return {
    props: {
      user,
      success: true,
      message: '',
      selectionData: selectionData.data.advancedResults.data ?? {},
    },
  }
}

export default StartTagging
