import { connect } from 'react-redux';
import ColorTabs from './ColorTabs.component';

function mapStateToProps (state) {
	const { paletteColorsUsedTracker } = state.uiReducer;
	return {
		colors: paletteColorsUsedTracker
	};
}

export default connect(mapStateToProps)(ColorTabs);
