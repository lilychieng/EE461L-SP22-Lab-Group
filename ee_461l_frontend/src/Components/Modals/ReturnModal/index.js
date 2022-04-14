import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const axios = require("axios").default;

function ReturnModal({
  item,
  setReturnModalOpen,
  returnModalOpen,
  proj_id,
  reload,
  setReload,
}) {
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
  // Remove once we get the number of HWSets the project has
  const numOfProjectItems = item.availability;

  const regexNumber = /^[0-9\b]+$/;
  const checkout = useRef(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleClose = () => {
    checkout.current = 0;
    setError(false);
    setSuccess(false);
    setReturnModalOpen(false);
  };

  const handleReturn = (e) => {
    setError(false);
    setSuccess(false);
    if (!regexNumber.test(checkout.current)) {
      setError(true);
      return setErrorMessage("Return amount must be a valid number");
    } else if (parseInt(checkout.current) === 0) {
      setError(true);
      return setErrorMessage("Checkout value cannot be 0");
    } else if (
      parseInt(checkout.current) >
      item.projects.find((x) => x.project_id === proj_id).checked_out
    ) {
      setError(true);
      return setErrorMessage(
        `You cannot return more than ${
          item.projects.find((x) => x.project_id === proj_id).checked_out
        } items`
      );
    }
    // axios api request
    else {
      axios
        .post("http://localhost:5000/projects/checkin/", {
          data: {
            project_id: proj_id,
            HWSet_id: item._id.$oid,
            checkin_qty: Number.parseInt(checkout.current),
          },
        })
        .then(function (response) {
          setSuccess(true);
          setReload(reload + 1);
          setTimeout(function () {
            handleClose();
          }, 750);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <Modal
        open={returnModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ textAlign: "center" }}
      >
        <Box sx={style}>
          <Button
            small
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              color: "black",
            }}
            onClick={handleClose}
          >
            X
          </Button>

          <Typography
            id="modal-modal-description"
            style={{ fontSize: "30px", fontWeight: "700" }}
          >
            Return for {item.name}
          </Typography>
          {error && <Alert severity="error">{errorMessage}</Alert>}
          {success && (
            <Alert>Sucessfully returned {checkout.current} items</Alert>
          )}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Remaining {item.name}: {item.availability}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ fontSize: "15px" }}
          >
            Enter number {item.name} to return
          </Typography>
          <TextField
            label="Number of items"
            fullWidth
            onChange={(e) => {
              checkout.current = e.target.value;
            }}
            style={{ marginBottom: "20px" }}
          />
          <Button fullWidth onClick={handleReturn}>
            Return
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ReturnModal;
