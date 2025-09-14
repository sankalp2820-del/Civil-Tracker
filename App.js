import { useState } from "react";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    status: "Planning",
    plannedStart: "",
    plannedEnd: "",
    actualStart: "",
    actualEnd: "",
    duration: "",
    avgManpower: "",
  });

  const [manpowerInputs, setManpowerInputs] = useState({});

  const addJob = () => {
    if (!form.title) return;
    setJobs([...jobs, { ...form, manpower: [] }]);
    setForm({
      title: "",
      status: "Planning",
      plannedStart: "",
      plannedEnd: "",
      actualStart: "",
      actualEnd: "",
      duration: "",
      avgManpower: "",
    });
  };

  const addManpower = (index) => {
    if (!manpowerInputs[index]) return;
    const newJobs = [...jobs];
    newJobs[index].manpower.push({
      date: new Date().toLocaleDateString(),
      count: manpowerInputs[index],
    });
    setJobs(newJobs);
    setManpowerInputs({ ...manpowerInputs, [index]: "" });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Civil Job Tracker</h1>
      <div className="grid gap-2 mb-6 p-4 border rounded-lg bg-gray-50">
        <input
          className="border p-2 rounded"
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Planning</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Stopped</option>
        </select>
        <input
          type="date"
          className="border p-2 rounded"
          value={form.plannedStart}
          onChange={(e) => setForm({ ...form, plannedStart: e.target.value })}
          placeholder="Planned Start"
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={form.plannedEnd}
          onChange={(e) => setForm({ ...form, plannedEnd: e.target.value })}
          placeholder="Planned End"
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={form.actualStart}
          onChange={(e) => setForm({ ...form, actualStart: e.target.value })}
          placeholder="Actual Start"
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={form.actualEnd}
          onChange={(e) => setForm({ ...form, actualEnd: e.target.value })}
          placeholder="Actual End"
        />
        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Estimated Duration (days)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Avg. Daily Manpower"
          value={form.avgManpower}
          onChange={(e) => setForm({ ...form, avgManpower: e.target.value })}
        />
        <button
          onClick={addJob}
          className="bg-blue-600 text-white rounded p-2"
        >
          Add Job
        </button>
      </div>

      {jobs.map((job, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg bg-white shadow">
          <h2 className="font-semibold text-lg">{job.title}</h2>
          <p>Status: {job.status}</p>
          <p>Planned: {job.plannedStart} → {job.plannedEnd}</p>
          <p>Actual: {job.actualStart} → {job.actualEnd}</p>
          <p>Duration: {job.duration} days</p>
          <p>Avg. Manpower: {job.avgManpower}</p>

          <div className="mt-2">
            <input
              type="number"
              className="border p-1 rounded w-24 mr-2"
              placeholder="Manpower"
              value={manpowerInputs[index] || ""}
              onChange={(e) =>
                setManpowerInputs({ ...manpowerInputs, [index]: e.target.value })
              }
            />
            <button
              onClick={() => addManpower(index)}
              className="bg-green-600 text-white rounded px-2 py-1"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 text-sm text-gray-700">
            {job.manpower.map((entry, i) => (
              <li key={i}>
                {entry.date}: {entry.count} workers
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

