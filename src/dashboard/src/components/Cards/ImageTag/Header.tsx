import CardHeader from '@material-ui/core/CardHeader'

interface Props {
  title: string
  subheader: string
  style: any
  subheaderStyle: any
}

export function Header(props: Props) {
  const { title, subheader, style, subheaderStyle } = props
  return (
    <CardHeader
      title={title}
      subheader={subheader}
      style={style}
      subheaderTypographyProps={{ style: subheaderStyle }}
    />
  )
}
