import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Option,
  Select,
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { base } from "../../app/apiUrl";
import { useUpdateProductMutation } from "./productApi";
const productSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required(),
  brand: Yup.string().required(),
  category: Yup.string().required(),
  // image: Yup.mixed().required().test('fileType', 'invalid image', (e) => {
  //   return ['image/jpg', 'image/png', 'image/jpeg'].includes(e.type);
  // })
});


const ProductEditForm = ({ data }) => {

  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();



  const { values, handleChange,
    handleSubmit, errors, setFieldValue, touched } = useFormik({

      initialValues: {

        title: data.title,
        description: data.description,
        price: data.price,
        brand: data.brand,
        category: data.category,
        image: null,
        imageReview: data.image



      },

      onSubmit: async (val, { resetForm }) => {
        const formData = new FormData();
        formData.append('title', val.title);
        formData.append('description', val.description);
        formData.append('price', val.price);
        formData.append('brand', val.brand);
        formData.append('category', val.category);


        try {
          if (val.image === null) {
            await updateProduct({
              body: formData,
              token: user.token,
              id: data._id
            }).unwrap();
            toast.success('update success');
          } else {
            formData.append('image', val.image);
            await updateProduct({
              body: formData,
              token: user.token,
              id: data._id
            }).unwrap();
            toast.success('update success');

          }

          nav(-1);

        } catch (err) {
          toast.error(`${err.data?.message}`)
        }

      },
      validationSchema: productSchema

    });


  return (
    <Card color="transparent" shadow={false} className="max-w-sm  mx-auto mt-4 mb-4">
      <Typography variant="h4" color="blue-gray">
        Edit Product
      </Typography>

      <form onSubmit={handleSubmit} className="mt-2">
        <div className="mb-1 flex flex-col gap-3 space-y-2">

          <Input
            size="lg"
            placeholder="product_name"
            label="product_name"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title && touched.title && <h1 className='text-pink-700'>{errors.title}</h1>}

          <Input
            size="lg"
            placeholder="product_price"
            label="product_price"
            name="price"
            value={values.price}
            onChange={handleChange}
          />
          {errors.price && touched.price && <h1 className='text-pink-700'>{errors.price}</h1>}

          <Select value={values.brand} onChange={(e) => setFieldValue('brand', e)} label="Select Brand">
            <Option value="addidas">Addidas</Option>
            <Option value="nike">Nike</Option>
            <Option value="puma">Puma</Option>
            <Option value="reebok">Reebok</Option>
            <Option value="Brand 1">Brand 1</Option>
          </Select>
          <Select value={values.category} onChange={(e) => setFieldValue('category', e)} label="Select Category">

            <Option value="Clothing">Clothes</Option>
            <Option value="shoes">Shoes</Option>
            <Option value="accessories">Accessories</Option>
            <Option value="tech">Tech</Option>
          </Select>

          <Textarea
            size="lg"
            placeholder="product_detail"
            label="product_detail"
            name="description"
            value={values.description}
            onChange={handleChange}
          />


          <div className='space-y-2'>
            <h1>Select An Image</h1>

            <Input
              label="Image File"
              onChange={(e) => {
                const file = e.target.files[0];
                setFieldValue('imageReview', URL.createObjectURL(file))
                setFieldValue('image', file);
              }}
              type='file'
              name='image'
              multiple
              accept='image/*'
            />
            {errors.image && touched.image && <h1 className='text-pink-700'>{errors.image}</h1>}

            {values.imageReview && <img src={values.image === null ? `${base}${values.imageReview}` : values.imageReview} alt="" />}
          </div>


        </div>

        <Button loading={isLoading} type="submit" className="mt-6" fullWidth>
          Submit
        </Button>

      </form>
    </Card>
  )
}
export default ProductEditForm