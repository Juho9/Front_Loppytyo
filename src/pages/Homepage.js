import TrainingCalendar from ".//TrainingCalendar";
import ExportDataCSV from "../components/ExportDataCSV";

export default function Homepage() {
  return (
    <div>
      <h1>Personal Trainer</h1>
      <ExportDataCSV />
      <div style={{ width: "80%", margin: "auto", marginTop: "4%" }}>
        <TrainingCalendar />
      </div>
    </div>
  );
}
