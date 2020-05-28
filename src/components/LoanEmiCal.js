import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../App.css';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
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

const wrapperStyle = { width: 350 };
class LoanEmiCal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: this.props.product && this.props.product.product ? this.props.product.product : {}
    }
    console.log('this.state.productDetails: ', this.state.productDetails);
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
                    </b>
                  </h2>
                  <p className="loan-sub-head">ELIGIBLE LOAN AMOUNT</p>
                </Col>

                <Col sm="12" className="mt-2rem">
                  <p className="sub-head">
                    SELECT ADVANCE AMOUNT
                  </p>

                  <div className="mb-1rem">
                    <Slider 
                      min={ 0 }
                      max={ this.state.productDetails.amount }
                      handle={ handle }
                      step={ 1 }
                    />
                  </div>
                </Col>
              </Col>
            </Row>
          </Col>

        </Row>
      </Container>
    )
  }
}

export default LoanEmiCal;