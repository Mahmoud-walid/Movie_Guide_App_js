let movieNameRef = document.getElementById('movie_name')
const searchBtn = document.getElementById('search_btn')
let result = document.getElementById('result')

// fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=bb7b1373`

    // input is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`
    }
    // input isn't empty
    else {
        fetch(url)
            .then((Response) => Response.json())
            .then((data) => {
                // movie exist in db
                if (data.Response == "True") {
                    result.innerHTML = `
                    <div class="info">

                        <img class="poster" src="${data.Poster}">
            
                        <div class="info_content">
                            <h2 class="title">${data.Title}</h2>
                
                            <div class="rating">
                                <i class="fa-solid fa-star" style="color: #ffb92a;"></i>
                                <h4 class="imdbRating">${data.imdbRating}</h4>
                            </div> <!--rating-->
                
                            <div class="details">
                                <span class="rated">${data.Rated}</span>
                                <span class="year">${data.Year}</span>
                                <span class="runtime">${data.Runtime}</span>
                                <span class="type">${data.Type}</span>
                                <div>${data.Country.split(",").join("<span> | </span>")}</div>
                            </div> <!-- details -->
                
                            <div class="genre">
                                <div class="genre_content">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div> <!-- genre_content -->
                            </div> <!-- genre -->

                            <div class="language">
                                <div class="language_content">
                                    <div>${data.Language.split(",").join("</div><div>")}</div>
                                </div>  <!-- language_content -->
                            </div>  <!-- language -->
                
                            <div class="plot_detail">
                                <h3>Plot:</h3>
                                <p class="plot">${data.Plot}</p>
                            </div> <!-- plot_detail -->
                    
                            <div class="cast_detail">
                                <h3 class="cast">Cast:</h3>
                                <p class="actors">${data.Actors}</p>
                            </div> <!-- cast_detail -->
                        
                            <div class="writer_detail">
                                <h3 class="writer">Writer:</h3>
                                <p class="writers">${data.Writer}</p>
                            </div> <!-- writer_detail -->
                        
                        </div> <!-- info_content -->
            
                    </div> <!--info-->`
                }
                // movie doesn't exist in db
                else {
                    result.innerHTML = `<h3 class ="msg">${data.Error}</h3>`
                }
            })
            .catch(() => {
                result.innerHTML = `<h3 class ="msg">Error Occured</h3>`
            })
    }
}

searchBtn.addEventListener("click", getMovie)
movieNameRef.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        searchBtn.click()
    }
})

window.addEventListener("load", getMovie)



// link API
// https://www.omdbapi.com/