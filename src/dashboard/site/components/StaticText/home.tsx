import React from 'react'
import { Typography, Paper, Box } from '@material-ui/core'
import { EmailLink, RepoLink, DocLink } from '../ColoredLink'

interface Props {
  displayName: string
}
export function HomeText(props: Props) {
  const { displayName } = props
  return (
    <Typography variant="body1" component="h1" gutterBottom>
      <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
        Welcome {displayName}! If you have permission to label images, you can
        start by clicking &quot;Pick Catalog to Label&quot; on the left, or
        resume labeling a catalog you have started using the table below. To
        request permission to label images, please contact Evan Goldstein at{' '}
        {<EmailLink />}. Also, please check out the project {<RepoLink />} and
        the project {<DocLink />}.
      </Paper>
    </Typography>
  )
}

export function NoAssigned() {
  return (
    <Typography variant="body1" component="h1" gutterBottom>
      <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
        No archives to resume tagging from.
      </Paper>
    </Typography>
  )
}

export function ReviewBeforeSubmit() {
  return (
    <Typography component="div">
      <Box textAlign="justify" m={1}>
        These are the tags that have been submitted, please review before moving
        on. If there are any errors please contact Evan Goldstein at{' '}
        {<EmailLink />}
      </Box>
    </Typography>
  )
}
