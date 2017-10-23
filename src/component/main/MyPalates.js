import React from 'react';
import Palate from './Palate'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMyPalates } from '../../actions/userServices'

class MyPalates extends React.Component {

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
  this.props.getMyPalates()
}

  render() {
    const styling = {display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}
    const ps = this.props.palates
    const palates = ps.length ? ps.map((p,i) => <Link key={i} to={`/palates/${p.id}`}><Palate key={i} svg={p.data.copy.join('')}/></Link>) : null
    return (
      <div style={styling}>
      { this.props.loading ? this.loading() : palates }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    updateAfterDelete: state.user.updateAfterDelete,
    palates: state.user.palates,
    loading: state.user.loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getMyPalates: () => {
      dispatch(getMyPalates())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPalates)
