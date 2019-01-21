/*global alert, window */
import React, { Component } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Snap from 'snapsvg-cjs';
import * as api from '../../../../utils/api';
import * as utils from '../../../../utils/helpers';
import { start, move, stop } from '../../../../snap/dragCallbacks.js';
import NoteForm from '../../modules/NoteForm';
import ColorItem from '../../modules/ColorItem';
import './style.scss';

export default class PaletteComponent extends Component {
  static propTypes = {
    location: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func),
    note: PropTypes.string,
    title: PropTypes.string
  }
  state = {
    loading: false,
    palate: [],
    html: '',
    colors: []
  };

  componentDidMount = () => {
    this.setState({
      loading: true
    });

    const path = this.props.location.pathname.slice(1);
    api.getPalate(path)
      .then(resp => {
        const html = resp.data.copy.join('');
        const cleaned = html.replace(/style=""/g, '');
        const content = Parser(cleaned);
        this.setState({
          loading: false,
          palate: content.length ? content : [content],
          html: resp.data.copy.join(''),
          title: resp.data.title,
          note: resp.data.note,
          creator: resp.creator,
          colors: resp.data.colors.split(',')
        });
        window.scrollTo(0,175);
      });
  };

  componentDidUpdate = () => {
    if (this.state.palate.length) {
      this.state.palate.forEach(i => {
        const element = Snap(`#${i.props.id}`);
        const circle = element
          .children()
          .find(c => !c.type.match(/desc|defs/g) && c.children().length);
        circle.drag(move, start, stop);
      });
    }
  };

  handleClick = event => {
    const id = event.target.baseURI.split('/palates/')[1];
    this.props.actions.deletePalate(id);
    alert('Palette Deleted');
  };

  updateInfo = event => {
    const id = event.target.baseURI.split('/palates/')[1];
    const { title, note } = this.props;
    this.setState({ title, note });
    this.props.actions.editPalate(title, note, id);
  };

  render() {
    const currentUser = utils.getUserName();
    const { colors, palate, title, note, creator } = this.state;
    const createdBy = creator !== currentUser
      ? `created by: ${creator}`
      : 'created by you';
    const palateColors = colors.length
      ? colors.map((color, i) => (
          <ColorItem key={i + color} color={color} />
        ))
      : null;
    return (
      <div className='palette__wrapper'>
        <svg width={'400px'} height={'400px'} id={'rePalate'}>
          {palate}
        </svg>
        <p>
          {createdBy}
        </p>
        <h1>{title}</h1>
        <p>{note}</p>
        {palateColors}
        <br />
        <br />
        {!title && creator === currentUser ? (
          <div>
            <NoteForm />
            <button className={'nice-button'} onClick={this.updateInfo}>
              Update
            </button>
          </div>
        ) : null}
        <br />
        <br />
        {(creator === currentUser) && (
          <Link to={`/${currentUser}/palates`}>
            <button
              className={'mean-button'}
              onClick={this.handleClick}
            >
              Delete Your Palate
            </button>
          </Link>
        )}
      </div>
    );
  }
}
