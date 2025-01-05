import { useSelector } from "react-redux";
import { useGetUserQuery, useUpdateUserMutation } from "./authApi";
import { useFormik } from "formik";
import { Button, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { OrderTable } from "../order/OrderTable";

const UserProfile = () => {

  const { user } = useSelector((state) => state.userSlice);

  const { data, isLoading, isError, error } = useGetUserQuery(user.token);



  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className="p-5 grid grid-cols-3">

      <UserForm data={data} />
      <OrderTable />


    </div>
  )
}
export default UserProfile


const UserForm = ({ data }) => {
  const { user } = useSelector((state) => state.userSlice);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      username: data.username,
      email: data.email,
    },
    onSubmit: async (val) => {
      try {
        await updateUser({
          body: val,
          token: user.token
        }).unwrap();
        toast.success('successfully updated');
      } catch (err) {
        console.log(err);
        toast.error(`${err.data?.message}`);
      }

    }
  });

  return (
    <div>

      <form onSubmit={handleSubmit} className="max-w-[300px] space-y-5" >

        <Input
          onChange={handleChange}
          name="username"
          label="Username"
          value={values.username}
        />

        <Input
          label="Email"
          onChange={handleChange}
          name="email"
          value={values.email} />

        <Button type="submit" loading={isLoading}>Update</Button>

      </form>
    </div>
  )
}
