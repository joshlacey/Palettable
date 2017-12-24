import React from 'react';
import Palate from './Palate';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMyPalates } from '../../actions/userServices';
import { loading } from '../../helpers/loader.js';

import '../../index.css'


class MyPalates extends React.Component {

componentDidMount = () => {
  this.props.getMyPalates()
}

  render() {
    const ps = this.props.palates
    const palates = ps.length ? ps.map((p,i) => <Link key={i} to={`/palates/${p.id}`}><Palate key={i} svg={p.data.copy.join('')}/><p style={{color: '#ccc'}}>{p.data.title}</p></Link>) : null
    const newUser = !this.props.palates.length
    return (
      <div className={'main-palates-wrapper'}>
      { this.props.loading ? loading() : palates }
      { (!this.props.loading && newUser) ? <p style={{gridColumn: '2/3'}}>You have no palettes</p> : ''}
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
