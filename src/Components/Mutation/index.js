const mutation = gql`  
  mutation($code: String!, $locationId: Int!, $recommended_stock: Int!, $name: String!) {
  createItem (
    code: $code, 
    locationId: $locationId, 
    recommended_stock: $recommended_stock, 
    name: $name) {
      code
    }
  }`;

export default class Mutation extends Component {
  render() {
    const { product, type, location, stock } = this.props;
    const { columns } = this.props;
    headers = headers.map(headerToJSX);
    data = mapDataToJSXRows(data, columns);
    return (
      <div className='aTable'>
      <table>
      <thead className='tableHeads'>
      <tr>
      {headers}
      </tr>
      </thead>
      <tbody>
      {data}
      </tbody>
      </table>
      </div>
  );
  }
}