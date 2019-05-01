import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Palettizer from '../../modules/Palettizer';
import Loader from '../../modules/Loader';
import HowItWorks from '../modules/HowItWorks';
import * as api from '../../../../utils/api';
import './style.scss';

export default class AllPalettes extends Component {
  state = {
    loading: false,
    palates: []
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    api.getAllPalates().then(resp => {
      this.setState({
        loading: false,
        palates: resp
      });
    });
  };

  render() {
    const { palates, loading } = this.state;
    if (loading) {
      return (
        <div style={{ gridRow: '1/2', gridColumn: '2/3', textAlign: 'center' }}>
          <p>Please hold on a sec while my free server space wakes up.</p>
          <p>I promise everything is pretty zippy once the server gets going!</p>
          <Loader />
        </div>
      );
    } else if (!palates.length) {
      return (
        <p>
          {' '}
          no one has added any palettes!{' '}
          <span role="img" aria-label="crying face">
            😭
          </span>
        </p>
      );
    } else {
      const paletteTiles = palates.map((p, i) => (
        <div key={'d' + i}>
          <Link to={'/palates/' + p.id}>
            <Palettizer svg={p.data.copy.join('')} />
          </Link>
          <p>Created by {p.creator}</p>
        </div>
      ));
      return (
        <Fragment>
          <HowItWorks />
          <div className={'all-palettes__wrapper'}>
            {paletteTiles}
          </div>
        </Fragment>
      );
    }
  }
}
