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
import AddLocationHOC from './AddLocationHOC';
import RemoveLocationHOC from './RemoveLocationHOC';

const query = gql`query {
  locations {
    id code
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

@AddLocationHOC
@RemoveLocationHOC
@QueryHOC(query)
@withStyles(styles)
export default class ItemLocationsUpdater extends Component {
  state = { selectedLocation: 'none' }

  handleDelete = this.handleDelete.bind(this);

  handleChange = this.handleChange.bind(this);

  handleDelete(locationId) {
    const variables = { locationId, itemId: this.props.itemId };
    this.props.mutateRemoveLocation({ variables })
      .then(this.props.refetchItem)
      .then(this.forceUpdate());
  }

  handleChange(e) {
    if (e.target.value === 'none') return;
    const variables = { locationId: e.target.value, itemId: this.props.itemId };
    this.props.mutateAddLocation({ variables })
      .then(this.props.refetchItem)
      .then(this.forceUpdate());
  }

  render() {
    const { classes, queryResults: { data, loading, error } } = this.props;
    if (loading) return 'Laden..';
    if (error) return `Error: ${error.message}`;

    const chips = this.props.current;
    const locationsAvailable = data.locations
      .filter(l => !_includes(chips && chips.map(i => i.id), l.id));

    const withContext = { className: classes.chip, onDelete: this.handleDelete };
    return (
      <div>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Locaties
        </Typography>
        <Paper className={classes.root}>
          <LocationSelect locations={locationsAvailable}
            onChange={this.handleChange} selected={this.state.selectedLocation} />
          {chips && chips.map(mapChipToJSX, withContext)}
        </Paper>
      </div>
    );
  }
}

function mapChipToJSX({ code, id }) {
  return (
    <Chip
      key={id}
      label={code}
      value={id}
      title="Locatie verwijderen"
      className={this.className}
      onDelete={e => this.onDelete(id)} />
  );
}

const LocationSelect = ({ locations, selected, onChange }) => (
  <Select
    value={selected}
    onChange={onChange}
    inputProps={{
      name: 'new-location',
      id: 'new-location-select',
    }}
  >
    <MenuItem value="none">
      <em>Locatie toevoegen</em>
    </MenuItem>
    {locations && locations.map(l => (
      <MenuItem value={l.id} key={l.id}>{l.code}</MenuItem>
    ))}
  </Select>
);
