import { Button, Input, Typography } from "@material-tailwind/react"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserSignUpMutation } from "./authApi";

const Register = () => {
  const [userSignUp, { isLoading }] = useUserSignUpMutation();
  const nav = useNavigate();
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    onSubmit: async (val) => {
      try {
        await userSignUp(val).unwrap();
        toast.success('successfully register');
        nav(-1);
      } catch (err) {
        console.log(err);
        toast.error(`${err.data?.message}`);
      }
    }
  })
  return (
    <div className="max-w-[300px] mx-auto mt-10 space-y-5 ">
      <Typography variant="h4">SignUp</Typography>
      <form onSubmit={handleSubmit} className="space-y-7 ">

        <div>
          <Input
            label="Username"
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
          />
        </div>

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

            onChange={handleChange}
            value={values.password}
          />
        </div>
        <Button
          loading={isLoading}

          size="sm" className="w-full py-2" type="submit">Submit</Button>



      </form>

      <Typography color="gray" className="mt-4 text-center font-normal">
        Already have an account?{" "}
        <button onClick={() => nav(-1)} className="font-medium text-gray-900">
          Login
        </button>
      </Typography>
    </div>
  )
}
export default Register