/*
  A bunch of links that have styles.
*/

import { FunctionComponent } from 'react'
import { theme } from './theme'

interface Props {
  href: string
  style: object
  target?: string
}

const ColoredLink: FunctionComponent<Props> = (props) => {
  const { style, href, ...other } = props
  return (
    <a style={style} href={href} {...other}>
      {props.children}
    </a>
  )
}

const RepoLink = () => (
  <ColoredLink
    style={{ color: theme.palette.secondary.main }}
    href="https://github.com/UNCG-DAISY/Coastal-Image-Labeler"
    target="_blank"
  >
    repository
  </ColoredLink>
)

const DocsLink = () => (
  <ColoredLink
    style={{ color: theme.palette.secondary.main }}
    href="https://uncg-daisy.github.io/Coastal-Image-Labeler/"
    target="_blank"
  >
    docs
  </ColoredLink>
)

const EmailLinkEvan = () => (
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
    target="_blank"
  >
    documentation
  </ColoredLink>
)

const TwitterLinkEvan = () => (
  <ColoredLink
    style={{ color: theme.palette.secondary.main }}
    href="https://twitter.com/ebgoldstein"
    target="_blank"
  >
    Twitter
  </ColoredLink>
)

const EmailLinkShah = () => (
  <ColoredLink
    style={{ color: theme.palette.secondary.main }}
    href="mailto:shah.nafis@alumni.uncg.edu"
  >
    shah.nafis@alumni.uncg.edu
  </ColoredLink>
)

const LinkedinShah = () => (
  <ColoredLink
    style={{ color: theme.palette.secondary.main }}
    href="https://www.linkedin.com/in/shahnafis/"
    target="_blank"
  >
    Linkedin
  </ColoredLink>
)

export {
  ColoredLink,
  RepoLink,
  EmailLink,
  DocLink,
  TwitterLink,
  EmailLinkShah,
  LinkedinShah,
  DocsLink,
}
