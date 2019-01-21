import React from 'react';
//global modules
import NoteForm from '../modules/NoteForm';
//local modules
import SVGContainer from './modules/SVGContainer';
import ColorTabs from './modules/ColorTabs';
import ColorsContainer from './modules/ColorsContainer';
import './style.scss';

export default function EditPaletteContainer() {
  return (
    <div className={'svg-edit'}>
      <SVGContainer />
      <ColorsContainer />
      <NoteForm />
      <ColorTabs />
    </div>
  );
}
