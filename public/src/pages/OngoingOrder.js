import React from 'react';
import axios from 'axios';
import Layout from 'Layout';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'

class OngoingOrder extends React.Component {

    headers = ['Product Name', 'Price', 'Quantity', 'Total']
    state = {
        order: []
    }

    async componentDidMount() {
        // Get user's phone number
        const user = global.auth.getUser();
        const { phoneNumber } = user;
        // post to server side and get the ongoing order
        await axios.post("api/orders/getOngoing", { phone: phoneNumber }).then(res => {
            this.setState({
                order: res.data
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <Layout>
                <div className="allorders" data-test="ongoing">
                            {
                                this.state.order.length > 0 ? (
                                    this.state.order.map(order => {
                                        return (
                                            <Accordion defaultActiveKey="0">
                                                <Card>
                                                    <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                            Order - {order.stripeToken.substring(4)}
                                                        </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="0">
                                                        <Card.Body variant="link">
                                                            <table className="table is-fullwidth">
                                                                <thead>
                                                                    <tr>
                                                                        {this.headers.map(head => <th data-test="ongoing-thead">{head}</th>)}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        order.products.map(product => {
                                                                            return (
                                                                                <tr data-test="ongoing-data">
                                                                                    <td key={product.name}>{product.name}</td>
                                                                                    <td key={product.price}>{product.price}</td>
                                                                                    <td key={product.quantity}>{product.quantity}</td>
                                                                                    <td key={parseFloat(product.price) * parseInt(product.quantity)}>{parseFloat(product.price) * parseInt(product.quantity)}</td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card> 
                                            </Accordion>                                     
                                        )
                                    })
                                ) : (
                                    <div data-test="no-ongoing">
                                        <p className="title has-text-centered">No Ongoing Order</p>
                                    </div>
                                )
                            }
                        
                </div>
                 
            </Layout>
        )
    }
}

export default OngoingOrder;