import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddTrainingToCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: "",
    duration: "",
    activity: "",
    customer: props.customerId,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    props.addTraining(training);
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ margin: "7px" }}
        variant="outlined"
        color="inherit"
        onClick={handleClickOpen}
      >
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            type="datetime-local"
            name="date"
            value={training.date}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={handleInputChange}
            label="Duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={handleInputChange}
            label="Activity"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
