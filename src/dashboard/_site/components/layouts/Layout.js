import React from 'react'
import { withStyles} from '@material-ui/core/styles';
import ResponsiveDrawer from './drawer'

class Layout extends React.Component{
    
    render() {
        const {
            user,
            pageTitle,
            children
        } = this.props
        return (
            <React.Fragment>
                <ResponsiveDrawer user={user} pageTitle={pageTitle}>
                    {children}
                </ResponsiveDrawer>
                
            </React.Fragment>
        )
    }
}

const styles = theme => ({

});

// Layout.getInitialProps = async ctx => {
//     const {req,res} = ctx
//     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    
  
//     return {test:'TEST!!!!'}
//   }

export default withStyles(styles)(Layout);