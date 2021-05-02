import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
      mark10Th:'',
      mark12Th:'',
      mediumOfStudy:'',
      boardOfStudy:'',
     interestedCourse:''
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name,gender, age,mark10Th,mark12Th,mediumOfStudy,boardOfStudy,interestedCourse} = steps;

    this.setState({ name,gender, age,mark10Th,mark12Th,mediumOfStudy,boardOfStudy,interestedCourse });
  }

  render() {
    const { name,gender, age,mark10Th,mark12Th,mediumOfStudy,boardOfStudy,interestedCourse } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
            <tr>
              <td>10th Mark</td>
              <td>{mark10Th.value}</td>
            </tr>
            <tr>
              <td>12th Mark</td>
              <td>{mark12Th.value}</td>
            </tr>
            <tr>
              <td>Medium of Study</td>
              <td>{mediumOfStudy.value}</td>
            </tr>
            <tr>
              <td>Board of Study</td>
              <td>{boardOfStudy
              .value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! What is your gender?',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'male', label: 'Male', trigger: '5' },
              { value: 'female', label: 'Female', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'How old are you?',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: 'ageDisp',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 15) {
                return 'Your Still not finished 10th';
              } else if (value > 20) {
                return `${value}? Not an student!`;
              }
              
              return true;
            },
          },
          {
            id: 'ageDisp',
            message: 'Your are student with age of {previousValue}!',
            trigger: '7',
          },
          {
            id: '7',
            message: 'Enter 10th mark out of 500',
            trigger: 'mark10Th',
          },
          {
            id: 'mark10Th',
            user: true,
            trigger: 'boardOfStudy',
            validator: (value) => {
                if (isNaN(value)) {
                  return 'value must be a number';
                } else if (value < 0) {
                  return 'value must be positive';
                } else if (100 < value  && value> 500) {
                  return `${value}? Enter Valid Mark!`;
                }
  
                return true;
              },
            },
            {
                id: 'boardOfStudy',
                options: [
                    { value: 'CBSE', label: 'CBSE', trigger: '9' },
                    { value: 'State Board', label: 'State Board', trigger: '9' },
                    { value: 'ICSE', label: 'ICSE', trigger: '9' },
                ],
            },
          {
            id: '9',
            message: 'Enter 12th mark out of 600',
            trigger: 'mark12Th',
           },
              {
                id: 'mark12Th',
                user: true,
                trigger: '11',
                validator: (value) => {
                    if (isNaN(value)) {
                      return 'value must be a number';
                    } else if (value < 0) {
                      return 'value must be positive';
                    } else if (100 < value  && value> 600) {
                      return `${value}? Enter Valid Mark!`;
                    }
      
                    return true;
                  },
                },
        {
                id: '11',
                message: 'Medium of Study',
                trigger: 'mediumOfStudy',
            },
            {
                id: 'mediumOfStudy',
                options: [
                    { value: 'Tamil', label: 'Tamil', trigger: '13' },
                    { value: 'English', label: 'English', trigger: '13' },
                ],
            },
            {
                id: '13',
                message: 'Board of Study',
                trigger: 'review',
            },
            {
            id: 'review',
            component: <Review />,
            asMessage: true,
            end: true,
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'gender', label: 'Gender', trigger: 'update-gender' },
              { value: 'age', label: 'Age', trigger: 'update-age' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-gender',
            update: 'gender',
            trigger: '7',
          },
          {
            id: 'update-age',
            update: 'age',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
        ]}
      />
    );
  }
}

export default SimpleForm;

