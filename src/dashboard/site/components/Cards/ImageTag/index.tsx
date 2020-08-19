import Card from '@material-ui/core/Card'
import { useRouter } from 'next/router'

import { theme } from '../../theme'
import CardContent from '@material-ui/core/CardContent'

// import { questionSetData } from '../../data/testQuestions'
import { UserProp } from '../../../../interfaces'
import GenericHookForm from '../../Forms/genricHookForm'
import { Header } from './Header'
import { ImageContainer } from './Image'

import { ShowTagData } from '../../Modal/showTagData'

import {
  ImageDocument,
  QuestionSetDocument,
} from '../../../../interfaces/models'
import React from 'react'
import Router from 'next/router'

import { SuccessErrorBar } from '../../Snackbar'
import { submitImageTags } from '../../API/post/submitTags'

interface Props {
  user: UserProp
  imageDocument: ImageDocument
  questionSetDocument: QuestionSetDocument
}

export function ImageTag(props: Props) {
  const router = useRouter()
  const { catalog = '', archive = '' } = router.query

  const { imageDocument, questionSetDocument, user } = props

  const [tag, setTag] = React.useState({})
  const [openModal, setOpenModal] = React.useState(false)

  const [openSnackbar, setSnackbar] = React.useState(false)
  const [snackbarTime, setSnackbarTime] = React.useState(6000)
  const [snackbarStatus, setSnackbarStatus] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState('')
  const handleClick = () => {
    setSnackbar(true)
  }

  // const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setSnackbar(false);
  // };

  async function submitTags(tags) {
    const submitData = {
      userId: user.data._id,
      imageId: imageDocument._id as string,
      tags: tags,
      date: Date.now(),
    }

    const resSubmitTag = await submitImageTags({ body: submitData })

    handleClick()
    setSnackbarMessage(resSubmitTag.message)

    if (resSubmitTag.success) {
      setSnackbarStatus(true)
      setTimeout(() => {
        Router.reload()
      }, snackbarTime)
    } else {
      setSnackbarTime(999999)
      setSnackbarStatus(false)
    }
  }

  function skipImage() {
    //blah blah
    // const submitData = {
    //   userId: user.data._id,
    //   imageId: imageDocument._id
    // }
    Router.reload()
  }

  return (
    <Card>
      <Header
        title={`Catalog ${catalog}`}
        subheader={`Archive ${archive} - ${imageDocument?.name}`}
        style={{ color: theme.palette.primary.light }}
        subheaderStyle={{ color: theme.palette.secondary.main }}
      />
      <ImageContainer
        compressedLink={imageDocument?.path?.compressed}
        originalLink={imageDocument?.path?.original}
      />
      <CardContent>
        <GenericHookForm
          questionSetData={questionSetDocument}
          formFunctions={{
            skipImage: skipImage,
            submitTags: submitTags,
          }}
          setTag={setTag}
        />
      </CardContent>
      <ShowTagData tag={tag} open={openModal} setOpen={setOpenModal} />
      {openSnackbar && (
        <SuccessErrorBar
          duration={snackbarTime}
          message={snackbarMessage}
          success={snackbarStatus}
        />
      )}
    </Card>
  )
}
