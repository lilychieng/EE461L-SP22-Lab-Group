import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function CheckoutModal({ item, setOpen, open }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const regexNumber = /^[0-9\b]+$/;
  const checkout = useRef(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleClose = () => {
    setError(false);
    setSuccess(false)
    setOpen(false);
  };

  const handleAvail = (e) => {
    setError(false);
    setSuccess(false);
    if (!regexNumber.test(checkout.current)) {
      setError(true);
      return setErrorMessage("Checkout must be a valid number");
    } else if (parseInt(checkout.current) === 0) {
      setError(true);
      return setErrorMessage("Checkout value cannot be 0");
    } else if (parseInt(checkout.current) > item.avail) {
      setError(true);
      return setErrorMessage(
        `You cannot checkout more than ${item.avail} items`
      );
    }
    // axios api request
    else {
      setSuccess(true);
    }

    console.log(checkout.current);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Checkout for {item.name}
          </Typography>
          {error && <Alert severity="error">{errorMessage}</Alert>}
          {success && (
            <Alert>Sucessfully checked out {checkout.current} items</Alert>
          )}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            There are {item.avail} {item.name} available.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Enter number {item.name} to checkout
          </Typography>
          <TextField
            label="# of items"
            fullWidth
            onChange={(e) => {
              checkout.current = e.target.value;
            }}
            style={{ marginBottom: "20px" }}
          />
          <Button fullWidth onClick={handleAvail}>
            Checkout
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CheckoutModal;