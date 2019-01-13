import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MutationHOC from '../../HOC/MutationHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';

const mutation = gql`mutation($depth: Int!, $code: String!, $width: Int!, $height: Int!) {
    createLocation (
      depth: $depth,
      code: $code, 
      width: $width, 
      height: $height, 
    ) { id }
  }`;

const styles = ({ spacing }) => ({
});

@MutationHOC(mutation)
@withStyles(styles)
export default class LocationCreate extends Component {
  state = {
    code: '',
    depth: '',
    height: '',
    width: '',
  };

  render() {
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/locations2' />;

    return (
      <GenericDialog
        dialogTitle="Locatie toevoegen"
        cancelPath="/locations2"
        onConfirm={() => mutateFunc({ variables: this.state })}
        loading={loading} error={error} called={data}
      >
        <TextField
          id='code' name='code' label='Code' type='code' margin='normal'
          value={this.state.code}
          onChange={e => this.setState({ code: e.target.value })} />
        <TextField
          id='depth' name='depth' label="Diepte (in cm's)" type='depth' margin='normal'
          value={this.state.depth}
          onChange={e => this.setState({ depth: e.target.value })} />
        <TextField
          id='height' name='height' label="Hoogte (in cm's)" type='height' margin='normal'
          value={this.state.height}
          onChange={e => this.setState({ height: e.target.value })} />
        <TextField
          id='width' name='width' label="Breedte (in cm's)" type='width' margin='normal'
          value={this.state.width}
          onChange={e => this.setState({ width: e.target.value })} />
      </GenericDialog>
    );
  }
}
