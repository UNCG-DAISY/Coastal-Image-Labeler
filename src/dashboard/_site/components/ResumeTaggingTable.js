import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function ResumeTaggingTable(props) {
  const classes = useStyles();

  const {
    resumeObj,
      //onClick
  } = props

  return (

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Catalog Name</TableCell>
            <TableCell>Archive Name</TableCell>
            <TableCell align="center" padding="default">
              You tagged
            </TableCell>
            <TableCell align="center" padding="default">
              Total tagged
            </TableCell>
            <TableCell align="center" padding="default">
              Resume
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(resumeObj).map((archive) => {
            
            const archiveData = resumeObj[archive]
            return (
              <TableRow key={archiveData.URL} hover onClick ={()=>location.href = archiveData.URL}>
                <TableCell component="th" scope="row">
                  {archiveData.catalogName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {archiveData.archiveName}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {archiveData.taggedByUser}/{archiveData.totalForArchive}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {archiveData.totalTaggedForArchive}/{archiveData.totalForArchive}
                </TableCell>
                <TableCell align="center" size="small">
                  <Button variant="contained" color="primary" onClick ={()=>location.href = archiveData.URL}>
                      Resume
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
