import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal'

const Cart = () => {
    const { cartItems, products, currency, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];

        for (const itemId in cartItems) {
            const productData = products.find((product) => product._id === itemId);
            if (productData) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        tempData.push({
                            _id: itemId,
                            size: size,
                            quantity: cartItems[itemId][size],
                            image: productData.image[0],
                            name: productData.name,
                            price: productData.price,
                            totalPrice: productData.price * cartItems[itemId][size]
                        });
                    }
                }
            }
        }
        setCartData(tempData);
    }, [cartItems, products]);

    const handleQuantityChange = (itemId, size, value) => {
        if (value === '' || value === '0') return;
        const quantity = Number(value);
        if (quantity > 0) {
            updateQuantity(itemId, size, quantity);
        }
    };

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div>
                {cartData.map((item, index) => (
                    <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                        <div className='flex items-start gap-6'>
                            <img src={item.image} alt="" className='w-16 sm:w-20' />
                            <div>
                                <p className='text-xs sm:text-lg font-medium'>{item.name}</p>
                                <div className='flex items-center gap-5 mt-2'>
                                    <p>{currency}{item.totalPrice.toFixed(2)}</p>
                                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                </div>
                                <p className='text-sm text-gray-500 mt-1'>Price per item: {currency}{item.price}</p>
                            </div>
                        </div>
                        <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
                            className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                        />
                        <img
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            src={assets.bin_icon}
                            className='w-4 mr-4 sm:w-5 cursor-pointer'
                            alt="Remove item"
                        />
                    </div>
                ))}
            </div>

            {/* total product amount */}

            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div onClick={() => navigate('/place-order')} className='w-full text-end'>
                        <button className='bg-black text-white text-sm my-8 px-8 py-3'>PROCCED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
