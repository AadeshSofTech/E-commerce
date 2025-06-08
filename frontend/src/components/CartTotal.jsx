import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const CartTotal = () => {
    const { cartItems, products, currency } = useContext(ShopContext);

    const calculateSubtotal = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (product) {
                for (const size in cartItems[itemId]) {
                    total += product.price * cartItems[itemId][size];
                }
            }
        }
        return total;
    };

    const subtotal = calculateSubtotal();
    const shipping = 10;
    const total = subtotal + shipping;

    return (
        <div className='bg-slate-50 p-8'>
            <h2 className='text-xl font-medium mb-6'>Cart Total</h2>
            
            <div className='flex flex-col gap-3'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{subtotal.toFixed(2)}</p>
                </div>
                
                <div className='flex justify-between'>
                    <p>Shipping</p>
                    <p>{currency}{shipping.toFixed(2)}</p>
                </div>
                
                <div className='flex justify-between font-medium border-t pt-3 mt-3'>
                    <p>Total</p>
                    <p>{currency}{total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal 