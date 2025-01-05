import React from 'react'
import { useGetReviewQuery } from './reviewApi'
import { Avatar } from '@material-tailwind/react';

const ReviewList = ({ id }) => {
  const { isLoading, isError, error, data } = useGetReviewQuery(id);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className='max-w-[500px] space-y-4 p-5'>

      {data.map((review) => (
        <div className='p-3 space-y-4 shadow-xl' key={review._id}>
          <div className="flex items-center space-x-4">
            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
            <div>
              <h1>{review.user.username}</h1>
              <p>{review.comment}</p>
            </div>
          </div>
        </div>

      ))}

    </div>
  )
}

export default ReviewList
