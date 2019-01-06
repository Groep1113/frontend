import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import QueryHOC from '../HOC/QueryHOC';
import Table from '../Table';
import AddCategory from './AddCategory';

const query = gql`{
  categories { 
    id, 
    name, 
    items 
      { name } 
    locations 
      { code } 
  }
}`;

const columnFormatting = [
  'name',
  ({ items }) => items.reduce((accum, { name }) => `${accum}, ${name}`, '').substring(2),
  ({ locations }) => locations.reduce((accum, { code }) => `${accum}, ${code}`, '').substring(2)];
const firstRowTable = ['Categorie', 'Product(en)', 'Locatie(s)'];

@QueryHOC(query)
@withRouter
export default class Category extends Component {
  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }
    const { categories } = data;
    return (
      <div className='category'>
        <AddCategory />
        <Table data = {categories} headers = {firstRowTable} columns = {columnFormatting} version = {'category'} />
      </div>
    );
  }
}
