import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../App.css';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class LoanEmiCal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: this.props.product && this.props.product.product ? this.props.product.product : {},
      timeRanges: this.props.timeRange && this.props.timeRange.length ? this.props.timeRange : [],

      selectedAmount: 0,
      selectedTime: 0
    }
  }

  handleSliderChanges(e) {
    this.setState({
      selectedAmount: e
    });
  }

  monthSelected(time, e){
    this.setState({
      selectedTime: time
    });
  }

  render() {
    return (
      <Container className="pad-0px">
        <Row className="customRow mt-4rem">
          <Col sm="12" className="cal-col-background">
            <Row>
              <Col sm="12" className="calculator">
                EMI Calculator
              </Col>

              <Col sm="12" className="mt-1rem">
                <Col sm="12">
                  <h2>
                    <b className="loan-amt">
                      Upto {this.state.productDetails.amount}
                      <span>&#8377;</span>
                      <span className="question" style={{marginTop: '0rem'}}>&#63;</span> 
                    </b>
                  </h2>
                  <p className="loan-sub-head">ELIGIBLE LOAN AMOUNT</p>
                </Col>

                <Col sm="12" className="mt-2rem">
                  <p className="sub-head">
                    SELECT ADVANCE AMOUNT
                    <span className="sub-head">
                      <b className="selected-amt">
                        <span>&#8377;</span>
                        { this.state.selectedAmount }
                      </b>
                    </span>
                  </p>

                  <div className="mb-1rem">
                    <Slider 
                      min={ 0 }
                      max={ this.state.productDetails.amount }
                      handle={ handle }
                      step={ 1 }
                      onChange={this.handleSliderChanges.bind(this)}
                    />
                  </div>
                </Col>

                {
                  this.state.selectedAmount != 0 ?
                    <Col sm="12" className="mt-2rem mb-1rem">
                      <p className="sub-head">
                        LOAN DURATION
                      </p>
                    </Col>
                  : null
                }

                {
                  this.state.selectedAmount != 0 ? 
                    <Col sm="12" className="mb-1rem">
                      {
                        this.state.timeRanges && this.state.timeRanges.length ?
                          this.state.timeRanges.map((time, index) => {
                            return(
                              <Button 
                                variant="outline-info" 
                                className="mr-0-7rem" 
                                key={index+'___Random'}
                                onClick={this.monthSelected.bind(this, time)}
                              >
                                {time} MONTHS
                              </Button>
                            )
                          })
                        : null
                      }
                    </Col>
                  : null
                }
                
                {
                  this.state.selectedTime !== 0 ?
                    <Col sm="12" className="mt-4rem">
                      <p className="loan-sub-head">CALCULATED EMI</p>
                      <h2 style={{ marginTop: '-1rem' }}>
                        <b className="loan-amt">
                          <span>&#8377;</span>
                          {this.state.productDetails.emiAmount}
                          <span className="question">&#63;</span> 
                        </b>
                      </h2>
                    </Col>
                  : null
                }
              </Col>
            </Row>
          </Col>

        </Row>
      </Container>
    )
  }
}

export default LoanEmiCal;