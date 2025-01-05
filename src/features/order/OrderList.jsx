import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { base } from "../../app/apiUrl";

export function OrderList({ products }) {

  // const sa = {
  //   p: {
  //     id: "1",
  //     title: "Product 1",
  //     description: "Description for Product 1",
  //     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=60",
  //   }
  // };

  // const {p: product} = da;
  // console.log(products);
  return (
    <Card className="max-w-[500px]">
      <List>

        {products.map(({ productId: product, qty }) => (
          <ListItem key={product._id} className="flex items-start justify-between">



            <div className="flex">

              <ListItemPrefix>
                <Avatar variant="circular" alt="candice" src={`${base}/${product.image}`} />
              </ListItemPrefix>


              <div>

                <Typography variant="h6" color="blue-gray">
                  {product.title}
                </Typography>


                <Typography variant="small" color="gray" className="font-normal">
                  {product.description}
                </Typography>
              </div>





            </div>

            <div>
              <h1>
                Qty:-{qty}
              </h1>
            </div>

          </ListItem>


        ))}


      </List>
    </Card>
  );
}