import { Input } from "@material-tailwind/react"
import { useFormik } from "formik"
import { useNavigate } from "react-router";

const SearchField = () => {
  const nav = useNavigate();

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: async (val) => {
      nav(`/search/${val.search}`);
    }
  })
  return (
    <div className="max-w-[400px]  mb-4">


      <form onSubmit={handleSubmit}>
        <Input
          name="search"
          value={values.search}
          label="Search"
          onChange={handleChange}
          icon={<i className="fas fa-search" />}
        />
      </form>
    </div>
  )
}
export default SearchField