import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Typography from '@material-ui/core/Typography/Typography';
import Select from 'react-select';
import MutationHOC from '../../HOC/MutationHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';
import QueryHOC from '../../HOC/QueryHOC';

const query = gql`query {
  suppliers { id name }
  locations { id code }
  categories { id name }
}`;

const mutation = gql`mutation($code: String, $recommendedStock: Int, $name: String!) {
    createItem (
      code: $code,
      recommendedStock: $recommendedStock,
      name: $name) {
        id
    }
  }`;

const styles = ({ spacing }) => ({
});

@QueryHOC(query)
@MutationHOC(mutation)
@withStyles(styles)
export default class ItemCreate extends Component {
  state = {
    code: '',
    recommendedStock: '',
    name: '',
    supplier: '',
    locationIds: [],
    categoryIds: [],
    selectedOptionSupplier: '',
    selectedOptionLocation: '',
    selectedOptionCategory: '',
  };

  render() {
    const { mutateResults: { loading, error, data }, queryResults, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/items' />;
    if (queryResults.loading) return 'Gegevens worden geladen..';
    if (queryResults.error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }

    return (
      <GenericDialog
        dialogTitle="Item toevoegen"
        cancelPath="/items"
        onConfirm={() => mutateFunc({ variables: this.state })}
        loading={loading} error={error} called={data}
      >
        <TextField
          id='name' name='name' label="Naam" type='name' margin='normal'
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })} />
        <TextField
          id='code' name='code' label='Code' type='code' margin='normal'
          value={this.state.code}
          onChange={e => this.setState({ code: e.target.value })} />
        <TextField
          id='recommendedStock' name='recommendedStock' label="Minimum voorraad" type='recommendedStock' margin='normal'
          value={this.state.recommendedStock}
          onChange={e => this.setState({ recommendedStock: e.target.value })} />
        <FormControl>
          <Typography variant="subtitle1" className='supplier'>
            Leverancier
          </Typography>
          <Select
            value={this.state.selectedOption}
            options={elementsToOptions(queryResults.data.suppliers)}
            onChange={(...all) => this.setState(
              { supplier: all[0].value, selectedOptionSupplier: all[1].label },
            )}
          />
        </FormControl>
      </GenericDialog>
    );
  }
}

function elementsToOptions(elements) {
  const options = [];
  let i = 1;
  for (const element of elements) {
    options.push({ key: i, value: element.id, label: element.name });
    i += 1;
  }
  return options;
}
