import React from 'react';
import Palate from './Palate';
import { Link } from 'react-router-dom';
import { loading } from '../../helpers/loader.js';
import HowItWorks from './HowItWorks';


class Palates extends React.Component {

state={
  loading:false,
  palates: []
}

componentDidMount = () => {
  this.setState({loading: true})
  fetch(process.env.REACT_APP_API_ENDPOINT + 'palates')
    .then(resp => resp.json())
    .then(resp => { this.setState({
      loading: false,
      palates: resp
    })})
}

  render() {
    const ps = this.state.palates
    const palates = ps.length ? ps.map((p,i) => <div key={'d' + i} className={'main-palate-item-wrapper'}><Link key={'k' + i} to={`/palates/${p.id}`}><Palate key={i} svg={p.data.copy.join('')}/></Link><p>Created by {p.creator}</p></div>) : null
    return (
      <div className={'main-palates-wrapper'}>
        <HowItWorks />
        { this.state.loading ? <div style={{gridRow: '1/2', gridColumn: '2/3'}}>{loading()}</div> : palates }
      </div>
    )
  }
}

export default Palates
