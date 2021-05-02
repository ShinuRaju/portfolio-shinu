let workBox = document.querySelector(".work .container .box");

async function getProjects() {
  let url = "https://sheet2api.com/v1/v1WQ0pOQAGkD/projects";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderUsers() {
  let projects = await getProjects();
  let html = "";
  let count = 0;
  projects.forEach((eachProject) => {
    count++;
    let htmlSegment = `<p> Day ${count} <a target="_blank" href="${eachProject.site}">${eachProject.projectTitle}</a> </p>`;
    html += htmlSegment;
  });

  workBox.innerHTML = html;
}

renderUsers();
