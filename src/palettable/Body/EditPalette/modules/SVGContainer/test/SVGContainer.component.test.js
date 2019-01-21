import React from 'react';
import { shallow } from 'enzyme';
import SVGContainer from '../SVGContainer.component';

describe('SVGContainer', () => {
  it('can shallow render', () => {
    const component = shallow(<SVGContainer />);
  })
})
