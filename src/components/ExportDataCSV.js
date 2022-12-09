import * as React from "react";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";

export default function ExportDataCSV() {
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
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
