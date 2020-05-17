import { Alert, AlertTitle } from '@material-ui/lab';

export default class ErrorAlert extends React.Component {
    render() {
        const {
            errorTitle,
            errorMessage
        } = this.props
        return (
            <Alert severity="error" variant="outlined">
                <AlertTitle >{errorTitle ?? 'Error'}</AlertTitle>
                {errorMessage ?? 'Error'}
            </Alert>
        )
    }
}