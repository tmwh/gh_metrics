import { connect } from 'react-redux';
import Metricx from '../components/Metricx';
import * as actions from '../actions/MetricsActionCreators';

const mapStateToProps = (state) => ({ name: state.name });

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, actions)(Metricx);
