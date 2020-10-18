import React from 'react'
import { Typography, Paper, Box } from '@material-ui/core'
import { EmailLinkEvan, RepoLink, DocLink } from '@/components/ColoredLink'

interface Props {
  displayName: string
}
export function HomeText(props: Props) {
  const { displayName } = props
  return (
    <Typography variant="body1" component="h1" gutterBottom>
      <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
        Welcome {displayName}! You can start by clicking &quot;Label New
        Archive&quot; on the left, or resume labeling a catalog you have started
        using the table below. If you want to label more images, please contact
        Evan Goldstein at {<EmailLinkEvan />}. To learn more about this project,
        check out the code {<RepoLink />} and the project {<DocLink />}.
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
        {<EmailLinkEvan />}
      </Box>
    </Typography>
  )
}
