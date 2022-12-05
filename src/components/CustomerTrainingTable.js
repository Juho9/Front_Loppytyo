import * as React from "react";
import { format, parseISO } from "date-fns";

export default function TrainingTable(props) {
  const [trainings, setTrainings] = React.useState([]);

  React.useEffect(() => {
    fetch(props.link)
      .then((response) => response.json())
      .then((data) => {
        setTrainings(data.content);
      });
  }, []);

  console.log(trainings);

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
