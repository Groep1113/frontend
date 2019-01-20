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

const mutation = gql`mutation($supplierId: Int, $code: String, $locationId: [Int!]!, $name: String!, $recommendedStock: Int, $categoryId: [Int!]!) {
    createItem (
      supplierId: $supplierId,
      code: $code,
      locationId: $locationId,
      name: $name,
      recommendedStock: $recommendedStock,
      categoryId: $categoryId) {
        id name
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
    supplierId: '',
    locationId: [],
    categoryId: [],
    selectedOptionSupplier: '',
    selectedOptionLocation: '',
    selectedOptionCategory: '',
  };

  handleChangeLocation = this.handleChangeLocation.bind(this);

  handleChangeCategory = this.handleChangeCategory.bind(this);

  handleChangeLocation(all) {
    this.setState({ locationId: elementsToIdList(all[0]), selectedOptionLocation: all[1].label });
  }

  handleChangeCategory(all) {
    this.setState({ categorId: elementsToIdList(all[0]), selectedOptionCategory: all[1].label });
  }

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
            value={this.state.selectedOptionSupplier}
            options={elementsToOptions(queryResults.data.suppliers)}
            onChange={(...all) => this.setState(
              { supplierId: all[0].value, selectedOptionSupplier: all[1].label },
            )}
          />
          <Typography variant="subtitle1" className='location'>
            Locaties
          </Typography>
          <Select
            value={this.state.selectedOptionLocation}
            isMulti={true}
            options={locationsToOptions(queryResults.data.locations)}
            onChange={(...all) => this.handleChangeLocation(all)}
          />
          <Typography variant="subtitle1" className='category'>
            Categorieën
          </Typography>
          <Select
            value={this.state.selectedOptionCategory}
            isMulti={true}
            options={elementsToOptions(queryResults.data.categories)}
            onChange={(...all) => this.handleChangeCategory(all)}
          />
        </FormControl>
      </GenericDialog>
    );
  }
}

function elementsToIdList(elements) {
  const idList = [];
  for (const element of elements) {
    idList.push(element.value);
  }
  return idList;
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

function locationsToOptions(locations) {
  const options = [];
  let i = 1;
  for (const location of locations) {
    options.push({ key: i, value: location.id, label: location.code });
    i += 1;
  }
  return options;
}
