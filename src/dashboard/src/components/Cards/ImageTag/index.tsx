import Card from '@material-ui/core/Card'
import { theme } from '@/components/theme'
import CardContent from '@material-ui/core/CardContent'
import { UserProp } from '@/interfaces/index'
import GenericHookForm from '@/components/Forms/genricHookForm'
import { Header } from './Header'
import { ImageContainer } from './Image'
import { ShowTagData } from '@/components/Modal/showTagData'
import {
  ImageDocument,
  QuestionSetDocument,
  CatalogDocument,
  ArchiveDocument,
} from '@/interfaces/models'
import React from 'react'
import Router from 'next/router'
import { SuccessErrorBar } from '@/components/Snackbar'
import { submitImageTags } from '@/components/API/post/submitTags'
import { routes } from '@/components/Constants'

interface Props {
  user: UserProp
  imageDocument: ImageDocument
  questionSetDocument: QuestionSetDocument
  catalog: CatalogDocument
  archive: ArchiveDocument
}

export function ImageTag(props: Props) {
  const { imageDocument, questionSetDocument, user, catalog, archive } = props

  const [tag, setTag] = React.useState({})
  const [openModal, setOpenModal] = React.useState(false)

  const [openSnackbar, setSnackbar] = React.useState(false)
  const [snackbarTime, setSnackbarTime] = React.useState(2000)
  const [snackbarStatus, setSnackbarStatus] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState('')
  const handleClick = () => {
    setSnackbar(true)
  }

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
      setSnackbarMessage(
        `${resSubmitTag.message} - Getting new image in ${
          snackbarTime / 1000
        } seconds`
      )
      setTimeout(() => {
        Router.reload()
      }, snackbarTime)
    } else {
      setSnackbarTime(999999)
      setSnackbarStatus(false)
    }
  }

  function skipImage() {
    Router.reload()
  }

  return (
    <Card>
      <Header
        title={`Catalog ${catalog?.name}`}
        subheader={`Archive ${archive?.name} - ${imageDocument?.name}`}
        style={{ color: theme.palette.primary.light }}
        subheaderStyle={{ color: theme.palette.secondary.main }}
      />
      <ImageContainer
        compressedLink={routes.getReq.showImage(
          'compressed',
          imageDocument._id
        )}
        originalLink={routes.getReq.showImage('original', imageDocument._id)}
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
