import React from 'react';
import { connect } from 'react-redux';
import ColorItemComp from '../main/ColorItemComp'

const ColorTabs = (props) => {

  const colors = props.colors.length ? props.colors.map((c,i) => <ColorItemComp key={i} color={c}/>) : null

  return (
    <div>
      { props.colors.length ? <h1>Selected Colors</h1> : null }
      {colors}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    colors: state.uploader.colorContainer
  }
}

export default connect(mapStateToProps)(ColorTabs)
