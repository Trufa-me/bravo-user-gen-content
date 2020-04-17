import axios from "axios";

export default {
	create: job => axios.post("http://localhost:4000/jobpost/add", job),
	delete: id => axios.delete("http://localhost:4000/jobpost/" + id),
	update: (id, job) => axios.put("http://localhost:4000/jobpost/" + id),
	getById: id => axios.get("http://localhost:4000/jobpost/" + id),
	getAll: () => axios.get("http://localhost:4000/jobpost/")
};
