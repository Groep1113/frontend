import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    minWidth: '80%',
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

@withStyles(styles)
@withRouter
export default class GenericListView extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit
    const oldPath = prevProps.location.pathname;
    if (
      (
        oldPath.includes(`${this.props.basePath}create`)
        || oldPath.includes(`${this.props.basePath}edit`)
      )
      && this.props.location.pathname === this.props.basePath.replace(/\/$/, '')
    ) {
      this.props.refetchFunc();
    }
  }

  render() {
    const {
      classes, history: { push }, fabLabel, tblTitle, data, headers, columns,
      basePath,
    } = this.props;

    return (
      <Paper className={classes.paper} elevation={1}>
        <Fab
          size="medium" onClick={e => push(`${basePath}create`)}
          className={classes.createBtn} color="primary"
          aria-label={fabLabel} title={fabLabel}
        >
          <AddIcon />
        </Fab>
        <Typography className={classes.title} gutterBottom variant="h4">
          {tblTitle}
        </Typography>
        <Table className={classes.table}>
          <CustomTableHead headers={headers} />
          <TableBody>
            {data && data.map(rowDataToJSX, { push, basePath, columns })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const CustomTableHead = ({ headers }) => (
  <TableHead>
    <TableRow>
      {headers.map((col, i) => {
        if (typeof col !== 'function') return <TableCell key={i}>{col}</TableCell>;
        return <TableCell key={i}>{col()}</TableCell>;
      })}
    </TableRow>
  </TableHead>
);

// receives this.props.history as `thisArg`
function rowDataToJSX(row) {
  return (
    <TableRow key={row.id}>
      {this.columns.map((col, i) => {
        if (typeof col !== 'function') return <TableCell key={i}>{row[col]}</TableCell>;
        return <TableCell key={i}>{col(row)}</TableCell>;
      })}
      <TableCell>
        <IconButton
          onClick={e => this.push(`${this.basePath}edit/${row.id}`)}
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

GenericListView.propTypes = {
  // refetchFunc: optional function to call when returning from /edit or /create paths
  refetchFunc: PropTypes.func,
  // basePath: use this to form edit and create links
  basePath: PropTypes.string.isRequired,
  // FloatingActionButton label text
  fabLabel: PropTypes.string,
  // Title for the table
  tblTitle: PropTypes.string,
  // data rows for the table, requires each row to be an object having an id
  data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.any.isRequired })),
  // Headers to display above the table, as an array of strings or functions
  headers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])).isRequired,
  // data columns and their order to display the data in, strings will be used
  // as columns keys to the corresponding data row object. In addition a
  // single argument function can be used to display data from the row object
  // in any way possible
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])).isRequired,
};
