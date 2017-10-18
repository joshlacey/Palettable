import React from 'react';
import Palate from './Palate'
import { Link } from 'react-router-dom'


class Palates extends React.Component {

state={
  loading:false,
  palates: []
}

loading = () => {
  return(
      <svg width="48" height="48" viewBox="0 0 300 300">
        <path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#ccc">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" begin="0s" dur=".5s" fill="freeze" repeatCount="indefinite"></animateTransform>
        </path>
      </svg>
  )
}

componentDidMount = () => {
  this.setState({loading: true})
  fetch(process.env.REACT_APP_API_ENDPOINT + 'palates')
    .then(resp => resp.json())
    .then(resp => { console.log(resp); this.setState({
      loading: false,
      palates: resp
    })})
}

  render() {
    const styling = {display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}
    const ps = this.state.palates
    const palates = ps.length ? ps.map((p,i) => <Link key={i} to={`/palates/${p.id}`}><Palate key={i} svg={p.data.copy.join('')}/></Link>) : null
    return (
      <div style={styling}>
      { this.state.loading ? this.loading() : palates }
      </div>
    )
  }
}

export default Palates
