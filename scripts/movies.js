// Implement debouncing for network request
// On clicking book now store the selected movie in localstorage as key "movie"
// so that you can retrive it on checkout.html page

let movies_div = document.querySelector('movies')

let id

async function movieSearch() {
  try {
    let query = document.querySelector('#search').value

    let res = await fetch(`https://www.omdbapi.com/?apikey=6a41ddca&s=${query}`)

    let data = await res.json()

    let movies = data.Search

    return movies
  } catch (err) {
    console.log(err)
  }
}

function appendMovies(data) {
  movies_div.innerHTML = null

  data.forEach(function (ele) {
    let innerdiv = document.createElement('div')
    innerdiv.setAttribute('class', 'movie_tab')

    let image = document.createElement('img')
    image.src = ele.Poster

    let title = document.createElement('p')
    title.innerText = ele.Title

    let button = document.createElement('button')
    button.innerText = 'Book Now'
    button.setAttribute('class', 'book_now')
    button.addEventListener('click', function () {
      bookNow(ele)
    })

    innerdiv.append(image, title, button)

    movies_div.append(innerdiv)
  })
}

async function main() {
  let data = await movieSearch()

  if (data === undefined) {
    return false
  }

  appendMovies(data)
}

function debounce(func, delay) {
  if (id) {
    clearTimeout(id)
  }

  id = setTimeout(function () {
    func()
  }, delay)
}

function bookNow(ele) {
  let selectMovie = JSON.parse(localStorage.getItem('movie')) || []
  selectMovie.push(ele)

  localStorage.setItem('movie', selectMovie)
}
