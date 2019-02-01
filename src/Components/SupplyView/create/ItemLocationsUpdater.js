import React, { Component } from 'react';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography/Typography';
import FormControl from '@material-ui/core/FormControl/FormControl';
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
    accounts: '',
  };

  handleChange = this.handleChange.bind(this)

  handleChange(all) {
    const locationId = parseInt(all[0].value, 10);
    const accountId = locationToAccountId(this.props.accounts, locationId);
    this.props.onItemLocationsUpdater(accountId);
    this.setState(
      { locationId, selectedOption: all[1].label },
    );
  }

  render() {
    const {
      queryResults: { data }, items, itemId,
    } = this.props;

    this.props.queryResults.refetch({ id: parseInt(itemId, 10) });
    return (
      <div>
        <FormControl>
          <Typography variant="subtitle1" className='location'>
            Selecteer locatie
          </Typography>
          <Select
            value={this.state.selectedOption}
            options={isEmpty(this.props.queryResults.data.item)
              ? itemsToOptions(items) : locationsToOptions(data.item.locations)}
            onChange={(...all) => this.handleChange(all)}
          />
        </FormControl>
      </div>
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

function locationToAccountId(accounts, locationId) {
  for (const account of accounts) {
    if (account.location) {
      if (account.location.id == locationId) {
        return account.id;
      }
    }
  }
  return null;
}
