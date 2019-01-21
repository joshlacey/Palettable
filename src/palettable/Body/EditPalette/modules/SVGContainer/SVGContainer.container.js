import { connect } from 'react-redux';
import actions from '../../../../actions';
import { bindActionCreators } from 'redux';
import SVGContainer from './SVGContainer.component';

function mapStateToProps(state) {
  const { paletteColorsUsedTracker } = state.uiReducer;
  return {
    paletteColorsUsedTracker,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SVGContainer);
