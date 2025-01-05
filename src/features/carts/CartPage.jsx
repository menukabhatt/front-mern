import { Button, IconButton } from '@material-tailwind/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { base } from '../../app/apiUrl';
import { setToCarts, singleRemoveCart } from './cartSlice';
import { ConfirmCart } from './ConfirmCart';

const CartPage = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);





  const { carts } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const total = carts.reduce((a, b) => a + b.qty * b.price, 0);


  const addQty = (cart) => {
    dispatch(setToCarts({
      ...cart,
      qty: cart.qty + 1
    }));

  }

  const removeQty = (cart) => {
    if (cart.qty > 1) {
      dispatch(setToCarts({
        ...cart,
        qty: cart.qty - 1
      }));
    }

  }




  return (
    <div className='p-5'>
      {carts.length === 0 ? <h1>list is empty add some</h1> :
        <div>

          <div >
            {carts.map((cart, i) => {
              return <div className='grid grid-cols-4 gap-12' key={cart._id}>
                <img className='w-full h-36' src={`${base}${cart.image}`} alt="" />
                <div>
                  <div className='flex gap-2'>
                    <IconButton
                      onClick={() => removeQty(cart)}
                      size='sm'>
                      <i className="fas fa-minus" />
                    </IconButton>
                    <h1>{cart.qty}</h1>
                    <IconButton onClick={() => addQty(cart)} size='sm'>
                      <i className="fas fa-add" />
                    </IconButton>

                  </div>

                </div>
                <h1>Rs.{cart.price}</h1>
                <IconButton size='sm' onClick={() => dispatch(singleRemoveCart(i))}>
                  <i className="fas fa-trash" />
                </IconButton>
              </div>
            })}

          </div>

          <div className='flex justify-between'>
            <h1>Total</h1>
            <p>{total}</p>
          </div>
          <ConfirmCart total={total} carts={carts} />


        </div>}

    </div>
  )
}

export default CartPage