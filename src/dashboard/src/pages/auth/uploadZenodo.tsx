import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '@/components/API/post/getUserDB'
import { determineNavItems } from '@/components/Utils/Auth/determineNavItems'
import { ResumeTaggingDataCatalog, UserProp } from '../../../interfaces'
import { tabLogoURL } from '@/components/Constants'
import { ShowZenodoData } from '@/components/Tables/ShowZenodoData'
import { ViewImage } from '@/components/Button/premadeButtons'

interface Props {
  user: UserProp
  catalogs: any
  resumeTableData: ResumeTaggingDataCatalog[]
  success: boolean
  message?: string
  hasAssignedImages: any[]
}

import { getCatalogDetails } from '@/components/API/post/getCatalog'
import { exportZenodoUser } from '@/components/API/post/uploadZenodo'
import { ShowZenodo } from '@/components/Modal/showZenodo'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { ColoredLink } from '@/components/ColoredLink'
import { theme } from '@/components/theme'

import { ShowCustomModel } from '@/components/Modal/customModel'

export const Home = (props: Props): JSX.Element => {
  const { user, catalogs } = props
  const data = [
    'Title',
    'Author',
    'Description',
    'Version',
    'Language',
    'Keyword',
  ]

  const [tag, setTag] = React.useState('')
  const [successResult, setSuccessResult] = React.useState({
    link: '',
    created: '',
    doi: '',
  })
  const [doi, setdoi] = React.useState('')
  const [error, setError] = React.useState({})
  const [isError, setIsError] = React.useState(false)
  const [modelValue, setModelValue] = React.useState({
    Title: '',
    Keyword: '',
    Language: '',
    Author: '',
    Description: '',
    Version: '',
  })
  const [openModal, setOpenModal] = React.useState(false)
  const [openCustomModal, setopenCustomModal] = React.useState(false)
  const [message, setMessage] = React.useState('')
  console.log(isError)
  const setZenodoCsvButton = (role, row) => {
    return (
      <div>
        <ViewImage
          variant="contained"
          onClick={async () => {
            setTag(row.id)
            setError({})
            setIsError(false)
            setSuccessResult({ link: '', created: '', doi: '' })
            setdoi('')
            setModelValue({
              Title: '',
              Keyword: '',
              Language: '',
              Author: '',
              Description: '',
              Version: '',
            })
            //  const data: any = await exportZenodoUser({zenodo: true, catalogNames: row});

            setOpenModal(true)
          }}
        >
          {' '}
          Upload to Zenodo
        </ViewImage>
      </div>
    )
  }
  const setSucessMessage = () => {
    return (
      <div>
        <Typography variant="body1" component="h1" gutterBottom>
          <Paper
            elevation={3}
            variant="outlined"
            style={{ padding: 10, marginTop: 20 }}
          >
            Hi your data has been published to Zenodo.
            {/* <Typography variant="h6" component="h6" gutterBottom>
                            DOI NUMBER
                        </Typography> */}
            <Typography variant="body1" component="h1" gutterBottom>
              <Paper elevation={3} variant="outlined" style={{ padding: 2 }}>
                DOI NUMBER - {successResult.doi}
              </Paper>
            </Typography>
            {/* <Typography variant="h6" component="h6" gutterBottom>
                            Date published
                        </Typography> */}
            <Typography variant="body1" component="h1" gutterBottom>
              <Paper elevation={3} variant="outlined" style={{ padding: 2 }}>
                Date Published - {successResult.created}
              </Paper>
            </Typography>
            {/* <Typography variant="h6" component="h6" gutterBottom>
                            Download link
                        </Typography> */}
            <Typography variant="body1" component="h1" gutterBottom>
              <Paper elevation={3} variant="outlined" style={{ padding: 2 }}>
                Download Link -{' '}
                <ColoredLink
                  style={{ color: theme.palette.secondary.main }}
                  href={successResult.link}
                  target="_blank"
                >
                  {successResult.link}
                </ColoredLink>
              </Paper>
            </Typography>
          </Paper>
        </Typography>
      </div>
    )
  }
  const setCategloyData = (data, catalogId) => {
    for (let index = 0; index < catalogs.length; index++) {
      let flags = true
      if (catalogs[index].id === catalogId) {
        const zenodoInfo = catalogs[index].zenodoInfo
        for (let count = 0; count < zenodoInfo.length; count++) {
          if (zenodoInfo[count].doi === data.doi) {
            flags = false
          }
        }
        if (flags) {
          zenodoInfo.push(data)
          catalogs[index].zenodoInfo = zenodoInfo
        }
      }
    }
  }
  const onChnageValue = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    modelValue[name] = value
    setModelValue(modelValue)
  }
  const onSubmitValue = async () => {
    let isError = false
    setError({})
    setIsError(false)
    for (let index = 0; index < data.length; index++) {
      if (!modelValue[data[index]]) {
        isError = true
        setIsError(true)
        error[data[index]] = 'missing ' + data[index]
      }
    }
    setError(error)

    if (!isError) {
      modelValue['catalogId'] = tag

      const result: any = await exportZenodoUser(modelValue)

      if (
        Object.prototype.hasOwnProperty.call(result.data, 'error') &&
        result.data.error.length
      ) {
        let error = ''
        for (let index = 0; index < result.data.error.length; index++) {
          error =
            error +
            ' ' +
            result.data.error[index].field +
            ' ' +
            result.data.error[index].message +
            '\n'
        }

        alert(error)
        console.log(isError)
      } else {
        setOpenModal(false)
        if (result.data && result.data.already) {
          setMessage('This dataset was already Published')
        } else {
          setMessage(' Dataset was Published Successfully')
        }
        setopenCustomModal(true)
        setCategloyData(
          {
            doi: result.data.doi,
            created: result.data.created,
            links: result.data.links,
            id: result.data.id,
          },
          tag
        )
        setSuccessResult({
          doi: result.data.doi,
          created: result.data.created,
          link: result.data.links,
        })
        setdoi(result.data.doi)

        // alert("Your DOI is " + result.data.result.doi);
      }
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
        <React.Fragment>
          <ShowZenodoData
            data={catalogs}
            zenoButton={setZenodoCsvButton}
            role={user.data.roles}
          />
        </React.Fragment>
        {/* {setZenodoCsvButton(user.data.roles)}*/}
        <ShowZenodo
          onSubmitValue={onSubmitValue}
          data={data}
          error={error}
          onChnageValue={onChnageValue}
          name={tag}
          open={openModal}
          setOpenModal={setOpenModal}
        />

        <ShowCustomModel
          open={openCustomModal}
          closeModel={setopenCustomModal}
          message={message}
        />

        {doi ? setSucessMessage() : ''}
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
  const selectionData = await getCatalogDetails(context?.req?.headers?.cookie)
  console.log('selectionData', JSON.stringify(selectionData))
  const UserCatalogs = selectionData?.data?.catalog || []
  for (let index = 0; index < UserCatalogs.length; index++) {
    catalogs.push({
      name: UserCatalogs[index].name,
      id: UserCatalogs[index]._id,
      zenodoInfo: UserCatalogs[index].zenodoInfo || [],
    })
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
