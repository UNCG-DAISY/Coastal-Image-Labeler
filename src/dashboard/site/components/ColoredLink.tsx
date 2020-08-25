import { FunctionComponent } from 'react'
import { theme } from './theme'

interface Props {
  href: string
  style: object
}

const ColoredLink: FunctionComponent<Props> = (props) => {
  return (
    <a style={props.style} href={props.href}>
      {props.children}
    </a>
  )
}

const RepoLink = () => (
  <ColoredLink
    style={{ color: theme.palette.secondary.main }}
    href="https://github.com/UNCG-DAISY/Coastal-Image-Labeler"
  >
    repository
  </ColoredLink>
)

const EmailLink = () => (
  <ColoredLink
    style={{ color: theme.palette.secondary.main }}
    href="mailto:ebgoldst@uncg.edu"
  >
    ebgoldst@uncg.edu
  </ColoredLink>
)

const DocLink = () => (
  <ColoredLink
    style={{ color: theme.palette.secondary.main }}
    href="https://uncg-daisy.github.io/Coastal-Image-Labeler/"
  >
    documentation
  </ColoredLink>
)

export { ColoredLink, RepoLink, EmailLink, DocLink }
