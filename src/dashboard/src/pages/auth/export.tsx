import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '@/components/API/post/getUserDB'
import { determineNavItems } from '@/components/Utils/Auth/determineNavItems'
import { ResumeTaggingDataCatalog, UserProp } from '../../../interfaces'
import { tabLogoURL } from '@/components/Constants'
import { ShowExportData } from '@/components/Tables/ShowExportData'
import { ViewImage } from '@/components/Button/premadeButtons'

interface Props {
  user: UserProp
  catalogs: any
  resumeTableData: ResumeTaggingDataCatalog[]
  success: boolean
  message?: string
  hasAssignedImages: any[]
}

import { exportUser, exportAllUser } from '@/components/API/get/exportUsers'
import { getStartTaggingTableData } from '@/components/API/post/startTaggingData'
import { getCatalogDetails } from '@/components/API/post/getCatalog'

export const Home = (props: Props): JSX.Element => {
  const { user, catalogs } = props
  //catalogs.push("all");
  const exportUserData: any = []
  for (let index = 0; index < catalogs.length; index++) {
    exportUserData.push(catalogs[index])
  }
  exportUserData.push('all')
  const [selectedCatalogsData, selectedCatalogs] = useState(exportUserData)
  const [random, setRandom] = useState(Math.random())
  console.log('random value :', random)
  const selectedCheckBox = (id) => {
    let catalogsData = selectedCatalogsData || []
    if (id == 'all') {
      if (catalogsData.indexOf(id) >= 0) {
        catalogsData = []
      } else {
        catalogsData = []
        for (let index = 0; index < catalogs.length; index++) {
          catalogsData.push(catalogs[index])
        }
        catalogsData.push('all')
      }
    } else {
      if (catalogsData.indexOf(id) >= 0) {
        catalogsData.splice(catalogsData.indexOf(id), 1)
        catalogsData.splice(catalogsData.indexOf('all'), 1)
      } else {
        catalogsData.push(id)
      }
    }

    selectedCatalogs(catalogsData)
    setRandom(Math.random)
  }
  const setDownloadCsvButton = (role) => {
    if (role.includes('admin')) {
      return (
        <div>
          <ViewImage
            style={{ float: 'right' }}
            variant="contained"
            onClick={async () => {
              if (selectedCatalogsData.length) {
                const blob: any = await exportAllUser({
                  filter: true,
                  catalogNames: selectedCatalogsData,
                })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'admin.zip'
                a.click()
                window.URL.revokeObjectURL(url)
              }
            }}
          >
            download Csv
          </ViewImage>
        </div>
      )
    } else {
      return (
        <div>
          <ViewImage
            style={{ float: 'right' }}
            variant="contained"
            onClick={async () => {
              if (selectedCatalogsData.length) {
                const blob: any = await exportUser({
                  filter: true,
                  catalogNames: selectedCatalogsData,
                })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'user.zip'
                a.click()
                window.URL.revokeObjectURL(url)
              }
            }}
          >
            download Csv
          </ViewImage>
        </div>
      )
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Export Tags</title>
        <link rel="icon" href={tabLogoURL} />
      </Head>

      <Layout
        user={props.user}
        title={`Welcome ${user?.displayName}`}
        navItems={determineNavItems(user)}
        drawer
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ViewImage
            variant="contained"
            onClick={async () => {
              const blob: any = await exportUser()
              const url = window.URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'user.zip'
              a.click()
              window.URL.revokeObjectURL(url)
            }}
          >
            {' '}
            Export Your Labels
          </ViewImage>
          {user.data.roles.includes('admin') && (
            <ViewImage
              variant="contained"
              onClick={async () => {
                const blob: any = await exportAllUser()
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'admin.zip'
                a.click()
                window.URL.revokeObjectURL(url)
              }}
            >
              Export All Labels
            </ViewImage>
          )}
        </div>
        <React.Fragment>
          <ShowExportData
            data={catalogs}
            selectedCheckBox={selectedCheckBox}
            selectedCatalogsData={selectedCatalogsData}
          />
        </React.Fragment>
        {setDownloadCsvButton(user.data.roles)}
      </Layout>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  //Add user data from db
  const user: any = getSession(context.req)
  //
  const catalogs: any[] = []
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
  if (user.data.roles.includes('admin')) {
    const selectionData = await getCatalogDetails(context?.req?.headers?.cookie)
    console.log('selectionData', selectionData)
    const UserCatalogs = selectionData?.data?.catalog || []
    for (let index = 0; index < UserCatalogs.length; index++) {
      catalogs.push(UserCatalogs[index].name)
    }
  } else {
    const selectionData = await getStartTaggingTableData({
      cookie: context?.req?.headers?.cookie,
      res: context.res,
    })
    const UserCatalogs = selectionData.data.advancedResults.data ?? []
    for (let index = 0; index < UserCatalogs.length; index++) {
      catalogs.push(UserCatalogs[index].name)
    }
  }

  return {
    props: {
      success: true,
      user,
      catalogs: catalogs,
    },
  }
}

export default Home
