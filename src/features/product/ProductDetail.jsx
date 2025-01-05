import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, Card, IconButton, Typography } from '@material-tailwind/react';
import { useGetSingleProductQuery } from './productApi';
import { base } from '../../app/apiUrl';
import { useDispatch, useSelector } from 'react-redux';
import { setToCarts } from '../carts/cartSlice';
import AddReview from '../review/AddReview';
import ReviewList from '../review/ReviewList';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const { data, isLoading, isError, error } = useGetSingleProductQuery(id);
  if (isLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <>
      <div className='grid grid-cols-3 p-4 items-center gap-10'>

        <div className="image">
          <img className='w-full' src={`${base}${data.image}`} alt="" />
        </div>
        <div className="info space-y-3">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <p>Rs.{data.price}</p>
        </div>

        {data && <AddCart product={data} />}
      </div>

      {user && <AddReview id={data._id} />}
      <ReviewList id={data._id} />








    </>
  )
}

export default ProductDetail








export const AddCart = ({ product }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const { carts } = useSelector((state) => state.cartSlice);
  const isExist = carts.find((cart) => cart.id === product.id);
  const [qty, setQty] = useState(isExist?.qty || 1);

  const addQty = () => {
    setQty((prev) => prev + 1);
  }

  const removeQty = () => {
    setQty((prev) => prev - 1);
  }


  // const p = {
  //   a: 9,
  //   b: 10
  // };

  // const m = {...p, l:'90'};


  const handleSubmit = () => {
    dispatch(setToCarts({
      ...product,
      qty: qty
    }));
    nav('/cart-page')
  }

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>

            <th

              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Product Name
              </Typography>
            </th>
            <th

              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {product.title}
              </Typography>
            </th>

          </tr>

          <tr>
            <th
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Qty
              </Typography>
            </th>
            <th
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <div className='flex gap-2'>
                <IconButton onClick={removeQty} disabled={qty === 1} size='sm'>
                  <i className="fas fa-minus" />
                </IconButton>
                <h1>{qty}</h1>
                <IconButton onClick={addQty} size='sm'>
                  <i className="fas fa-add" />
                </IconButton>

              </div>
            </th>

          </tr>

        </thead>



      </table>
      <div className='flex justify-center pt-7'>
        <Button disabled={user?.isAdmin || !user} onClick={handleSubmit}>Add To Cart</Button>
      </div>
    </Card>
  )
}