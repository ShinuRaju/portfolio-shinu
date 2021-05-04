let workBox = document.querySelector(".work .container .box");
let siteCount = document.querySelector("p .siteCount");
let dayCount = document.querySelector("p .dayCount");
let loadingPage = document.querySelector(".loading-page");
let loadingPageNumber = document.querySelector(".loading-page h1");

//function to convert range of number to another range of number
let scale = (number, inMin, inMax, outMin, outMax) => {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

//loading- page
let loadNum = 0;
let load = () => {
  loadNum++;
  loadingPageNumber.textContent = `${loadNum}%`;
  if (loadNum > 99) {
    clearInterval(interval);
    loadingPage.style.display = "none";
  }

  loadingPage.style.backgroundColor = `rgba(255, 255, 255, ${scale(
    loadNum,
    0,
    100,
    5,
    0
  )})`;
  loadingPageNumber.style.opacity = scale(loadNum, 0, 100, 5, 0);
};

let interval = setInterval(() => {
  load();
}, 30);

//getting api from sheets
async function getProjects() {
  let url = "https://sheet2api.com/v1/v1WQ0pOQAGkD/projects";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

//implementing days and links with api
async function renderUsers() {
  let projects = await getProjects();
  let html = "";
  let count = 0;
  projects.forEach((eachProject) => {
    count++;
    let htmlSegment = `<p> Day ${count
      .toString()
      .padStart(3, "0")} - <a target="_blank" href="${eachProject.site}">${
      eachProject.projectTitle
    }</a> </p>`;
    html += htmlSegment;
  });

  workBox.innerHTML = html;
  siteCount.textContent = count;
  dayCount.textContent = count;
}

renderUsers();
