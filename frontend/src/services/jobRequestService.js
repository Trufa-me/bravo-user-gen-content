import axios from "axios";

export default {
  create: job => axios.post("http://localhost:4000/jobpost/add", job),
  delete: id => axios.delete("http://localhost:4000/jobpost/" + id),
  update: (id, job) => axios.put("http://localhost:4000/jobpost/" + id),
  getById: id => axios.get("http://localhost:4000/jobpost/" + id),
  getAll: () =>
    Promise.resolve({
      data: [
        {
          id: 1234,
          title: "Plumber",
          description: "I've several year of experience as plumber in a magic castle in the mushroom world. I can unclog pipes and sinks, and jump over enemies.",
          salary: 123456,
          location: "london",
          author: "Mario",
          createdData: "",
          archived: false,
          skills: ["nothing", "something", "jumping", "swimming"]
        }
      ]
    })
};
