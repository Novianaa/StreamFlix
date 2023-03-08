import axios from "axios"

const GetMoviesPending = () => {
  return {
    type: 'GET_MOVIES_REQUEST'
  }
}
const GetMoviesSuccess = (data) => {
  return {
    type: 'GET_MOVIES_SUCCESS',
    payload: data
  }
}
const GetMoviesError = (err) => {
  return {
    type: 'GET_MOVIES_ERROR',
    payload: err

  }
}
export const GetMovies = ({ page = 1 }) => {
  let api = '4e5648353af3a203822dab94b135cfc4'
  return async (dispatch) => {
    try {
      dispatch(GetMoviesPending())
      const result = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${api}&language=en-US&page=${page}`,
      })
      dispatch(GetMoviesSuccess(result.data))
    }
    catch (err) {
      console.log(err)
      dispatch(GetMoviesError(err.response.data))
    }
  }
}