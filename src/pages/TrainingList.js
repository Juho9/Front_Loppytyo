import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import ReactTable from "react-table";
import "react-table/react-table.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

export default function TrainingList() {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchTrainingData(), []);

  const fetchTrainingData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        setTrainings(data);
      });
    console.log(trainings);
  };

  const columns = [
    {
      Header: "Name",
      accessor: "lastname",
      aggregate: "count",
      Aggregated: ({ value }) => `${value} Names`,
      Cell: (row) =>
        row.original
          ? row.original.customer.lastname +
            " " +
            row.original.customer.firstname
          : row.groupByVal,
      filterable: true,
    },
    {
      Header: "Date and time",
      accessor: "date",
      Cell: ({ value }) => {
        return format(parseISO(value), "dd/MM/yyyy HH:mm");
      },
      filterable: true,
    },
    {
      Header: "Activity",
      accessor: "activity",
      filterable: true,
    },
    {
      Header: "Duration",
      accessor: "duration",
      filterable: true,
    },
    {
      accessor: "id",
      Cell: (row) => (
        <Button
          onClick={() => deleteTraining(row.value)}
          color="inherit"
          size="small"
          variant="outlined"
        >
          <DeleteIcon fontSize="medium" />
        </Button>
      ),
    },
  ];

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure you want to delete this training data?")) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
        method: "DELETE",
      })
        .then((res) => fetchTrainingData())
        .catch((err) => console.error(err));
      setOpenSnackBar(true);
    }
  };

  return (
    <div>
      <h2>List that contains all activities</h2>
      <div className="Table">
        <ReactTable data={trainings} columns={columns} />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackBar(false)}
        message="Training deleted!"
      />
    </div>
  );
}
