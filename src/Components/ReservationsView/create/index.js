import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import MutationHOC from '../../HOC/MutationHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';
import QueryHOC from '../../HOC/QueryHOC';

const query = gql`query{
  items { id name }
}`;

const mutation = gql`mutation($itemId: Int, $amount: Int, $plannedDate: LocalDate, $locationId: Int!, $description: String) {
    createReservationTransaction (
      itemId: $itemId, 
      amount: $amount, 
      plannedDate: $plannedDate,
      locationId: $locationId,
      description: $description
    ) { id createdDate }
}`;

const today = new Date().getMonth() + 1 > 9
  ? `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  : `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`;

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
  };

  render() {
    const { mutateResults: { loading, error, data }, queryResults, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/reservations2' />;
    if (queryResults.loading) return 'Gegevens worden geladen..';
    if (queryResults.error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }

    return (
      <GenericDialog
        dialogTitle="Reservering toevoegen"
        cancelPath="/reservations2"
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
        <Select
          value={this.state.selectedOption}
          options={itemsToOptions(queryResults.data.items)}
          onChange={(...all) => this.setState(
            { itemId: parseInt(all[0].value, 10), selectedOption: all[1].label },
          )}
        />
        <TextField
          id='amount' name='amount' label='Aantal' type='amount' margin='normal'
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
