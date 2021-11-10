import React, {Component} from 'react';
import axios from 'axios';
import Movie from '../components/Movie'
import './Home.css'

class Home extends Component{
    state = {
        isLoading: true,
        movies: []
    }

    getMovie = async () => {
        const{
            data:{
                data:{movies} //필요한 데이터만 불러옴
            }
        }
        = await axios.get('https://yts-proxy.now.sh/list_movies.json/sort_by=rating')
        this.setState({movies, isLoading:false})
    } //영화데이터 로딩하는걸 함수로 만듦

    componentDidMount() {
      this.getMovie()
      //함수를 불러옴
    }
    
    render() {
       const {isLoading, movies} = this.state
        return (
            <section className = 'container'>
            {isLoading ?(
                <div className = 'loader'>
                    <span className = 'loader-class'>Loading...</span>
                </div>
            )
            :
            (
            <div className = 'movies'>
             {
 movies.map((movie) => {
    return(
        <Movie
        key = {movie.id}
        year = {movie.year}
        title = {movie.title}
        summary = {movie.summary}
        poster = {movie.medium_cover_image}
        genres = {movie.genres}
        />
            )
                        }
           )
             }
          </div>
        )}
    </section>
            )
    }
}
export default Home;