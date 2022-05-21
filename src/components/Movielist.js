import React, { Component } from "react";
import axios from "axios";
// import { movies } from "../movieData";
export class Movielist extends Component {
  constructor() {
    super();

    this.state = {
      hover: "",
      parr: [1],
      movies: [],
      currPage: 1,
      favourites: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=1595a54c6056f3931bd3f35fe1d4dc7a&language=en-US&page=${this.state.currPage}`
    );
    // console.log(res);

    const movieData = res.data;
    // console.log(movieData);

    this.setState({
      movies: [...movieData.results],
    });
  }

  changeMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=1595a54c6056f3931bd3f35fe1d4dc7a&language=en-US&page=${this.state.currPage}`
    );
    // console.log(res);

    const movieData = res.data;
    // console.log(movieData);

    this.setState({
      movies: [...movieData.results],
    });
  };

  handleNext = () => {
    let tempArr = [];

    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      tempArr.push(i);
    }

    this.setState(
      {
        parr: [...tempArr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );

    console.log(tempArr);
  };

  handlePrevious = () => {
    if(this.state.currPage != 1){
      this.setState({
        currPage: this.state.currPage - 1
      },this.changeMovies)
    }
  };

  handlePageClick = (value) => {
      if(value != this.state.currPage){} {
        this.setState({
          currPage: value
        },this.changeMovies)
      }
  }

  handleFavourites = (movieObj) => {
      let oldData = JSON.parse(localStorage.getItem('Movies') || '[]');

      if(this.state.favourites.includes(movieObj.id)){
          oldData = oldData.filter((movie) => movie.id != movieObj.id);
      }

      else{
        oldData.push(movieObj);
      }

      localStorage.setItem('Movies', JSON.stringify(oldData));
      // console.log(oldData);

      this.handleFavouritesState();
  }

  handleFavouritesState = () => {
    let oldData = JSON.parse(localStorage.getItem('Movies') || '[]');
    let temp =  oldData.map((movie) => movie.id);;
    // console.log(temp);

    this.setState({
      favourites : [...temp],
    })

  }

  render() {
    // let moviesArr = movies.results;
    // console.log(moviesArr);
    return (
      <>
        <h3 className="text-center ">
          <strong>Trending</strong>{" "}
        </h3>

        <div className="movie-list">
          {this.state.movies.map((movieElem) => (
            <div
              className="card movie-card"
              onMouseEnter={() => this.setState({ hover: movieElem.id })}
              onMouseLeave={() => this.setState({ hover: "" })}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`}
                className="card-img-top movie-img"
                style={{ height: "40vh", width: "20vw" }}
                alt="..."
              />
              <h5 className="card-title movie-title">{movieElem.title}</h5>

              <div
                className="button-wrapper"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {movieElem.id === this.state.hover && (
                  <a className="btn btn-primary addBtn" onClick= {() => this.handleFavourites(movieElem)}>
                   {this.state.favourites.includes(movieElem.id) ? "Remove From Favorites" : "Add to Favorites"}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" onClick={this.handlePrevious}>
                  Previous
                </a>
              </li>
              {this.state.parr.map((value) => (
                <li className="page-item" >
                  <a className="page-link" onClick={() => this.handlePageClick(value)}>{value}</a>
                </li>
              ))}
              <li className="page-item">
                <a className="page-link" onClick={this.handleNext}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default Movielist;
