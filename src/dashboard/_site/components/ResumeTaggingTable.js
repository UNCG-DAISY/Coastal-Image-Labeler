import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
//   table: {
//     maxWidth:'80%'
//   },
  container:{
      maxWidth:'50%'
  }
});

export default function ResumeTaggingTable(props) {
  const classes = useStyles();

  const {
      archives,
      onClick
  } = props

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow hover onClick={()=>alert('a')}> 
            <TableCell>Archive</TableCell>
            <TableCell align="left" size="small">Image Id</TableCell>
            <TableCell align="left" size="small"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(archives).map((archive) => (
            <TableRow key={archive} hover onClick ={()=>onClick(archive,archives[archive])}>
              <TableCell component="th" scope="row">
                {archive}
              </TableCell>
              <TableCell align="justify" size="small">{archives[archive]}</TableCell>
              <TableCell align="left" size="small">
                <Button variant="contained" color="primary" onClick ={()=>onClick(archive,archives[archive])}>
                    Resume
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
