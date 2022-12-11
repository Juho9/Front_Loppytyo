import React from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import AddCustomer from "../components/AddCustomer";
import CustomerTrainings from "../components/CustomerTrainings";
import UpdateCustomer from "../components/UpdateCustomer";
import AddTrainingToCustomer from "../components/AddTrainingToCustomer";
import ExportDataCSV from "../components/ExportDataCSV";

export default function CustomerList() {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.content));
  };

  const profileData = (customer, link) => {
    fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .then((err) => console.error(err));
  };

  const columns = [
    {
      Header: "Name",
      accessor: "lastname",
      aggregate: "count",
      Aggregated: ({ value }) => `${value} Names`,
      Cell: (row) =>
        row.original
          ? row.original.lastname + " " + row.original.firstname
          : row.groupByVal,
      filterable: true,
      sortable: true,
    },
    {
      Header: "Email",
      accessor: "email",
      filterable: true,
      sortable: true,
    },
    {
      Header: "Phone",
      accessor: "phone",
      filterable: true,
      sortable: true,
    },
    {
      sortable: false,
      filterable: false,
      Cell: (row) => (
        <CustomerTrainings profileData={profileData} customer={row.original} />
      ),
    },
    {
      accessor: "links.0.href",
      Cell: (row) => (
        <Button
          onClick={() => deleteCustomer(row.value)}
          color="inherit"
          size="small"
          variant="outlined"
        >
          <DeleteIcon fontSize="medium" />
        </Button>
      ),
    },
    {
      accessor: "links.0.href",
      Cell: (row) => (
        <UpdateCustomer
          customer={row.original}
          link={row.value}
          editCustomer={editCustomer}
        />
      ),
    },
    {
      accessor: "links.0.href",
      Cell: (row) => (
        <AddTrainingToCustomer
          link={row.value}
          addTraining={addTraining}
          customerId={row.value}
        />
      ),
    },
  ];

  const saveCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(link, { method: "DELETE" })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
      setOpenSnackBar(true);
    }
  };

  const editCustomer = (link, customer) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>List that contains all customers</h2>

      <AddCustomer saveCustomer={saveCustomer} />
      <ExportDataCSV />

      <div
        className="Table"
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        <ReactTable data={customers} columns={columns} />
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackBar(false)}
        message="Customer deleted!"
      />
    </div>
  );
}
