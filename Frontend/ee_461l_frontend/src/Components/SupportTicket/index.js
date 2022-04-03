import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Nav from "../Nav";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const issues = [
  {
    value: "USD",
    label: "Request Checkout Extension",
  },
  {
    value: "EUR",
    label: "Missing/Broken Hardware",
  },
  {
    value: "BTC",
    label: "Delete Account",
  },
  {
    value: "JPY",
    label: "Other",
  },
];

export default function FormPropsTextFields() {
  const [issue, setIssue] = React.useState("");
  const handleChange = (event) => {
    setIssue(event.target.value);
  };

  return (
    <>
      <Nav />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <h1>Submit an Issue</h1>
            </Item>
          </Grid>
          {/* User ID */}
          <Grid item xs={12}>
            <Item>
              <TextField
                disabled
                id="outlined-disabled"
                label="User"
                defaultValue="*Placeholder: Current USER ID/EMAIL**"
              />
            </Item>
          </Grid>

          {/* Issue Drop Down */}
          <Grid item xs={12}>
            <Item>
              <TextField
                id="outlined-select-issue"
                select
                label="Issue Type"
                value={issue}
                onChange={handleChange}
                helperText="Please select your issue type."
              >
                {issues.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Item>
          </Grid>

          {/* Subject Line */}
          <Grid item xs={12}>
            <Item>
              <TextField
                id="outlined-basic"
                label="Subject"
                variant="outlined"
              />
            </Item>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Item>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                placeholder="Please enter the details of your issue."
                multiline
                rows={5}
              />
            </Item>
          </Grid>

          {/* Submit  */}
          <Grid item xs={12}>
            <Item>
              <Button variant="outlined" size="small">
                Submit
              </Button>
            </Item>
          </Grid>
        </Grid>
        <div>
          <br />

          <br />

          <br />

          <br />
        </div>
      </Box>
    </>
  );
}
