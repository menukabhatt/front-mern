import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useAddOrderMutation } from "../order/orderApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCarts } from "./cartSlice";

export function ConfirmCart({ total, carts }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const [addOrder, { isLoading }] = useAddOrderMutation();

  const handleOpen = () => setOpen(!open);
  const handleOrder = async () => {
    try {

      await addOrder({
        body: {
          products: carts.map((cart) => ({ productId: cart._id, qty: cart.qty })),
          total
        },
        token: user.token
      }).unwrap();
      dispatch(clearCarts());

      toast.success('order added successfully');
      handleOpen();
    } catch (err) {
      handleOpen();
      toast.error(err.data?.message)

    }
  }

  return (
    <>
      <Button onClick={handleOpen} className='mt-10'>Place An Order</Button>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            loading={isLoading}
            variant="gradient" color="green" onClick={handleOrder}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}