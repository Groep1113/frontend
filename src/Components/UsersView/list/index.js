import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import QueryHOC from '../../HOC/QueryHOC';

const query = gql` {
  users {
    id, firstName, lastName, email
  }
}`;

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: {
    display: 'inline-block',
  },
  createBtn: {
    float: 'right',
  },
  table: {
    marginTop: theme.spacing.unit,
  },
});

@QueryHOC(query)
@withStyles(styles)
@withRouter
export default class UsersView extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit a user
    const oldPath = prevProps.location.pathname;
    if (
      (oldPath.includes('/users/create') || oldPath.includes('/users/edit/'))
      && this.props.location.pathname === '/users'
    ) {
      this.props.queryResults.refetch();
    }
  }

  render() {
    const {
      classes, queryResults: { loading, data, error },
      history,
    } = this.props;

    if (loading) return 'Loading data..';
    if (error) return `Foutmelding bij data ophaling: ${error.message}`;

    return (
      <Paper className={classes.paper} elevation={1}>
        <Fab
          size="medium" onClick={e => history.push('/users/create')}
          className={classes.createBtn} color="primary"
          aria-label="Nieuwe gebruiker" title="Nieuwe gebruiker"
        >
          <AddIcon />
        </Fab>
        <Typography className={classes.title} gutterBottom variant="h4">
          Gebruikers
        </Typography>
        <Table className={classes.table}>
          <CustomTableHead />
          <TableBody>
            {data.users && data.users.map(rowDataToJSX, history)}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const CustomTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell>Id</TableCell>
      <TableCell>Voornaam</TableCell>
      <TableCell>Achternaam</TableCell>
      <TableCell>E-Mail Adres</TableCell>
      <TableCell>Edit</TableCell>
    </TableRow>
  </TableHead>
);

// receives this.props.history as `thisArg`
function rowDataToJSX(row) {
  return (
    <TableRow key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.firstName}</TableCell>
      <TableCell>{row.lastName}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>
        <IconButton
          onClick={e => this.push(`/users/edit/${row.id}`)}
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
