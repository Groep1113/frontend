import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import QueryHOC from '../HOC/QueryHOC';

const query = gql`{ locations { code } }`;

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

@QueryHOC(query)
class DropdownProduct extends Component {
  state = {
    location: '',
  }

  handleChange({ target: { value } }, k) {
    this.setState({
      [k]: value,
    });
  }

  render() {
    return (
      <div className='dropdown'>
        <FormControl className='productFormControl'>
          <InputLabel htmlFor="location">Location</InputLabel>
          <Select
            value={this.state.location}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value={10}>1</MenuItem>
            <MenuItem value={20}>2</MenuItem>
            <MenuItem value={30}>3</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(DropdownProduct);
