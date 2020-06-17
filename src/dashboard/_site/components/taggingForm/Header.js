import CardHeader from '@material-ui/core/CardHeader';

export default class Header extends React.Component{
    render() {
        return (
            <CardHeader
                title={this.props.title}
                subheader={this.props.subheader}
                style={this.props.style}
                subheaderTypographyProps={{style:this.props.styleSubheader}}
            />
        )
    }
}