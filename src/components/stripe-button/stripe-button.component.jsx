import React from 'react'

import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_sY23Q1rjLUDi2RG6P3JmRO6z00iqoiqlrq";


    const onToken = token => {
        console.log(token)
    }
    return (
        <StripeCheckout 
            label='Pay now'
            name='Pro app'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay nows'
            token={onToken}
            stripeKey={publishableKey}
        />
    )

}

export default StripeCheckoutButton;