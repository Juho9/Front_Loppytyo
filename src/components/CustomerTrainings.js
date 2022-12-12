import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";

import CustomerTrainingTable from "./CustomerTrainingTable";

export default function ProfileInformation(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstName: "",
    lastName: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
    links: "",
  });

  const handleClickOpen = () => {
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone,
      links: props.customer.links[2].href,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const trainingLink = () => {
    customer();
  };

  return (
    <div>
      <Button variant="contained" color="background" onClick={handleClickOpen}>
        Trainings
      </Button>

      <Dialog
        className="profile-dialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="trainings-dialog"
        fullWidth
        maxWidth="md"
        maxheight="xl"
      >
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "auto",
            height: "60%",
          }}
        >
          <div style={{ margin: "auto", padding: "7em" }}>
            <h2>
              {customer.firstname} {customer.lastname}
            </h2>
            <Typography>Email: </Typography>
            <Typography margin={2}> {customer.email}</Typography>
            <Typography>Phone: </Typography>
            <Typography margin={2}>{customer.phone}</Typography>
            <Typography>Streetaddress: </Typography>
            <Typography margin={2}>
              {customer.streetaddress}, {customer.city} {customer.postcode}
            </Typography>
          </div>
          <div
            className="c-traininsTable"
            style={{ width: "100%", margin: "auto" }}
          >
            <CustomerTrainingTable
              trainingLink={trainingLink}
              link={customer.links}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
