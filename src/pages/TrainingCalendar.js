import * as React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { addMinutes } from "date-fns";

export default function TrainingCalendar() {
  const [trainings, setTrainings] = React.useState([]);
  const localizer = momentLocalizer(moment);

  React.useEffect(() => fetchTrainingsData(), []);

  const fetchTrainingsData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((res) => res.json())
      .then((data) => {
        var activitiesArray = [];
        for (let i = 0; i < data.length; i++) {
          activitiesArray.push({
            title:
              data[i].activity +
              " / " +
              data[i].customer.lastname +
              " " +
              data[i].customer.firstname,
            start: new Date(data[i].date),
            end: moment(addMinutes(new Date(data[i].date), data[i].duration)),
          });
          setTrainings(activitiesArray);
          console.log(data);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ height: "900px", marginBottom: "100px" }}>
      <Calendar
        localizer={localizer}
        events={trainings}
        step={30}
        defaultView={"month"}
        popup={true}
      />
    </div>
  );
}
