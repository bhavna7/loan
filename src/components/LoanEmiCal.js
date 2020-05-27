import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

class LoanEmiCal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Container>
        <Row className="customRow mt-4rem">
          <Col sm="6">
            <Row>
              <Col sm="12" className="calculator">
                EMI Calculator
              </Col>
              

              <Col sm="12" className="cal-col-background">
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