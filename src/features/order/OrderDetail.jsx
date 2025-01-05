import React from 'react'
import { useParams } from 'react-router'
import { useGetOrderDetailQuery } from './orderApi';
import { useSelector } from 'react-redux';
import { OrderList } from './OrderList';

const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);

  const { data, isLoading, isError, error } = useGetOrderDetailQuery({
    token: user.token,
    id
  });



  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.data?.message}</div>;


  return (
    <div className='p-5'>
      {data && (
        <div className='space-y-4'>
          <h1 className='text-gray-600'>Order No:-{data._id}</h1>
          <OrderList products={data.products} />
          <h1>Total:-Rs.{data.total}</h1>
        </div>
      )
      }




    </div>
  )
}

export default OrderDetail
