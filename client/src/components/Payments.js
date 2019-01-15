import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
    render() {        
        return (
            <StripeCheckout 
                name="Emaily"
                description="$5 for 5 email credits"
                // defaults to USD and in cents
                amount={500}
                // expects a callback function, which will be called after receiving an 
                // authorization token from stripe
                token={ token => console.log(token)}
                stripeKey={ process.env.REACT_APP_STRIPE_KEY }
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        )
    }
}

export default Payments;