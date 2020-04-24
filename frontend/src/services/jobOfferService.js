import axios from "axios";


export default {
  // create: job => axios.post("http://localhost:4000/jobpost/add", job),
  // delete: id => axios.delete("http://localhost:4000/jobpost/" + id),
  // update: (id, job) => axios.put("http://localhost:4000/jobpost/" + id),
  // getById: id => axios.get("http://localhost:4000/jobpost/" + id),
  search: (term) =>
    Promise.resolve({
      data: [
        {
          JobID: "1",
          title: "Plumber",
          company: "TotalTubs",
          salary: "1111111111",
          location: "London",
          logo:
            "https://www.visitdanvillearea.com/wp-content/uploads/2015/08/McDonalds-Logo-square.jpg",
          emailDate: "22-03-1988"
        }
      ]
    })
};
