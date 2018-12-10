import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import EmployeeDetails from '../EmployeeDetails.jsx';

describe('<EmployeeDetails />', () => {
  it('should render the Employee Details component', () => {
    const wrapper = shallow(<EmployeeDetails />);
    expect(wrapper.find('.App')).toBeDefined();
    expect(wrapper.find('.width-150')).toBeDefined();
    expect(wrapper.find('button')).toBeDefined();
    console.log(wrapper.debug())
    wrapper.find('button').at(0).hostNodes().simulate('click');
  });
});
