import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MutationHOC from '../../HOC/MutationHOC';
import QueryHOC from '../../HOC/QueryHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';
import ItemLocationsUpdater from './Locations/ItemLocationsUpdater';
import ItemCategoriesUpdater from './Categories/ItemCategoriesUpdater';

// notice: query contains a parameter ($id: Int!)
// so we will use this.props.queryResults.refetch function to supply it a value
const query = gql`query ($id: Int!) {
  item(id: $id) { code, name, supplier { id name } recommendedStock locations { id code } categories { id name } }
}`;

const mutation = gql`mutation($supplier: Int, $itemId: Int!, $code: String, $locationIds: [Int!]!, $name: String, $recommendedStock: Int, $categoryIds: [Int!]!) {
  updateItem (
    supplierId: $supplier,
    locationIds: $locationIds,
    itemId: $itemId,
    code: $code,
    name: $name,
    recommendedStock: $recommendedStock,
    categoryIds: $categoryIds
  ) { id }
}`;

const styles = ({ spacing }) => ({
});

@QueryHOC(query)
@MutationHOC(mutation)
@withStyles(styles)
export default class ItemsEdit extends Component {
  state = {
    supplier: '',
    code: '',
    name: '',
    recommendedStock: '',
    locationIds: [],
    categoryIds: [],
  };

  updateItem = this.updateItem.bind(this);

  // we call refetch to supply our QueryHOC with the required param
  componentWillMount() {
    const { match: { params: { id } } } = this.props;
    this.props.queryResults.refetch({ id: parseInt(id, 10) });
  }

  // when we receive new data from the refetch func, update the state values
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.queryResults.data) return;
    if (this.props.queryResults.data !== prevProps.queryResults.data) {
      const {
        code, name, locations, categories,
      } = this.props.queryResults.data.item;
      let { recommendedStock, supplier } = this.props.queryResults.data.item;
      supplier = parseInt(supplier.id, 10);
      recommendedStock = parseInt(recommendedStock, 10);
      const locationIds = elementsToIdList(locations);
      const categoryIds = elementsToIdList(categories);
      this.setState({
        code, name, recommendedStock, locationIds, categoryIds, supplier,
      });
    }
  }

  updateItem() {
    const { match: { params: { id } } } = this.props;
    const {
      code, name, locations, categories,
    } = this.props.queryResults.data.item;
    let { recommendedStock, supplier } = this.props.queryResults.data.item;
    supplier = parseInt(supplier.id, 10);
    recommendedStock = parseInt(recommendedStock, 10);
    const locationIds = elementsToIdList(locations);
    const categoryIds = elementsToIdList(categories);
    this.props.mutateFunc({
      variables: {
        code,
        name,
        recommendedStock,
        supplier,
        locationIds,
        categoryIds,
        itemId: parseInt(id, 10),
      },
    });
  }

  render() {
    const { mutateResults: { loading, error, data }, queryResults, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/items' />;

    const itemId = parseInt(this.props.match.params.id, 10);
    const variables = { ...this.state, itemId };
    return (
      <GenericDialog
        dialogTitle="Item bewerken"
        cancelPath="/items"
        onConfirm={() => mutateFunc({ variables })}
        {...this.props.queryResults} called={this.props.queryResults.data}
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
        <ItemLocationsUpdater
          current={queryResults.data.item ? queryResults.data.item.locations : null}
          refetchItem={queryResults.refetch}
          itemId={itemId} />
        <ItemCategoriesUpdater
          current={queryResults.data.item ? queryResults.data.item.categories : null}
          refetchItem={queryResults.refetch}
          itemId={itemId} />
      </GenericDialog>
    );
  }
}

function elementsToIdList(elements) {
  const idList = [];
  for (const element of elements) {
    idList.push(element.id);
  }
  return idList;
}
