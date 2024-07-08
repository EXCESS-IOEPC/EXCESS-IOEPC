let data = [
  {
    cert_id: "#079-PDJ-01",
    Name: "Bijaya Giri",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-02",
    Name: "Raghav Raj Mudvari",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-03",
    Name: "Yubshan Shrestha",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-04",
    Name: "Suraj Acharya",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-05",
    Name: "Roshan Chaudhary",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-06",
    Name: "Sonu Kumar Gupta",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-07",
    Name: "Rajesh Pandey",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-08",
    Name: "Nigam Yadav",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-09",
    Name: "Yogendra Karna",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-10",
    Name: "Tilak Thapa",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-11",
    Name: "Rahul Karna",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-12",
    Name: "Sumit Rijal",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-13",
    Name: "Niruta Niraula",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-14",
    Name: "Anuja Neupane",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-15",
    Name: "Anusha Shrestha",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-16",
    Name: "Arun Shah",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-17",
    Name: "Soniya Rajbanshi",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-18",
    Name: "Roshan Kumar Kanu",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-19",
    Name: "Prachit Kumar Bhujel",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-20",
    Name: "Sandesh Poudel",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-22",
    Name: "Utsav Tamrakar",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-23",
    Name: "Yogesh Bhandari ",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-24",
    Name: "Sony Kumari Chaudhary ",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-25",
    Name: "Aayush Gautam",
    type: "Accomplished Participant",
    completion: "9th July",
    percentage: "A+",
  },
  {
    cert_id: "#079-PDJ-26",
    Name: "Sudip Phuyal ",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-27",
    Name: "Manjil dahal",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  {
    cert_id: "#079-PDJ-28",
    Name: "Bikash Kumar Das ",
    type: "Engaged Participant",
    completion: "9th July",
    percentage: "A",
  },
  // {
  //   cert_id: "#079-PDJ-29",
  //   Name: "Suwarna Pyakurel",
  //   type: "Engaged Participant",
  //   completion: "9th July",
  //   percentage: "A",
  // },
];

const input = document.getElementById("lname");
const msg = document.querySelector(".alert");
const result = document.querySelector(".message");
const suggestionList = document.getElementById("suggestionList");

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

input.addEventListener("input", () => {
  const searchValue = input.value.trim().toLowerCase();
  let suggestions = [];

  if (searchValue) {
    suggestions = data.filter((item) => {
      const certId = item.cert_id.toLowerCase();
    

      // return certId.includes(searchValue) || name.includes(searchValue);
      return certId.includes(searchValue)
    });
  }

  displaySuggestions(suggestions);
});

function displaySuggestions(suggestions) {
  suggestionList.innerHTML = "";

  if (suggestions.length === 0) {
    suggestionList.classList.add("hide");
    return;
  }

  suggestionList.classList.remove("hide");

  suggestions.forEach((item) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion-item");
    suggestionItem.textContent = `${item.cert_id}`;

    suggestionItem.addEventListener("click", () => {
      input.value = item.cert_id;
      suggestionList.classList.add("hide");
    });

    suggestionList.appendChild(suggestionItem);
  });
}

const btn = document.getElementById("btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const certificateCode = input.value;
  msg.innerText = "";
  data.forEach((item) => {
    if (item.cert_id === certificateCode) {
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
