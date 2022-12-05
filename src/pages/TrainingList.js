import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default function TrainingList() {
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
    },
    {
      Header: "Date and time",
      accessor: "date",
      Cell: ({ value }) => {
        return format(parseISO(value), "dd/MM/yyyy HH:mm");
      },
    },
    {
      Header: "Activity",
      accessor: "activity",
    },
    {
      Header: "Duration",
      accessor: "duration",
    },
  ];

  return (
    <div>
      <h2>Trainings</h2>
      <div className="Table">
        <ReactTable data={trainings} columns={columns} />
      </div>
    </div>
  );
}
