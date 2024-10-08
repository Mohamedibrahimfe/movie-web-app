// options variable
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE0NzI4ZWJjMThlMTk4OWY0ZmM4OTJiYzdlMDJhMiIsIm5iZiI6MTcxOTM2MDM2OS44MzM2NjEsInN1YiI6IjY2N2E0ZTIwOTA4MjgyNDYxMDU3M2Y0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PyySv-16ttssB8kVG2Obx3epUuSJNgitU-vSzfTWLdI",
  },
};
// fill the hero section
fetch(`${baseUrl}/discover/movie?api_key=${apiKey}`)
  .then((response) => response.json())
  .then(function (data) {
    let movies = data.results;
    movies.map((movie) => {
      let content = `
            <div onclick="getMovieDetails(${
              movie.id
            })" class="owl-carousel-info-wrap item">
                    <img src="${baseImageUrl}${
        movie.poster_path
      }" class="owl-carousel-image img-fluid" alt="">
                    <img src="images/${
                      movie.adult ? "verified" : "18"
                    }.png" class="owl-carousel-verified-image img-fluid" alt="">
                    <div class="owl-carousel-info">
                            <h4 class="mb-2">
                                ${movie.original_title}
                            </h4>
                            <span class="badge">Lang ${
                              movie.original_language
                            }</span>
                            <span class="badge">Rate: ${
                              movie.vote_average
                            }</span>
                    </div>
            </div>
        `;
      document.querySelector(".owl-carousel").innerHTML += content;
      // scroll()
    });
    $(".owl-carousel").owlCarousel({
      center: true,
      loop: true,
      margin: 30,
      autoplay: true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 2,
        },
        767: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
  });

// fill detaildMovie section
function getMovieDetails(id) {
  fetch(`${baseUrl}/movie/${id}`, options)
    .then((response) => response.json())
    .then(function (data) {
      const latestPodcast = document.getElementById("latestPodcast");
      content = `
                <div class="col-lg-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block d-flex">
                                <div class="">
                                    <div class="custom-block-icon-wrap">
                                        <div class="section-overlay"></div>
                                        <a href="detail-page.html" class="custom-block-image-wrap">
                                            <img src="${baseImageUrl}${data.poster_path}" class="custom-block-image img-fluid" alt="">

                                            <a href="#" class="custom-block-icon">
                                                <i class="bi-play-fill"></i>
                                            </a>
                                        </a>
                                    </div>

                                    <div class="mt-2">
                                        <a href="${data.homepage}" class="btn custom-btn">
                                            HomePage
                                        </a>
                                    </div>
                                </div>

                                <div class="custom-block-info">
                                    <div class="custom-block-top d-flex mb-1">
                                        <small class="me-4">
                                            <i class="bi-chat-square custom-icon"></i>
                                            ${data.tagline}
                                        </small>
                                    </div>

                                    <h5 class="mb-2">
                                        <a href="detail-page.html">
                                            ${data.original_title}
                                        </a>
                                    </h5>

                                    <div class="profile-block d-flex">
                                        <img src="images/verified.png" class="profile-block-image img-fluid" alt="">

                                        <p>
                                            
                                            <strong>${data.vote_average}</strong></p>
                                    </div>

                                    <p class="mb-0 overview">${data.overview}</p>

                                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" class="bi-eye me-1">
                                            <span>${data.popularity}</span>
                                        </a>
                                    </div>
                                </div>

                                <div class="d-flex flex-column ms-auto">
                                    <a href="#" class="badge ms-auto">
                                        <i class="bi-heart"></i>
                                    </a>

                                    <a href="#" class="badge ms-auto">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                `;
      latestPodcast.innerHTML = content;
      scroll("land");
    });
}

// scroll to (specified id)
function scroll(id) {
  document.getElementById(`${id}`).scrollIntoView(true);
}

// fill discover section
fillDiscoverSection();
function fillDiscoverSection() {
  let discoverSection = document.getElementById("Discover");
  fetch(
    `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=created_at.asc`,
    options
  )
    .then((response) => response.json())
    .then(function (response) {
      let moviesGot = response.results.slice(0, 4);
      moviesGot.map((movie) => {
        const title = movie.original_title.split("  ");
        title.slice(0, 3);
        content = `
            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                    <div class="custom-block custom-block-overlay">
                            <a href="detail-page.html" class="custom-block-image-wrap">
                                <img src="${baseImageUrl}${movie.poster_path}" class="custom-block-image img-fluid" alt="">
                            </a>
                        <div class="custom-block-info custom-block-overlay-info">
                            <h5 class="mb-1">
                                <a href="listing-page.html">
                                    ${title}
                                </a>
                            </h5>
                            <p class="badge mb-0">${movie.vote_average}</p>
                        </div>
                    </div>
            </div>`;
        discoverSection.innerHTML += content;
      });
    });
}

// fill trinding section
fillTrending();
function fillTrending() {
  fetch(
    `${baseUrl}/trending/movie/week?api_key=${apiKey}&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then(function (data) {
      let movies = data.results.slice(0, 4);
      trending = document.getElementById("trending");
      movies.map((movie) => {
        content = `
            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-full">
                                <div class="custom-block-image-wrap">
                                    <a href="detail-page.html">
                                        <img src="${baseImageUrl}${movie.poster_path}" class="custom-block-image img-fluid" alt="">
                                    </a>
                                </div>

                                <div class="custom-block-info">
                                    <h5 class="mb-2">
                                        <a href="detail-page.html">
                                            ${movie.original_title}
                                        </a>
                                    </h5>

                                    <p class="mb-0 overview">${movie.overview}</p>

                                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" class="bi-heart me-1">
                                            <span>${movie.vote_average}</span>
                                        </a>

                                        <a href="#" class="bi-eye me-1">
                                            <span>${movie.popularity}</span>
                                        </a>

                                        <a href="#" class="bi-translate me-1">
                                            <span>${movie.original_language}</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="social-share d-flex flex-column ms-auto">
                                    <a href="#" class="badge ms-auto">
                                        <i class="bi-heart"></i>
                                    </a>
                                    <a href="#" class="badge ms-auto">
                                        <i class="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
            `;
        trending.innerHTML += content;
      });
    });
}
// search
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(
    `${baseUrl}/search/movie?query=${this.search.value}&include_adult=false&language=en-US`,
    options
  )
    .then((response) => response.json())
    .then(function (response) {
        document.getElementById("searchContainer").innerHTML = "";
        if(this.search.value == ""){
            return;
        }
        const myModal = new bootstrap.Modal(document.getElementById('searchModal'))
        myModal.show();
        response.results.map((movie) => {
        const title = movie.title.split(" ");
        title.slice(0, 3);
        console.log(title);
        content=`
            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 ">
                    <div class="custom-block custom-block-overlay movie">
                            <a href="detail-page.html" class="custom-block-image-wrap">
                                <img src="${baseImageUrl}${movie.poster_path}" class="custom-block-image " alt="">
                            </a>
                        <div class="custom-block-info custom-block-overlay-info">
                            <h5 class="mb-1">
                                <a href="listing-page.html" class="text-white">
                                    ${title}
                                </a>
                            </h5>
                            <p class="badge bg-dark mb-0">${movie.vote_average}</p>
                        </div>
                    </div>
            </div>`;
            document.getElementById("searchContainer").innerHTML += content;
        })
    });
   
});