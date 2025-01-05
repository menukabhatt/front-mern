import { Button, Rating, Textarea, Typography } from '@material-tailwind/react'
import { useFormik } from 'formik'
import React from 'react'
import { useAddReviewMutation } from './reviewApi'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AddReview = ({ id }) => {
  const [addReview, { isLoading }] = useAddReviewMutation();
  const { user } = useSelector((state) => state.userSlice);
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      rating: 0,
      comment: ''
    },
    onSubmit: async (val, { resetForm }) => {
      try {
        await addReview({
          body: {
            ...val,
            product: id
          },
          token: user.token,

        }).unwrap();
        resetForm();
        toast.success('Review added successfully')
      } catch (err) {
        toast.error(err.data?.message)
      }

    }
  });
  return (
    <div className='space-y-2 p-5 max-w-[400px]'>

      <Typography variant='h4'>Add Comment</Typography>

      <form onSubmit={handleSubmit} className='space-y-3'>
        <Rating
          value={values.rating}
          onChange={(val) => setFieldValue('rating', val)}
        />
        <Textarea
          name='comment'
          onChange={handleChange}
          value={values.comment}
          label="Review" />
        <Button loading={isLoading} type='submit' size='sm'>Submit</Button>
      </form>

    </div>
  )
}

export default AddReview
