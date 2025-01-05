import { Carousel } from "@material-tailwind/react";
import { useGetTop5Query } from "./productApi"
import CaraSkeleton from "../../ui/Skeletons/CaraSkeleton";
import { base } from "../../app/apiUrl";

const TopProducts = () => {

  const { data, isLoading, isError, error } = useGetTop5Query();

  if (isLoading) {
    return <CaraSkeleton />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>


      {data.products.length !== 0 &&
        <div className="px-11"> <Carousel className="rounded-xl h-[300px] mb-8 " autoplay>
          {data.products && data?.products.map((product) => (
            <img
              src={`${base}${product.image}`}
              alt="image 1"
              className="h-full w-full object-cover"
            />
          ))}
        </Carousel>
        </div>

      }
    </div>
  )
}
export default TopProducts


