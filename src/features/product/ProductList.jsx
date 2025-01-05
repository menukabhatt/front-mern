import { Button, Typography } from "@material-tailwind/react";
import { useGetProductsQuery } from "./productApi";
import TopProducts from "./TopProducts"
import { base } from "../../app/apiUrl";
import { useNavigate } from "react-router";
import SearchField from "../search/SearchField";

const ProductList = () => {
  const nav = useNavigate();
  const { data, isLoading, isError, error } = useGetProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div className="p-5">
      <SearchField />

      <TopProducts />
      <div className="grid grid-cols-3 gap-4">



        {data && data?.products.map((product) => (
          <div key={product._id} className="shadow-xl">
            <img className="w-full h-[200px] object-cover" src={`${base}${product.image}`} alt="" />
            <div className="p-3 space-y-2">
              <Typography color="blue-gray" className="font-bold ">{product.title}</Typography>
              <p className="text-gray-700 text-[14px]">{product.description}</p>
              <div className="flex justify-between">
                <h1>Rs.{product.price}</h1>
                <Button
                  onClick={() => nav(`/product-detail/${product._id}`)}
                  size="sm" color="light-blue" className="text-[12px] py-[5px] rounded-sm capitalize hover:ring-purple-400 shadow-sm"  >Buy now</Button>
              </div>

            </div>



          </div>
        ))}

      </div>



    </div>
  )
}
export default ProductList