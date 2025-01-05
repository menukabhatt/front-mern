import { useParams } from "react-router"
import { useGetSingleProductQuery } from "./productApi";
import ProductEditForm from "./ProductEditForm";

const ProductEdit = () => {

  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleProductQuery(id);

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>

      {data && <ProductEditForm data={data} />}
    </div>
  )
}
export default ProductEdit