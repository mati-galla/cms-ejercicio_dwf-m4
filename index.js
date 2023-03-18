async function fetchData() {
  const response = await fetch(
    "https://cdn.contentful.com/spaces/oiq4ay65yvgc/environments/master/entries" +
      "/?select=fields&access_token=4R9d9L4iiCQQx1NzMOWC0w8envXKhBAndFyql9oOAoU" +
      "&content_type=work"
  );
  const data = await response.json();
  return data;
}

function createShowcases(info) {
  const showcasesContainer = document.querySelector(".showcases-container");
  const items = info.items;
  const assets = info.includes.Asset;
  const template = document.querySelector("#project-item");
  let n = 0;
  for (i of items) {
    const clone = template.content.cloneNode(true);
    const projectImage = clone.querySelector(".project-image");
    projectImage.src = assets[n].fields.file.url;
    projectImage.alt = assets[n].fields.title;
    n++;
    const projectTitle = clone.querySelector(".project-title");
    projectTitle.textContent = i.fields.title;
    projectTitle.title = i.fields.title;
    const projectDescription = clone.querySelector(".project-description");
    projectDescription.textContent = i.fields.description;
    const projectLink = clone.querySelectorAll(".project-link");
    projectLink.forEach((e) => (e.href = i.fields.url));
    const showMoreState = clone.querySelector(".show-more-state");
    showMoreState.id = "show-more-" + n;
    const showMoreTrigger = clone.querySelector(".show-more-trigger");
    showMoreTrigger.htmlFor = "show-more-" + n;

    showcasesContainer.appendChild(clone);
  }
}

function main() {
  fetchData().then((r) => {
    console.log(r);
    createShowcases(r);
  });
}
main();
