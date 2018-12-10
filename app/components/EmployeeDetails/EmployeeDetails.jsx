import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEmployeeData, clearEmployeeDataAction } from '../../redux/actions';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import './EmployeeDetails.scss';

const department = [
  {
  key: 'hr',
  text: 'HR'
  },
  {
    key: 'engineering',
    text: 'ENGENEERING'
  }
];

const employeeId = [
  {
    key: 1,
    text: '1',
    filterKey: 'hr'
  },
  {
    key: 2,
    text: '2',
    filterKey: 'hr'
  },
  {
    key: 3,
    text: '3',
    filterKey: 'hr'
  },
  {
    key: 4,
    text: '4',
    filterKey: 'hr'
  },
  {
    key: 5,
    text: '5',
    filterKey: 'hr'
  },
  {
    key: 6,
    text: '6',
    filterKey: 'engineering'
  },
  {
    key: 7,
    text: '7',
    filterKey: 'engineering'
  },
  {
    key: 8,
    text: '8',
    filterKey: 'engineering'
  },{
    key: 9,
    text: '9',
    filterKey: 'engineering'
  },
  {
    key: 10,
    text: '10',
    filterKey: 'engineering'
  }
]

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.changeEmployeeId = React.createRef();
    this.state = {
      departmentEmployeeId: [],
      isLoading: false,
      isError: false,
      departmentSelectedKey: '',
      employeeData: {}
    };
  }

  changeDepartment = (e, selected) => {
    const departmentEmployeeId = employeeId.filter((el) => el.filterKey === selected.key);
    this.setState({
      departmentEmployeeId,
      departmentSelectedKey: selected.key
    });
  }

  getDetails = () => {
    const index = this.changeEmployeeId.current.state.selectedIndices;
    if (!index.length) {
      this.setState({ isError: true });
      return;
    }
    const key = this.state.departmentEmployeeId[index].key;
    this.props.getEmployeeData({ url: `https://reqres.in/api/users/${key}` });
    this.setState({ isLoading: true });
  }

  clearForm = () => {
    this.setState({
      departmentEmployeeId: [],
      isLoading: false,
      isError: false,
      departmentSelectedKey: ''
    });
    this.changeEmployeeId.current.setState({
      selectedIndices: []
    });
    this.props.clearEmployeeDataAction();
  }

  renderEmployeeData = ({ data }) => {
    return (
      <div className="employee-details">
        <Image
          src={data.avatar}
          alt="User Avatar"
        />
        <Label>ID: {data.id}</Label>
        <Label>Name: {`${data.first_name} ${data.last_name}`} </Label>
      </div>
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.employeeData !== prevState.employeeData) {
      return ({ employeeData: nextProps.employeeData, isLoading: false }) // <- this is setState equivalent
    }
    return prevState;
  }

  render() {
    const { departmentSelectedKey } = this.state;
    return (
      <div className="App">
        <div className="form">
          <Dropdown
            label="Departments"
            placeholder="Select an Option"
            options={[...department]}
            selectedKey={departmentSelectedKey}
            className="width-150"
            onChange={this.changeDepartment}
          />
          <Dropdown
            label="Employee Id"
            placeholder="Select an Option"
            options={this.state.departmentEmployeeId}
            className="width-150"
            componentRef={this.changeEmployeeId}
          />
          <PrimaryButton
            text="Get Details"
            onClick={this.getDetails}
          />
          <DefaultButton
            text="Clear"
            onClick={this.clearForm}
          />
        </div>
        {this.state.employeeData.data && this.renderEmployeeData(this.state.employeeData)}
        {this.state.isLoading &&
          <div className="loading">
            <Spinner size={SpinnerSize.large} className="loading-spinner" />
          </div>
        }
        {this.state.isError &&
          <MessageBar messageBarType={MessageBarType.error} isMultiline={false} onDismiss={() => this.setState({ isError: false })} dismissButtonAriaLabel="Close">
            Please select Employee Id before proceeding further
          </MessageBar>
        }
      </div>
    );
  }
}

EmployeeDetails.propTypes = {
  employeeData: PropTypes.shape({})
}

const mapStateToProps = (state) => ({
  employeeData: state.employeeData
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getEmployeeData,
  clearEmployeeDataAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
