import React, { Component } from 'react';
import gql from 'graphql-tag';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import _includes from 'lodash/includes';
import QueryHOC from '../../HOC/QueryHOC';
import AddRoleHOC from './AddRoleHOC';
import RemoveRoleHOC from './RemoveRoleHOC';

const query = gql`query {
  roles {
    id, name
  }
}`;

const styles = theme => ({
  subtitle: {
    marginBottom: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 2,
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

@AddRoleHOC
@RemoveRoleHOC
@QueryHOC(query)
@withStyles(styles)
export default class UserRolesUpdater extends Component {
  state = { selectedRole: 'none' }

  handleDelete = this.handleDelete.bind(this);

  handleChange = this.handleChange.bind(this);

  handleDelete(roleId) {
    const variables = { roleId, userId: this.props.userId };
    this.props.mutateRemoveRole({ variables })
      .then(this.props.refetchUser)
      .then(this.forceUpdate());
  }

  handleChange(e) {
    if (e.target.value === 'none') return;
    const variables = { roleId: e.target.value, userId: this.props.userId };
    this.props.mutateAddRole({ variables })
      .then(this.props.refetchUser)
      .then(this.forceUpdate());
  }

  render() {
    const { classes, queryResults: { data, loading, error } } = this.props;
    if (loading) return 'Laden..';
    if (error) return `Error: ${error.message}`;

    const chips = this.props.current;
    const rolesAvailable = data.roles
      .filter(r => !_includes(chips && chips.map(c => c.id), r.id));

    const withContext = { className: classes.chip, onDelete: this.handleDelete };
    return (
      <div>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Rollen
        </Typography>
        <Paper className={classes.root}>
          <RoleSelect roles={rolesAvailable}
            onChange={this.handleChange} selected={this.state.selectedRole} />
          {chips && chips.map(mapChipToJSX, withContext)}
        </Paper>
      </div>
    );
  }
}

function mapChipToJSX({ name, id }) {
  return (
    <Chip
      key={id}
      label={name}
      value={id}
      title="Rol verwijderen"
      className={this.className}
      onDelete={e => this.onDelete(id)} />
  );
}

const RoleSelect = ({ roles, selected, onChange }) => (
  <Select
    value={selected}
    onChange={onChange}
    inputProps={{
      name: 'new-role',
      id: 'new-role-select',
    }}
  >
    <MenuItem value="none">
      <em>Rol toevoegen</em>
    </MenuItem>
    {roles && roles.map(r => (
      <MenuItem value={r.id} key={r.id}>{r.name}</MenuItem>
    ))}
  </Select>
);
