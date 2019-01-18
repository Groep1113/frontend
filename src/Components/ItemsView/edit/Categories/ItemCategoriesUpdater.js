import React, { Component } from 'react';
import gql from 'graphql-tag';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import _includes from 'lodash/includes';
import QueryHOC from '../../../HOC/QueryHOC';
import AddCategoryHOC from './AddCategoryHOC';
import RemoveCategoryHOC from './RemoveCategoryHOC';

const query = gql`query {
  categories {
    id name
  }
}`;

const styles = theme => ({
  subtitle: {
    marginBottom: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 2,
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

@AddCategoryHOC
@RemoveCategoryHOC
@QueryHOC(query)
@withStyles(styles)
export default class ItemCategoriesUpdater extends Component {
  state = { selectedCategory: 'none' }

  handleDelete = this.handleDelete.bind(this);

  handleChange = this.handleChange.bind(this);

  handleDelete(categoryId) {
    const variables = { categoryId, itemId: this.props.itemId };
    this.props.mutateRemoveCategory({ variables })
      .then(this.props.refetchItem)
      .then(this.forceUpdate());
  }

  handleChange(e) {
    if (e.target.value === 'none') return;
    const variables = { categoryId: e.target.value, itemId: this.props.itemId };
    this.props.mutateAddCategory({ variables })
      .then(this.props.refetchItem)
      .then(this.forceUpdate());
  }

  render() {
    const { classes, queryResults: { data, loading, error } } = this.props;
    if (loading) return 'Laden..';
    if (error) return `Error: ${error.message}`;

    const chips = this.props.current;
    const categoriesAvailable = data.categories
      .filter(c => !_includes(chips && chips.map(i => i.id), c.id));

    const withContext = { className: classes.chip, onDelete: this.handleDelete };
    return (
      <div>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Categorieën
        </Typography>
        <Paper className={classes.root}>
          <LocationSelect categories={categoriesAvailable}
            onChange={this.handleChange} selected={this.state.selectedCategory} />
          {chips && chips.map(mapChipToJSX, withContext)}
        </Paper>
      </div>
    );
  }
}

function mapChipToJSX({ name, id }) {
  return (
    <Chip
      key={id}
      label={name}
      value={id}
      title="Categorie verwijderen"
      className={this.className}
      onDelete={e => this.onDelete(id)} />
  );
}

const LocationSelect = ({ categories, selected, onChange }) => (
  <Select
    value={selected}
    onChange={onChange}
    inputProps={{
      name: 'new-category',
      id: 'new-category-select',
    }}
  >
    <MenuItem value="none">
      <em>Categorie toevoegen</em>
    </MenuItem>
    {categories && categories.map(c => (
      <MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>
    ))}
  </Select>
);
