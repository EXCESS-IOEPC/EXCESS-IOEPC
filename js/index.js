let navshow = 0;

function navbar() {
  const element = document.body;
  element.classList.toggle("show");
}

// Reviews Data for manipulation

document.addEventListener("DOMContentLoaded", function () {
  let navshow = 0;

  function navbar() {
    const element = document.body;
    element.classList.toggle("show");
  }

  const reviews = [
    {
      author: "Bharat Bhatta",
      job: "President of the 1st committee",
      text: "Working with EXCESS has shown me the power of collaboration and the impact we can make through teamwork and shared goals.",
      img: "",
    },
    {
      author: "",
      job: "President of the 2nd committee",
      text: "Leading EXCESS was a transformative journey. We focused on cutting-edge training and innovative projects, ensuring our students excelled in the digital realm. The camaraderie and dedication within our community were truly inspiring.",
      img: "",
    },
    {
      author: "",
      job: "President of the 3rd committee",
      text: "Being part of EXCESS was inspiring. We fostered an environment of collaboration and experimentation, nurturing skills and lifelong friendships. It's where passion for technology meets practical application.",
      img: "",
    },
    {
      author: "",
      job: "President of the 4th committee",
      text: "EXCESS was a cornerstone of my university experience. We fostered innovation and community, developing skills that extended beyond the classroom. The opportunities to lead and innovate shaped my career trajectory.",
      img: "",
    },
    {
      author: "Baikuntha Acharya",
      job: "President of the 5th committee",
      text: "EXCESS provided a supportive community and valuable learning opportunities. We focused on growth and innovation in electronics engineering, preparing students for real-world challenges.",
      img: "",
    },
    {
      author: "Ram Binay Sharma",
      job: "President of the 6th committee",
      text: "Working with EXCESS has shown me the power of collaboration and the impact we can make through teamwork and shared goals.",
      img: "",
    },
    {
      author: "Sunil Poudel",
      job: "President of the 7th committee",
      text: "As president of EXCESS, I've seen firsthand the transformative impact of our society on our members' skills and confidence. We strive to foster an environment where everyone can excel.",
      img: "",
    },
    {
      author: "Sushan Kattel",
      job: "President of the 8th committee",
      text: "EXCESS stands at the forefront of innovation in electronics engineering. It's a privilege to steer this society toward new achievements that define the future of technology.",
      img: "",
    },
    {
      author: "Gokarna Baskota",
      job: "President of the 9th committee",
      text: "EXCESS was a cornerstone of my university experience. We fostered innovation and community, developing skills that extended beyond the classroom. The opportunities to lead and innovate shaped my career trajectory.",
      img: "",
    },
    {
      author: "Suraj Bhattatai",
      job: "President of the 10th committee",
      text: "Leading EXCESS was an honor. We introduced groundbreaking initiatives like CS50x, shaping our students' technical expertise. The spirit of collaboration and commitment to excellence defined our achievements.",

      img: "",
    },
    {
      author: "Mahesh Chaudhary",
      job: "President of the 11th committee",
      text: "EXCESS stands at the forefront of innovation in electronics engineering. It's a privilege to steer this society toward new achievements that define the future of technology.",
      img: "",
    },
  ];

  // Creating variables to get elements from our DOM.
  const mainImage = document.getElementById("img");
  const myAuthor = document.getElementById("author");
  const myJob = document.getElementById("job");
  const myText = document.getElementById("text");
  const prev = document.getElementById("prev-btn");
  const next = document.getElementById("next-btn");
  const random = document.getElementById("randomBtn");

  let currentIndex = 0;
  const reviewsLength = reviews.length;

  // Ensure elements exist before adding event listeners
  if (next) {
    next.addEventListener("click", function () {
      currentIndex++;
      if (currentIndex > reviewsLength - 1) {
        currentIndex = 0;
      }
      updateReview();
    });
  }

  if (prev) {
    prev.addEventListener("click", function () {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = reviewsLength - 1;
      }
      updateReview();
    });
  }

  function autoChangeReview() {
    currentIndex++;
    if (currentIndex > reviewsLength - 1) {
      currentIndex = 0;
    }
    updateReview();
  }

  // Call autoChangeReview every 3 seconds
  setInterval(autoChangeReview, 6000);
  function updateReview() {
    mainImage.src = reviews[currentIndex].img;
    myAuthor.innerHTML = reviews[currentIndex].author;
    myJob.innerHTML = reviews[currentIndex].job;
    myText.innerHTML = reviews[currentIndex].text;
  }
});
