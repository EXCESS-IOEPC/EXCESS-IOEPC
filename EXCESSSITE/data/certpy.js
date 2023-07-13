let data = [{ "cert_id": "#079-PDJ-01", "Name": "Bijaya Giri", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-02", "Name": "Raghav Raj Mudvari", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-03", "Name": "Yubshan Shrestha", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-04", "Name": "Suraj Acharya", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-05", "Name": "Roshan Chaudhary", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-06", "Name": "Sonu Kumar Gupta", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-07", "Name": "Rajesh Pandey", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-08", "Name": "Nigam Yadav", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-09", "Name": "Yogendra Karna", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-10", "Name": "Tilak Thapa", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-11", "Name": "Rahul Karna", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-12", "Name": "Sumit Rijal", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-13", "Name": "Niruta Niraula", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-14", "Name": "Anuja Neupane", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-15", "Name": "Anusha Shrestha", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-16", "Name": "Arun Shah", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-17", "Name": "Soniya Rajbanshi", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-18", "Name": "Roshan Kumar Kanu", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-19", "Name": "Prachit Kumar Bhujel", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-20", "Name": "Sandesh Poudel", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-21", "Name": "Binita gautam", "type": "Not Present", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-22", "Name": "Utsav Tamrakar", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-23", "Name": "Yogesh Bhandari ", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-24", "Name": "Sony Kumari Chaudhary ", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-25", "Name": "Aayush Gautam", "type": "Participation + Completion", "completion": "9th July", "percentage": "90%" }, { "cert_id": "#079-PDJ-26", "Name": "Sudip Phuyal ", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-27", "Name": "Manjil dahal", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-28", "Name": "Bikash Kumar Das ", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }, { "cert_id": "#079-PDJ-29", "Name": "Suwarna Pyakurel", "type": "Only Participated", "completion": "9th July", "percentage": "70%" }]


const input = document.getElementById("lname");
const msg = document.querySelector(".alert");
const result = document.querySelector(".message");

input.addEventListener("input", () => {
  msg.classList.add("hide");
  msg.innerText = "";
  let certificateCode = input.value;
  const regex = /^#(\d{3}-[A-Z]{3}-\d{2})$/;
  let isValid = regex.test(certificateCode);

  if (!isValid) {
    msg.classList.remove("hide");
    msg.innerText =
      "Invalid certificate code. Hmm, Looks like certification code is missing something.";
    setTimeout(function () {
      msg.classList.add("hide");
    }, 5000);
  } else if (certificateCode === " ") {
    msg.classList.add("hide");
  } else {
    msg.classList.add("hide");
    msg.innerText = "";
  }
  return isValid;
});

const btn = document.getElementById("btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const certificateCode = input.value;
  console.log(certificateCode)
  msg.innerText = "";
  data.map((item) => {
    if (item.cert_id === certificateCode) {
      console.log("hello")
      result.innerHTML = `
        <table>
          <tr>
            <th>Certificate Id</th>
            <th>Name</th>
            <th>Percentage</th>
            <th>Date Issued</th>
            <th>Completion Type</th>
          </tr>
          <tr>
            <td>${item.cert_id}</td>
            <td>${item.Name}</td>
            <td>${item.percentage}</td>
            <td>${item.completion}</td>
            <td>${item.type}</td>
          </tr>
        </table>
      `;
    }
  });
});
