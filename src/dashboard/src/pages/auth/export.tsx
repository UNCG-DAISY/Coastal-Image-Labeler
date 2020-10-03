import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/post/getUserDB'
import { determineNavItems } from '../../components/Utils/Auth/determineNavItems'
import { ResumeTaggingDataCatalog, UserProp } from '../../../interfaces'
import { tabLogoURL } from '../../components/Constants'

/*import JSONPretty from 'react-json-pretty'
import {theme, customColors} from '../../components/theme'*/
import { ViewImage } from '../../components/Button/premadeButtons'

interface Props {
  user: UserProp
  resumeTableData: ResumeTaggingDataCatalog[]
  success: boolean
  message?: string
  hasAssignedImages: any[]
}
import { exportUser, exportAllUser } from '../../components/API/get/exportUsers'

export const Home = (props: Props): JSX.Element => {
  const { user } = props
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
            href="/api/tags/export"
            // onClick={async () => {
            //   console.log('Exporting User tags')
            //   const backendReponse: any = await exportUser() //calling backend to get theuser tags
            //   console.log("backendReponse",backendReponse)
            //   // const url = window.URL.createObjectURL(backendReponse)
            //   // const a = document.createElement('a')
            //   // a.href = url
            //   // a.download = 'user.zip'
            //   // console.log("url",url)
            //   //a.click()
            //   //window.URL.revokeObjectURL(url)
            // }}
          >
            Export Your Labels
          </ViewImage>
          {/*  <CSVLink style={{textDecoration: 'none'}} data={userData.data}
                             ref={input => setcsvLinkButton(input)} filename={userData.filename} target="_blank"/>*/}
          {user.data.roles.includes('admin') && (
            <ViewImage
              variant="contained"
              onClick={async () => {
                console.log('Exporting admin tags!!!')
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
        {/*<JSONPretty
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
                />*/}
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

  return {
    props: {
      success: true,
      user,
    },
  }
}

export default Home
