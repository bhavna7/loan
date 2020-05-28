import React from 'react';
import Select from 'react-select';

import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card'

import LoanEmiCal from './LoanEmiCal';
import '../App.css';

class LoanProducts extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      productsRecieved: [],
      selectedProduct: null,

      showAlert: false,
      alertText: '',
    }
  }

  componentDidMount() {
    fetch('https:////prr7fx7sh0.execute-api.ap-south-1.amazonaws.com/dev/pten/products')
    .then((data) => {
      data.json().then((finalData) => {
        if (finalData && finalData.length) {
          const products = this.getProductOptions(finalData);
          this.setState({
            productsRecieved: products
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

  getProductOptions(dataRecieved) {
    let options = [];
    dataRecieved.forEach((data) => {
      const obj = {
        label: data.id,
        value: data.id,
        product: data
      };
      options.push(obj)
    });
    return options;
  }

  handleSelectChanges(e) {
    this.setState({
      selectedProduct: null

    }, () => {
      this.setState({
        selectedProduct: e
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

        {
          this.state.productsRecieved && this.state.productsRecieved.length ?
            <div>
              <Card>
                <Card.Header className="header">
                  <h4>Welcome, to Perk Finance</h4>
                </Card.Header>

                <Card.Body className="text">
                  <div>
                    Please select a product from the product list given below, for which you 
                    would like to take the loan.
                  </div>

                  <div className="mt-1rem">
                    <Select
                      options={this.state.productsRecieved}
                      value={this.state.selectedProduct}
                      onChange={this.handleSelectChanges.bind(this)}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          : null
        }

        {
          this.state.selectedProduct && this.state.selectedProduct.label ?
            <LoanEmiCal product={this.state.selectedProduct}/>
          : null
        }

      </Container>
    )
  }

}

export default LoanProducts;
