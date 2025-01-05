import { Button, Card, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useGetOrderQuery } from './orderApi';
import { useNavigate } from "react-router";
const TABLE_HEAD = ["OrderId", "TotalAmount", "Detail"];



export function OrderTable() {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const { isLoading, isError, error, data } = useGetOrderQuery(user.token);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>


  return (
    <Card className="h-full w-full overflow-scroll col-span-2">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map(({ _id, total, products }, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {_id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {total}
                  </Typography>
                </td>

                <td className={classes}>
                  <Button
                    onClick={() => nav(`/order-detail/${_id}`)}
                    size="sm" color="green">More</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}