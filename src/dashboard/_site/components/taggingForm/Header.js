import CardHeader from '@material-ui/core/CardHeader';

export default class Header extends React.Component{
    render() {
        return (
            <CardHeader
                // avatar={
                // <Avatar aria-label="recipe" className={classes.avatar}>
                //     R
                // </Avatar>
                // }
                // action={
                // <IconButton aria-label="settings">
                //     <MoreVertIcon />
                // </IconButton>
                // }
                title={this.props.title}
                subheader={this.props.subheader}
                style={this.props.style}
                subheaderTypographyProps={{style:this.props.styleSubheader}}
            />
        )
    }
}