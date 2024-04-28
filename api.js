let currentIndex = 0; // Tracks the current index of data being displayed
const increment = 5;

function loadData(limit) {
  // load data
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools, limit));
}
function displayData(data, limit) {
  let SeeMoreBtn = document.getElementById("see-more");
  let cardContainer = document.getElementById("card-container");

  // Determine the slice of data to display
  let endIndex = currentIndex + increment;
  let partOfData = data.slice(currentIndex, endIndex);

  partOfData.forEach((technology) => {
    console.log(technology);
    let div = document.createElement("div");
    div.classList.add("col");

    // card info
    div.innerHTML = `
    <div class="card">
    <img src="${
      technology.image
    }" alt='no image found ' height= '200px'class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">features:
          
    </h5>
    <li>${technology.features[0] || "no data found"}</li>
    <li>${technology.features[1] || "no data found"}</li>
    <li>${technology.features[2] || "no data found"}</li>
    </div>
    <div class="card-footer">
        <h2>${technology.name}</h2> 
        <h2>${technology.published_in}</h2> 
        </div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#technologyModal" onclick=detailsOfTechnology('${
          technology.id
        }')>
        Details
</button>
  </div>
        `;

    // append child
    cardContainer.appendChild(div);
  });

  currentIndex += increment; // Update the current index

  // Hide the button if we have loaded all the data
  if (currentIndex >= data.length) {
    SeeMoreBtn.classList.add("d-none");
  }
  spinnerToggle(false);
}

loadData();
function seeMore() {
  spinnerToggle(true);

  loadData();
}

// spinner toggle handled
function spinnerToggle(isLoading) {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
}
const detailsOfTechnology = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((details) => displayDetailsOfTechnology(details.data));
};
const displayDetailsOfTechnology = (details) => {
  console.log(details);
  const technologyInfo = document.getElementById("technology-body");

  technologyInfo.innerHTML = `
  <div class="row">
          <div class="col-md-6 border border-primary bg-info-subtle">
            <div>
              <h6>${details.description}</h6>
            </div>
          <div class='d-flex'>

          <div class='bg-success-subtle m-2 p-2 rounded text-danger'>
            <b>${details.pricing[0].price}</b>
            <b>${details.pricing[0].plan}</b>
          </div>

          <div class='bg-success-subtle m-2 p-2 rounded text-success'>
            <b>${details?.pricing[1]?.price}</b>
            <b>${details.pricing[1].plan}</b>
          </div>
          <div class='bg-success-subtle m-2 p-2 rounded text-primary'>
          <b>${details.pricing[2].price}</b>
          <b>${details.pricing[2].plan}</b>
          </div>
          </div>
            <div class="row">
              <div class="col-md-6 " >
              <h4>Features</h4>
              <ul>
              <li>${details.features["1"].feature_name}</li>
              <li>${details.features["2"].feature_name}</li>
              <li>${details.features["3"].feature_name}</li>
              
             
              </div>
              <div class="col-md-6 " >
              <h4>Integrations</h4>
              <ul>
              <li>${details.integrations[0]}</li>
              <li>${details.integrations[1]}</li>
              <li>${details.integrations[2]}</li>
            
              </ul>
             
              </div>
            </div>


          </div>
          <div class="col-md-6 border border-primary"> <div class="position-relative">
          <img src="${
            details.image_link[0]
          }" alt="no image found" height="200px" class="img-fluid"/>
          ${
            details.accuracy.score > 0
              ? `<div class="position-absolute top-0 end-0 bg-light text-dark p-2 m-2 rounded">
                  <p>${(details.accuracy.score * 100).toFixed(2)} % accuracy</p>
                 </div>`
              : ""
          }
        </div>
          <h4>${details.input_output_examples[0].input}</h4>
          <p>${details.input_output_examples[0].output}</p>
          </div>
        </div>`;
};
