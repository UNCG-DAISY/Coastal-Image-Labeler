import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import { Request,Response } from "express"
//@ts-ignore
import App from '../../_site/pages/_app';
//@ts-ignore
import MyTheme from '../../_site/components/theme';

function renderFullPage(html:string, css:string) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My page</title>
          <style id="jss-server-side">${css}</style>
        </head>
        <body>
          <div id="root">${html}</div>
        </body>
      </html>
    `;
  }

  function handleRender(req:Request, res:Response) {
    const sheets = new ServerStyleSheets();
  
    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
      sheets.collect(
        //@ts-ignore
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <App />
        </ThemeProvider>,
      ),
    );
  
    // Grab the CSS from our sheets.
    const css = sheets.toString();
  
    // Send the rendered page back to the client.
    res.send(renderFullPage(html, css));
  }

export {
    renderFullPage,
    handleRender
}

//<ThemeProvider theme={theme}><App /></ThemeProvider>