import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

const CLIENT = {
    sandbox:
        "AW_ycS9YR9CTcnR-_GNXkYiIqQ_UhC9R4f8GUJ9Cu96sfkBJofg1YGLgRU5wbcgEO3pmQ9A_HxDycath",
    production:
        "your_production_key"
};

const CLIENT_ID =
    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButtons = null;

//참고 사이트(베껴옴): https://medium.com/@bolajifemi28/how-to-add-paypal-checkout-to-your-react-app-37d44c58a896
class PaypalButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showButtons: false,
            loading: true,
            paid: false
        };

        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidMount() {
        const {isScriptLoaded, isScriptLoadSucceed} = this.props;

        if (isScriptLoaded && isScriptLoadSucceed) {
            PayPalButtons = window.paypal.Buttons.driver("react", {React, ReactDOM});
            this.setState({loading: false, showButtons: true});
        }
    }

    componentWillReceiveProps(nextProps) {
        const {isScriptLoaded, isScriptLoadSucceed} = nextProps;

        const scriptJustLoaded =
            !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

        if (scriptJustLoaded) {
            if (isScriptLoadSucceed) {
                PayPalButtons = window.paypal.Buttons.driver("react", {
                    React,
                    ReactDOM
                });
                this.setState({loading: false, showButtons: true});
            }
        }
    }

    createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: +"Mercedes G-Wagon",
                    amount: {
                        currency_code: "USD",
                        value: 0.01  //가격정보
                    }
                }
            ]
        });
    };

    onApprove = (data, actions) => {
        actions.order.capture().then(details => {
            const paymentData = {
                payerID: data.payerID,
                orderID: data.orderID
            };
            console.log('details ' + details);
            console.log("Payment Approved: ", paymentData);
            this.setState({showButtons: false, paid: true});
        });
    };

    render() {
        const {showButtons, loading, paid} = this.state;

        return (
            <div className="main">
                {loading}

                {showButtons && (
                    <div>
                        <div>
                            <h2>Items: Mercedes G-Wagon</h2>
                            <h2>Total checkout Amount $200</h2>
                        </div>

                        <PayPalButtons
                            createOrdder={(data, actions) => this.createOrder(data, actions)}
                            onApprove={(data, actions) => this.onApprove(data, actions)}
                        />
                    </div>
                )}

                {paid && (
                    <div className="main">
                        <h2>
                            Congrats! you just paid for that picture. Work a little harder and
                            you'll be able to afford the car itself{" "}
                            <span role="img" aria-label="emoji">
                {" "}
                                😉</span>
                        </h2>
                    </div>
                )}
            </div>
        );
    }
}


export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${"AW_ycS9YR9CTcnR-_GNXkYiIqQ_UhC9R4f8GUJ9Cu96sfkBJofg1YGLgRU5wbcgEO3pmQ9A_HxDycath"}`)(PaypalButton);