import React from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * NameTextField, for a combination of firstName + lastName
 *
 * The onChange function is supplied with the following parameters:
 *  - resulting onChange event object
 *  - a key in string form, for the name part ('firstName'|'lastname')
 *
 * @param  function    @material-ui/core/styles/withStyles function
 * @param  function    onChange function to call
 * @return jsx         React component
 */
export default ({ classes, changeFunc }) => (
  <div className={classes.inputGroup}>
    <TextField
      id='firstName'
      name='firstName'
      label='Voornaam'
      style={{ marginRight: 8 }}
      fullWidth={false}
      onChange={e => changeFunc(e, 'firstName')}
    />
    <TextField
      id='lastName'
      name='lastName'
      label='Achternaam'
      fullWidth={false}
      onChange={e => changeFunc(e, 'lastName')}
    />
  </div>
);
