import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import AccountIcon from '@material-ui/icons/AccountBalanceWalletRounded';

import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper/Paper';
import QueryHOC from '../HOC/QueryHOC';

const graphQlQuery = gql`query {
  suggestions {
    id
    reason
    amount
    item {
      id
      name
    }
  }
}`;

const styles = theme => ({
  container: {
    maxWidth: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: theme.spacing.unit,
    margin: '0 auto',
    minHeight: 300,
  },
  item: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    maxWidth: 450,
  },
});

@QueryHOC(graphQlQuery)
@withStyles(styles)
@withRouter
export default class Dashboard extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit a user
    const oldPath = prevProps.location.pathname;
    if (
      (oldPath.includes('/dashboard'))
      && this.props.location.pathname === '/'
    ) {
      this.props.queryResults.refetch();
    }
  }

  render() {
    const { loading, data, error } = this.props.queryResults;

    if (loading) return 'Loading data..';
    if (error) return `Foutmelding bij data ophaling: ${error.message}`;

    const withContext = {
      className: this.props.classes.item,
      push: this.props.history.push,
    };
    return (
      <Paper className={this.props.classes.container} elevation={0}>
        <Card className={this.props.classes.item}>
          <CardContent style={{
            paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4,
          }}>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              Welkom op het dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
              Hier zal mogelijk een kort overzicht van de algemene stand van zaken
              weergegeven worden. <br />
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Nummer van de dag: 42.
            </Typography>
          </CardContent>
        </Card>
        {
          data && data.suggestions
            && data.suggestions.map(mapSuggestionToJSX, withContext)
        }
      </Paper>
    );
  }
}

function mapSuggestionToJSX({
  id, amount, item: { name }, reason,
}) {
  return (
    <Card key={id} className={this.className}>
      <CardContent style={{
        paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4,
      }}>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          <Badge badgeContent={amount} color="primary"
            style={{ paddingRight: 16 }}>
            Suggestie: {name}
          </Badge>
        </Typography>
        <Typography variant="body2">
          {reason}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={e => this.push(`/suggestions/execute/${id}`)}>
          Uitvoeren
        </Button>
      </CardActions>
    </Card>
  );
}
