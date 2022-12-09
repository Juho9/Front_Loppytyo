import * as React from "react";
import { format, parseISO } from "date-fns";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TrainingTable(props) {
  const [trainings, setTrainings] = React.useState([]);

  React.useEffect(() => fetchTrainings(), []);

  const fetchTrainings = () => {
    fetch(props.link)
      .then((response) => response.json())
      .then((data) => {
        setTrainings(data.content);
      });
  };

  console.log(trainings);

  const deleteTraining = (data) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      fetch(data, { method: "DELETE" })
        .then((res) => fetchTrainings())
        .catch((err) => console.error(err));
    }
  };

  const trainingsMapped = () => {
    for (var i = 0, iLen = trainings.length; i < iLen; i++) {
      if ("rel" in trainings[i]) {
        return <p>No training data</p>;
      } else if ("date" in trainings[i]) {
        return (
          <div>
            <table className="trainingsTable">
              <tbody>
                <tr>
                  <th>Date and time</th>
                  <th>Activity</th>
                  <th>Duration</th>
                </tr>
                {trainings.map((trainings, index) => (
                  <tr key={index}>
                    <td>
                      {format(parseISO(trainings.date), "dd.MM.yyyy HH:mm")}{" "}
                    </td>
                    <td>{trainings.activity}</td>
                    <td>{trainings.duration} min</td>
                    <input>
                      <Button
                        onClick={() => deleteTraining(trainings.links[0].href)}
                        color="inherit"
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </input>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else {
        return <p>Oh no</p>;
      }
    }
  };

  return (
    <div className="trainingtable" style={{ height: "50%", width: "80%" }}>
      <h3>Exercises</h3>
      <div>{trainingsMapped()}</div>
    </div>
  );
}
