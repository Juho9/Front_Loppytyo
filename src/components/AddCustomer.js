import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function AddCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const addNewCustomer = () => {
    props.saveCustomer(customer);
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ margin: "10px" }}
        variant="outlined"
        color="inherit"
        onClick={handleClickOpen}
      >
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={(e) => handleInputChange(e)}
            label="Firstname"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={(e) => handleInputChange(e)}
            label="Lastname"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={(e) => handleInputChange(e)}
            label="StreetAddress"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={(e) => handleInputChange(e)}
            label="Postcode"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={(e) => handleInputChange(e)}
            label="City"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={(e) => handleInputChange(e)}
            label="Email"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={(e) => handleInputChange(e)}
            label="Phone number"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addNewCustomer}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
