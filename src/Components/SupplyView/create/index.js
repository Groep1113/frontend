import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import GenericDialog from '../../Common/CRUD/GenericDialog';
import MutationHOC from '../../HOC/MutationHOC';
import QueryHOC from '../../HOC/QueryHOC';
import ItemLocationsUpdater from './ItemLocationsUpdater';

const query = gql` query {
  items {
    id name locations { id }
  }
  accounts {
    id name location { id }
  }
}`;

const mutation = gql`mutation($accountId: Int!, $itemId: Int!, $amount: Int) {
    createBalance (
      accountId: $accountId,
      itemId: $itemId,
      amount: $amount) {
        id amount item { id name } account { id name }
    }
  }`;

const styles = ({ spacing }) => ({
});

@QueryHOC(query)
@MutationHOC(mutation)
@withStyles(styles)
export default class SupplyCreate extends Component {
  state = {
    accountId: '',
    itemId: '',
    amount: '',
  };

  handleChange = this.handleChange.bind(this)

  handleChange(accountId) {
    this.setState({ accountId });
  }

  render() {
    const { mutateResults: { loading, error, data }, queryResults, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/overviewsupply' />;
    if (queryResults.loading) return 'Gegevens worden geladen..';
    if (queryResults.error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }

    const { items } = queryResults.data;
    const itemsSelect = items.map(itemsToJSX);
    return (
      <GenericDialog
        dialogTitle="Product registreren"
        cancelPath="/overviewsupply"
        onConfirm={() => mutateFunc({ variables: this.state })}
        loading={loading} error={error} called={data}
      >
        <FormControl>
          <InputLabel htmlFor="items">Items</InputLabel>
          <Select
            className='productFormControl'
            value={this.state.itemId}
            onChange={e => this.setState({ itemId: e.target.value })}
            inputProps={{
              name: 'items',
              id: 'items',
            }}
          >
            {itemsSelect}
          </Select>
          {this.state.itemId ? (
            <ItemLocationsUpdater
              onItemLocationsUpdater={this.handleChange}
              itemId={this.state.itemId}
              items={queryResults.data.items} accounts={queryResults.data.accounts}/>
          ) : (
            <div></div>
          )}
        </FormControl>
        <TextField
          id='amount' name='amount' label="Aantal" type='amount' margin='normal'
          type='number'
          value={this.state.amount}
          onChange={e => this.setState({ amount: e.target.value })} />
      </GenericDialog>
    );
  }
}

const itemsToJSX = (items, i) => {
  const item = items;
  return (
    <MenuItem key={i} value={item.id}
      className="menuItem">
      {item.name}
    </MenuItem>
  );
};
