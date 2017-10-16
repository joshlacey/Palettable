import React from 'react'
import { Route, Switch } from 'react-router-dom';
import RePalate from './RePalate';
import Palates from './Palates';

class PalatesContainer extends React.Component {


  render () {
    return(
      <div>
        <Switch>
          <Route exact path='/palates' component={Palates} />
          <Route path='/palates/:id' component={RePalate} />
        </Switch>
      </div>
    )
  }
}

export default PalatesContainer
