import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Palettizer from '../modules/Palettizer';
import Loader from '../modules/Loader';
import './style.scss';

export default class MyPalettes extends Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    palates: PropTypes.array,
    loading: PropTypes.bool
  };
  componentDidMount() {
    this.props.actions.getMyPalates();
  }

  render() {
    const { palates, loading } = this.props;
    if (loading) return <Loader />;
    if (!palates.length) {
      return (
        <p className='my-palettes__message'>
          You have no palettes.
          <br/>
          <br/>
          Go to &#34;Create New&#34; to add some!
        </p>
      );
    } else {
      const paletteTiles = palates.map((p, i) => (
        <Link key={i} to={`/palates/${p.id}`}>
          <Palettizer key={i} svg={p.data.copy.join('')} />
          <p>{p.data.title}</p>
        </Link>
      ));
      return (
				<div className='my-palettes__wrapper'>
					{paletteTiles}
				</div>
			);
    }
  }
}
