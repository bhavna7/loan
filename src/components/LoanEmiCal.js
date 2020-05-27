import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import '../App.css';

class LoanEmiCal extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loanProducts: [],

      showAlert: false,
      alertText: '',
    }
  }

  componentDidMount() {
    fetch('https:////prr7fx7sh0.execute-api.ap-south-1.amazonaws.com/dev/pten/products')
    .then((data) => {
      data.json().then((finalData) => {
        if (finalData && finalData.length) {
          this.setState({
            loanProducts: finalData
          });
        }
      })
      .catch(() => {
        this.setState({
          showAlert: true,
          alertText: 'Error while converting the data to json format.'
        });
      });
    })
    .catch(() => {
      this.setState({
        showAlert: true,
        alertText: 'Error in retriving the data, please try after sometime.'
      });
    });
  }

  render() {
    return (
      <Container>
        {
          this.state.showAlert ? 
            <Alert variant="danger" 
              onClose={() => this.setState({
                showAlert: false,
                alertText: ''
              })} 
              dismissible
            >
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                {this.state.alertText}
              </p>
            </Alert>
          : null
        }

        <Row className="customRow mt-4rem">
          <Col sm="6">
            <Row>
              <Col sm="12" className="calculator">
                EMI Calculator
              </Col>

              <Col sm="12" class="cal-col-background">
                <Form>
                  <Form.Group controlId="formBasicRangeCustom">
                    <Form.Label>Range</Form.Label>
                    <Form.Control type="range" custom />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Col>

          <Col sm="6">
            Jain
          </Col>
        </Row>
      </Container>
    )
  }

}

export default LoanEmiCal;
