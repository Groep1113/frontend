import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MutationHOC from '../../HOC/MutationHOC';
import QueryHOC from '../../HOC/QueryHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';

// notice: query contains a parameter ($id: Int!)
// so we will use this.props.queryResults.refetch function to supply it a value
const query = gql`query ($id: Int!) {
  location(id: $id) { code, depth, height, width }
}`;

const mutation = gql`mutation($depth: Int, $code: String, $locationId: Int!, $width: Int, $height: Int) {
  updateLocation (
    depth: $depth,
    code: $code,
    locationId: $locationId,
    width: $width,
    height: $height
  ) { id }
}`;

const styles = ({ spacing }) => ({
});

@QueryHOC(query)
@MutationHOC(mutation)
@withStyles(styles)
export default class LocationsEdit extends Component {
  state = {
    depth: '', code: '', width: '', height: '',
  };

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
        code, depth, height, width,
      } = this.props.queryResults.data.location;
      this.setState({
        code, depth, height, width,
      });
    }
  }

  render() {
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/locations' />;

    const variables = { ...this.state, locationId: parseInt(this.props.match.params.id, 10) };
    return (
      <GenericDialog
        dialogTitle="Locatie bewerken"
        cancelPath="/locations"
        onConfirm={() => mutateFunc({ variables })}
        {...this.props.queryResults} called={this.props.queryResults.data}
      >
        <TextField
          id='code' name='code' label='Code' type='code' margin='normal'
          value={this.state.code}
          onChange={e => this.setState({ code: e.target.value })} />
        <TextField
          id='depth' name='depth' label="Diepte (in cm's)" type='depth' margin='normal'
          type='number'
          value={this.state.depth}
          onChange={e => this.setState({ depth: e.target.value })} />
        <TextField
          id='height' name='height' label="Hoogte (in cm's)" type='height' margin='normal'
          type='number'
          value={this.state.height}
          onChange={e => this.setState({ height: e.target.value })} />
        <TextField
          id='width' name='width' label="Breedte (in cm's)" type='width' margin='normal'
          type='number'
          value={this.state.width}
          onChange={e => this.setState({ width: e.target.value })} />
      </GenericDialog>
    );
  }
}
