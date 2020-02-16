import React from 'react';

import { CartItemStyles, ItemDetailsStyles, NameStyle, PriceStyle, ImageStyle} from './cart-item.styles'
const CartItem = ({ item : { imageUrl, price, name, quantity}}) => (
    <CartItemStyles>
        <ImageStyle src={imageUrl} alt='item'/>
        <ItemDetailsStyles>
            <NameStyle>{name}</NameStyle>
            <PriceStyle >
                
{quantity} x ${price}</PriceStyle>
        </ItemDetailsStyles>
    </CartItemStyles>
)

export default CartItem;