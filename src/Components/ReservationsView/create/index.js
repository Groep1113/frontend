import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography/Typography';
import MutationHOC from '../../HOC/MutationHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';
import QueryHOC from '../../HOC/QueryHOC';
import ItemLocationsUpdater from './ItemLocationsUpdater';

const query = gql`query{
  items { id name }
  balances  {
    item { id name } amount
  }
}`;

const mutation = gql`mutation($itemId: Int!, $amount: Int!, $plannedDate: LocalDate, $locationId: Int!, $description: String) {
    createReservationTransaction (
      itemId: $itemId, 
      amount: $amount, 
      plannedDate: $plannedDate,
      locationId: $locationId,
      description: $description
    ) { id createdDate }
}`;

const todaysMonth = new Date().getMonth() + 1 > 9
  ? `${new Date().getMonth() + 1}`
  : `0${new Date().getMonth() + 1}`;
const todaysDay = new Date().getDate() > 9
  ? `${new Date().getDate()}`
  : `0${new Date().getDate()}`;
const today = `${new Date().getFullYear()}-${todaysMonth}-${todaysDay}`;

const styles = ({ spacing }) => ({
});

@MutationHOC(mutation)
@QueryHOC(query)
@withStyles(styles)
export default class ReservationCreate extends Component {
  state = {
    itemId: '',
    amount: '',
    plannedDate: today,
    locationId: '',
    description: '',
    selectedOption: null,
    itemSelected: false,
  };

  handleChange = this.handleChange.bind(this)

  handleChange(locationId) {
    this.setState({ locationId });
  }

  render() {
    const { mutateResults: { loading, error, data }, queryResults, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/reservations' />;
    if (queryResults.loading) return 'Gegevens worden geladen..';
    if (queryResults.error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }

    return (
      <GenericDialog
        dialogTitle="Reservering toevoegen"
        cancelPath="/reservations"
        onConfirm={() => mutateFunc({
          variables: {
            itemId: parseInt(this.state.itemId, 10),
            amount: parseInt(this.state.amount, 10),
            locationId: parseInt(this.state.locationId, 10),
            plannedDate: this.state.plannedDate,
            description: this.state.description,
          },
        })}
        loading={loading} error={error} called={data}
      >
        <Typography variant="subtitle1" className='item'>
          Selecteer item
        </Typography>
        <Select
          value={this.state.selectedOption}
          options={itemsToOptions(queryResults.data.items)}
          onChange={(...all) => this.setState(
            {
              itemId: parseInt(all[0].value, 10),
              selectedOption: all[1].label,
              itemSelected: true,
            },
          )}
        />
        {this.state.itemSelected ? (
          <ItemLocationsUpdater
            onItemLocationsUpdater={this.handleChange}
            itemId={this.state.itemId}
            items={queryResults.data.items} balances={queryResults.data.balances}/>
        ) : (
          <div></div>
        )}
        <TextField
          id='amount' name='amount' label='Aantal' type='amount' margin='normal'
          type='number'
          value={this.state.amount}
          onChange={e => this.setState({ amount: parseInt(e.target.value, 10) })} />
        <TextField
          id='plannedDate' name='plannedDate' label="Reserveringsdatum" type='date' margin='normal'
          value={this.state.plannedDate}
          onChange={e => this.setState({ plannedDate: e.target.value })} />
        <TextField
          id='description' name='description' label='Beschrijving' type='description' margin='normal'
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })} />
      </GenericDialog>
    );
  }
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
