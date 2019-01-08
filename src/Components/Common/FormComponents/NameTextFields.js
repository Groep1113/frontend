import React from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * NameTextField, for a combination of firstName + lastName
 *
 * The onChange function is supplied with the following parameters:
 *  - resulting onChange event object
 *  - a key in string form, for the name part ('firstName'|'lastname')
 *
 * @param  function    classes: @material-ui/core/styles/withStyles function (optional)
 *    available keys for styling: container, input
 * @param  function    onChange: function to call onChange
 * @param  object      initValues: initial values for the firstName and lastName (optional)
 * @return jsx         React component
 */
export default ({ classes, onChange, initValues }) => (
  <div className={classes && classes.container ? classes.container : ''}>
    <TextField
      id='firstName'
      className={classes && classes.input ? classes.input : ''}
      value={initValues ? initValues.firstName : ''}
      name='firstName'
      label='Voornaam'
      style={{ marginRight: 8 }}
      fullWidth={false}
      onChange={e => onChange(e, 'firstName')}
    />
    <TextField
      id='lastName'
      className={classes && classes.input ? classes.input : ''}
      value={initValues ? initValues.lastName : ''}
      name='lastName'
      label='Achternaam'
      fullWidth={false}
      onChange={e => onChange(e, 'lastName')}
    />
  </div>
);
