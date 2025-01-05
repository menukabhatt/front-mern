import { useParams } from "react-router"
import { useGetProductsQuery } from "../product/productApi";
import { Avatar, Card, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { base } from "../../app/apiUrl";

const SearchPage = () => {

  const { search } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ search });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-7">


      {data.products.length === 0 && <h1 className="text-xl font-semibold pl-3">No Products Found</h1>}

      <Card className="max-w-[700px]">
        <List>


          {data.products.map((product) => {
            return <ListItem key={product._id}>
              <ListItemPrefix>
                <Avatar variant="circular" alt="candice" src={`${base}${product.image}`} />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {product.title}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {product.description}
                </Typography>
              </div>
            </ListItem>
          })}


        </List>
      </Card>


    </div>
  )
}
export default SearchPage