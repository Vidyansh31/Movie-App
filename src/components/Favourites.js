import React, { Component } from "react";
import { movies } from "../movieData";
export class Favourites extends Component {
  constructor() {
    super();

    this.state = {
      genres: [],
      currGenre: "All Genres",
      movies: [],
      currText: "",
      movieCount: "5",
      currPage: 1,
    };
  }

  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("Movies") || "[]");
    let tempArr = [];

    data.map((movieObj) => {
      if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
        tempArr.push(genreids[movieObj.genre_ids[0]]);
      }
    });

    tempArr.unshift("All Genres");

    this.setState({
      movies: [...data],
      genres: [...tempArr],
    });
  }

  handleGenreChange = (genre) => {
    this.setState({
      currGenre: genre,
    });
  };

  sortPopularityDesc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objB.popularity - objA.popularity;
    });

    this.setState({
      movies: [...temp],
    });
  };

  sortPopularityAsc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    });

    this.setState({
      movies: [...temp],
    });
  };

  sortRatingDesc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    });

    this.setState({
      movies: [...temp],
    });
  };

  sortRatingAsc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });

    this.setState({
      movies: [...temp],
    });
  };

  handleDelete = (movie) => {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let temp = JSON.parse(localStorage.getItem("Movies"));

    temp = temp.filter((m) => m.id != movie.id);

    localStorage.setItem("Movies", JSON.stringify(temp));

    let tempArr = [];

    temp.map((movieObj) => {
      if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
        tempArr.push(genreids[movieObj.genre_ids[0]]);
      }
    });

    tempArr.unshift("All Genres");

    this.setState({
      movies: [...temp],
      genres: [...tempArr],
    });
  };

  handlePageChange = (page) => {
    this.setState({
      currPage: page,
    });
  };

  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let filterArr = [];

    if (this.state.currText === "") {
      filterArr = this.state.movies;
    } else {
      filterArr = this.state.movies.filter((movieObj) => {
        let title = movieObj.title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase().trim());
      });
    }

    if (this.state.currGenre != "All Genres") {
      filterArr = this.state.movies.filter(
        (movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currGenre
      );
    }

    let pages = Math.ceil(filterArr.length / this.state.movieCount);
    let pagesArr = [];
    for (let i = 1; i <= pages; i++) {
      pagesArr.push(i);
    }

    let si = (this.state.currPage - 1) * this.state.movieCount;
    let li = si + this.state.movieCount;

    filterArr = filterArr.slice(si, li);

    return (
      <>
        <div className="main">
          <div className="row">
            <div className="col-3">
              <ul className="list-group genre-table">
                {this.state.genres.map((genre) =>
                  this.state.currGenre == genre ? (
                    <li
                      style={{
                        backgroundColor: "#3f51b5",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      className="list-group-item"
                    >
                      {genre}
                    </li>
                  ) : (
                    <li
                      style={{ color: "#3f51b5" }}
                      className="list-group-item"
                      onClick={() => this.handleGenreChange(genre)}
                    >
                      {genre}{" "}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="col-8 favourite-table ">
              <div className="row ">
                <input
                  type="text"
                  placeholder="Search"
                  className="input-group-text col"
                  value={this.state.currText}
                  onChange={(e) => this.setState({ currText: e.target.value })}
                />
                <input
                  type="number"
                  className="input-group-text col"
                  value={this.state.movieCount}
                  onChange={(e) =>
                    this.setState({ movieCount: e.target.value })
                  }
                />
              </div>
              <div className="row ">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">
                        <i
                          className="fa-solid fa-sort-up "
                          onClick={this.sortPopularityDesc}
                        ></i>
                        Popularity
                        <i
                          className="fa-solid fa-sort-down"
                          onClick={this.sortPopularityAsc}
                        ></i>
                      </th>
                      <th scope="col">
                        <i
                          className="fa-solid fa-sort-up"
                          onClick={this.sortRatingDesc}
                        ></i>
                        Rating
                        <i
                          className="fa-solid fa-sort-down"
                          onClick={this.sortRatingAsc}
                        ></i>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterArr.map((movieElem) => (
                      <tr>
                        <th scope="row">
                          <img
                            src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`}
                            style={{ width: "6rem", paddingRight: "1rem" }}
                          />
                          {movieElem.title}
                        </th>
                        <td>{genreids[movieElem.genre_ids[0]]}</td>
                        <td>{movieElem.popularity}</td>
                        <td>{movieElem.vote_average}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => this.handleDelete(movieElem)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {pagesArr.map((page) => (
                      <li className="page-item">
                        <a className="page-link" onClick={() => this.handlePageChange(page)}>{page}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Favourites;
