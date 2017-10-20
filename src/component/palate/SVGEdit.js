import React from 'react';
import SVGContainer from './SVGContainer';
import ImageUploader from '../uploader/ImageUploader';
import ColorsContainer from '../uploader/ColorsContainer';
import NoteForm from '../notes/NoteForm'

class EditContainer extends React.Component {

  render () {
    const styling = {padding: '2em', display: 'grid', gridTemplateColumns: '2fr 1fr', gridGap: '1em'}
    return (
      <div style={styling}>
        <SVGContainer />
        <div>
          <ImageUploader />
          <p style={{fontSize: '70%'}}>google image: https://wallpaperscraft.com/image/google_search_logo_summer_drawing_26168_602x339.jpg</p>
          <ColorsContainer />
          <NoteForm />
        </div>
      </div>
    )
  }
}

export default EditContainer
