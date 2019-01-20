import React, { Component } from 'react';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography/Typography';
import FormControl from '@material-ui/core/FormControl/FormControl';
import { Redirect } from 'react-router-dom';
import QueryHOC from '../../HOC/QueryHOC';

const query = gql`query($id: Int!) {
  item(id: $id) {
    id locations { id code }
  }
}`;

const styles = ({ spacing }) => ({
});

@QueryHOC(query)
@withStyles(styles)
export default class ItemLocationsUpdater extends Component {
  state = {
    locationId: '',
  };

  // handleChange = this.handleChange.bind(this)
  //
  // handleChange = (all) => {
  //   this.props.onItemLocationsUpdater(all[0].value);
  //   this.setState(
  //     { locationId: parseInt(all[0].value, 10), selectedOption: all[1].label },
  //   );
  // }

  render() {
    const {
      queryResults: { loading, error, data }, items, itemId,
    } = this.props;

    console.log(this.state.locationId);

    this.props.queryResults.refetch({ id: parseInt(itemId, 10) });
    return (
      <FormControl>
        <Typography variant="subtitle1" className='location'>
          Selecteer locatie
        </Typography>
        <Select
          value={this.state.selectedOption}
          options={isEmpty(this.props.queryResults.data.item)
            ? itemsToOptions(items) : locationsToOptions(data.item.locations)}
          onChange={(...all) => this.setState(
            { locationId: parseInt(all[0].value, 10), selectedOption: all[1].label },
          )}
        />
      </FormControl>
    );
  }
}

function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}

function itemsToOptions(items) {
  const options = [];
  let i = 1;
  for (const item of items) {
    options.push({ key: i, value: item.id, label: item.name });
    i += 1;
  }
  return options;
}

function locationsToOptions(locations) {
  const options = [];
  let i = 1;
  for (const location of locations) {
    options.push({ key: i, value: location.id, label: location.code });
    i += 1;
  }
  return options;
}
