import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useRemoveProductMutation } from "../features/product/productApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export function ShowDialog({ id }) {

  const [removeProduct, { isLoading }] = useRemoveProductMutation();
  const { user } = useSelector((state) => state.userSlice);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    try {
      await removeProduct({
        token: user.token,
        id
      }).unwrap();
      toast.success('successfully remove');
    } catch (err) {
      toast.error(`${err.data?.message}`);
    }
  }

  return (
    <>
      <Button loading={isLoading} onClick={handleOpen} color="orange" size="sm" >Delete</Button>


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
          <Button variant="gradient" color="green" onClick={() => {
            handleDelete();
            handleOpen();
          }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}