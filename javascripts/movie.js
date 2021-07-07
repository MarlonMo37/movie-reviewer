class Movie {

    static all = []

    constructor({audience_rating, genres, poster_url, release_date, reviews = [], summary, title, id}) {
        this.audience_rating = audience_rating
        this.genres = genres
        this.poster_url = poster_url
        this.release_date = release_date
        this.reviews = reviews
        this.summary = summary
        this.title = title
        this.id = id
        Movie.all.push(this)
    }

   

    static findByName(title) {
        return this.all.find(function(movie) { movie.title === title})
    }

    static findById(id) {
        return this.all.find(movie => movie.id === id)
    }

    static findOrCreateBy(movie) {
        return this.findByName(movie.name) || new Movie(movie)
    }

    static handleMovieClick() {
        genreList.innerText = ""
        Movie.all.forEach( movie => {
            movie.movieInfo()
            let movieId = `${movie.title}-review-button`
            let reviewId = `${movie.title}-reviews-button`
            let theButton = () => document.getElementById(movieId)
            let reviewsButton = () => document.getElementById(reviewId)
            theButton().addEventListener('click', movie.renderReviewForm)
            reviewsButton().addEventListener('click', function(){movie.getReviews(movie)})
            // {debugger}
        })
    }

    movieInfo() {
        const div = document.createElement("div")
            
        div.innerHTML = `
        <table id="${this.id}">
            <tr>
                <th>
                    <img src="${this.poster_url}">
                </th>
                <td>
                    <h2>${this.title}</h2>
                    <h3>Release Date: ${this.release_date}</h3>
                    <h3>Summary: ${this.summary}</h3>
                    <h3>Audience Rating: ${this.audience_rating}/10<h3>
                    <h3>Reviews:</h3>
                    

                    <div id="${this.title}-reviews-button">
                        <button class="show-reviews-button">Show Reviews</button>
                    </div>

                    <div id="${this.title}-review-button">
                        <button class="add-review-button">Add Review</button>
                    </div>

                </td>
            </tr>  
        </table>
        `


        movieList.appendChild(div) 
    }

    getReviews() {
        let reviewId = `${this.title}-reviews-button`
        let reviewsButton = () => document.getElementById(reviewId)
        reviewsButton().nextElementSibling.innerHTML = `
            <button class="add-review-button">Add Review</button>
        `
        reviewsButton().innerHTML = ""
        if (this.reviews.length != 0) {
            this.reviews.forEach(review => {
                let reviewInfo = `
                    <h3>${review.written_review}</h3>
                    <h3>${review.rating}/5</h3>
                `
                reviewsButton().innerHTML += reviewInfo
            })
        } else {
            reviewsButton().innerHTML = `
            <h3>Sorry, but this movie doesn't have any reviews yet.
            `
        }
    }

    renderReviewForm() {
       
        this.previousElementSibling.innerHTML = `
            <button class="show-reviews-button">Show Reviews</button>
        `
        
        // let form = document.getElementById("review-form")
        // {debugger}
        // if (form != null) {
        //     form.remove()
        //     movieList.innerHTML = ""
        //     Movie.handleMovieClick()
        //     {debugger}
        // }
        const div = this.querySelector(".add-review-button").parentElement

        div.innerHTML = `
        <form id="review-form">
            <input type="hidden" value="${this.id}">
            <label for="movie-review">Your Review</label>
            <textarea></textarea><br></br>
            <style>
            .checked {
                color: orange;
            }
            </style>
            <div>
                <label for="movie-stars">Star Rating 1-5</label>
                    <div id="stars">
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
            </div>
            <input type="submit">
        </form>
        `
        let reviewForm = () => document.getElementById("review-form")

        const all = document.querySelectorAll('.fa')
        all.forEach( star => {
            star.addEventListener('click', Movie.fillStars)
        })
        
        reviewForm().addEventListener("submit", ReviewApi.handleSubmit)
    }

    static fillStars() {
        this.nextElementSibling

        const all = document.querySelectorAll('.fa')
        all.forEach(star => {
            star.classList.remove('checked')
        })

        this.classList.add('checked')
        let node = this
        do {
            let newNode = node.previousElementSibling
            newNode.classList.add('checked')
            node = newNode
        } while (node != null)
    }


    
}




