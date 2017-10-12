import React from 'react';
import Palete from './Palete'


class Paletes extends React.Component {

state={
  loading:false,
  paletes: []
}

loading = () => {
  return(
    <svg width="48" height="48" viewBox="0 0 300 300">
      <path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#76f19a">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" begin="0s" dur=".5s" fill="freeze" repeatCount="indefinite"></animateTransform>
      </path>
    </svg>
  )
}

componentDidMount = () => {
  this.setState({loading: true})
  fetch(process.env.REACT_APP_API_ENDPOINT + 'paletes')
    .then(resp => resp.json())
    .then(resp => this.setState({
      loading: false,
      paletes: resp
    }))
}



  render() {
    const paletes = this.state.paletes.length ? this.state.paletes.map(p => <Palete svg={p}/>) : null
    return (
      <div>
      { this.state.loading ? this.loading() : paletes }
      </div>
    )
  }
}

export default Paletes
