import { Button, Input, Typography } from "@material-tailwind/react"
import { useFormik } from "formik"
import { useUserLoginMutation } from "./authApi"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const nav = useNavigate();

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (val) => {
      try {
        const response = await loginUser(val).unwrap();
        dispatch(addUser(response));
        toast.success('successfully login');
        nav(-1);

      } catch (err) {
        console.log(err);
        toast.error(`${err.data?.message}`);
      }
    }
  })
  return (
    <div className="max-w-[300px] mx-auto mt-10 space-y-5 ">
      <Typography variant="h4">Login </Typography>
      <form onSubmit={handleSubmit} className="space-y-7 ">
        <div>
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            icon={<i className="fa-solid fa-lock" />}

            onChange={handleChange}
            value={values.password}
          />
        </div>
        <Button
          loading={isLoading}
          size="sm" className="w-full py-2" type="submit">Submit</Button>



      </form>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Don't have an account?{" "}
        <Link to={'/register'} className="font-medium text-gray-900">
          Sign Up
        </Link>
      </Typography>
    </div >
  )
}
export default Login