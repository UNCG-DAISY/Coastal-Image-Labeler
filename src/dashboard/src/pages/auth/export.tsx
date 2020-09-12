import React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '@/components/Utils/Auth/getSession'
import { getUserDB } from '@/components/API/post/getUserDB'
import { determineNavItems } from '@/components/Utils/Auth/determineNavItems'
import { ResumeTaggingDataCatalog, UserProp } from '@/interfaces/index'
import { tabLogoURL } from '@/components/Constants'

//import JSONPretty from 'react-json-pretty'
//import {theme, customColors} from '@/components/theme'
import { ViewImage } from '@/components/Button/premadeButtons'

interface Props {
  user: UserProp
  resumeTableData: ResumeTaggingDataCatalog[]
  success: boolean
  message?: string
  hasAssignedImages: any[]
}

import { CSVLink } from 'react-csv'
import {
  exportUserTag,
  exportAllUserTags,
} from '@/components/API/get/exportUsers'

export const Home = (props: Props): JSX.Element => {
  const { user } = props
  const [userData, setUserData] = React.useState({ data: [], filename: '' })
  const [csvLinkButton, setcsvLinkButton] = React.useState(null)
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
              const data = await exportUserTag()
              console.log('backend dada view :', data.data)
              if (data && data.success && data.data) {
                setUserData({
                  data: prepareCsvData(data.data),
                  filename: 'user.csv',
                })

                if (csvLinkButton) {
                  csvLinkButton.link.click()
                }
              }
              // console.log("datadata", data);
            }}
          >
            Export user tags
          </ViewImage>
          <CSVLink
            style={{ textDecoration: 'none' }}
            data={userData.data}
            ref={(input) => setcsvLinkButton(input)}
            filename={userData.filename}
            target="_blank"
          />
          {user.data.roles.includes('admin') && (
            <ViewImage
              variant="contained"
              onClick={async () => {
                console.log('I AM CLICK')
                const data = await exportAllUserTags()
                if (data && data.success && data.data) {
                  setUserData({
                    data: prepareCsvData(data.data),
                    filename: 'admin.csv',
                  })

                  if (csvLinkButton) {
                    csvLinkButton.link.click()
                  }
                }

                console.log('datadata', data)
              }}
            >
              Export all tags
            </ViewImage>
          )}
        </div>
        {/* <JSONPretty
                    id="json-pretty"
                    data={user}
                    style={{
                        fontSize: '2.0em',
                        backgroundColor: `${theme.palette.background.default}`,
                        paddingLeft: '0.1em',
                    }}
                    theme={{
                        main: `color:#ffffff;background:${theme.palette.background.default}:#;overflow:auto;`,
                        error: 'color:#ffffff;background:#272822;overflow:auto;',
                        key: `color:${theme.palette.primary.light};`,
                        string: `color:${theme.palette.secondary.light};`,
                        value: `color:${customColors.orange};`,
                        boolean: `color:${customColors.purple};`,
                    }}
                /> */}
      </Layout>
    </div>
  )
}

const prepareCsvData = function (data: any): any[] {
  const headerDetail = [
    'userId',
    'imageId',
    'image.name',
    'catalogId',
    'catalog.name',
    'archiveId',
    'archive.name',
    'date',
    'tags.terrianType',
    'devType',
    'washoverType',
    'dmgType',
    'tag.impactType',
  ]
  const csvData = []
  csvData.push(headerDetail)
  for (let index = 0; index < data.length; index++) {
    const singleData = []
    singleData.push(data[index]['userId'] || '')
    singleData.push(data[index]['imageId'] || '')
    singleData.push(data[index]?.image?.name || '')
    singleData.push(data[index]['catalogId'] || '')
    singleData.push(data[index]?.catalog?.name || '')
    singleData.push(data[index]['archiveId'] || '')
    singleData.push(data[index]?.archive?.name || '')
    singleData.push(data[index]['date'] || '')
    let terrianType = ''
    let impactType = ''
    const tags: any = data[index]['tags']
    if (tags && tags.terrianType) {
      for (let count = 0; count < tags.terrianType.length; count++) {
        terrianType = terrianType + tags.terrianType[count] + ','
      }
    }
    if (tags && tags.impactType) {
      for (let count = 0; count < tags.impactType.length; count++) {
        impactType = impactType + tags.impactType[count] + ','
      }
    }

    singleData.push(terrianType)
    singleData.push(tags?.devType || '')
    singleData.push(tags?.washoverType || '')
    singleData.push(tags?.dmgType || '')
    singleData.push(impactType)
    csvData.push(singleData)
  }
  return csvData
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

  return {
    props: {
      success: true,
      user,
    },
  }
}

export default Home
