import * as React from "react";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";
import { url } from "../App";

export default function ExportDataCSV() {
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch(url + "/api/customers")
      .then((res) => res.json())
      .then((data) => {
        const parsedData = data.content.map(
          ({ content, links, ...others }) => others
        );
        setCustomers(parsedData);
      });
  };

  return (
    <div>
      <Button color="inherit" size="small" variant="outlined">
        <CSVLink data={customers}>Export CSV</CSVLink>
      </Button>
    </div>
  );
}
