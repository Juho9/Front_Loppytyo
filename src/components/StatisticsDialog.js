import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts";
import lodash from "lodash";
import { Typography } from "@mui/material";
import { url } from "../App";

export default function StatisticsDialog() {
  const [open, setOpen] = React.useState(false);
  const [trainings, setTrainings] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  var trainingTime = 0;

  React.useEffect(() => {
    fetchTrainings();
    fetchCustomers();
  }, []);

  const fetchTrainings = () => {
    fetch(url + "/api/trainings")
      .then((res) => res.json())
      .then((data) => setTrainings(data.content));
  };

  const fetchCustomers = () => {
    fetch(url + "/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.content));
  };

  const totalTrainingTimes = () => {
    for (var i = 0; i < trainings.length; i++) {
      trainingTime = trainingTime + trainings[i].duration;
    }
    return trainingTime;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var chartData = lodash(trainings)
    .groupBy("activity")
    .map((value, key) => ({
      activity: key,
      total: lodash.sumBy(value, "duration"),
    }))
    .value();

  return (
    <div style={{ marginBottom: "40px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          height: "120px",
          width: "250px",
          border: "2px solid black",
          borderRadius: "12px",
          padding: "5px",
          marginBottom: "10px",
        }}
      >
        <div>
          <p>Current customers:</p>
          <p style={{ fontWeight: "bold" }}>{customers.length}</p>
        </div>
        <div>
          <p>Total training time:</p>
          <p style={{ fontWeight: "bold" }}>{totalTrainingTimes()} min</p>
        </div>
      </div>
      <Button variant="contained" color="background" onClick={handleClickOpen}>
        Chart
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        maxheight="xl"
      >
        <DialogContent style={{ height: "60%" }}>
          <Typography style={{ marginBottom: "40px" }}>
            Trainings Chart:
          </Typography>
          <BarChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="activity" />
            <YAxis
              label={{
                value: "Time (min)",
                position: "insideLeft",
                angle: 90,
              }}
            />
            <Bar dataKey="total" fill="black" />
          </BarChart>
        </DialogContent>
      </Dialog>
    </div>
  );
}
