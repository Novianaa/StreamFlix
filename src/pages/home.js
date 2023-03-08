import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../assets/home.css'
import logo from '../logo.svg';
import { GetMovies } from '../store/actions/movies';

function Home() {
  const dispatch = useDispatch()
  const [query, setQuery] = useSearchParams()
  const navigate = useNavigate()
  let { data, loading } = useSelector((s) => s.movie)
  const [paginate, setPaginate] = useState({ page: query.get('page') ?? 1 })

  useEffect(() => {
    dispatch(GetMovies(paginate))
  }, [dispatch, paginate])

  let totalPage = Array(data.total_pages).fill() ?? []
  const handlePaginate = (page) => {
    setPaginate(() => ({ page }))
    query.set('page', page)
    setQuery(query)
  }
  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Author: Novia,
        Name Web : StreamFlix"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Nova+Round&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
        <title>StreamFlix</title>
      </Helmet>
      <nav className='wrapper-nav'>
        <div className=' container'>StreamFlix</div>
      </nav>
      <section className='wrapper-body'>
        <div className="container">
          <div className="now"> Now Playing</div>
          <div className="wrapper-movie">
            <div className="wrapper-movie-list">
              {data.results?.map((item) => {
                return (
                  <div className=" text-center custom-col">
                    <div className="card-list-movie">
                      <div className="card-list-content-text ">
                        <img crossOrigin="anonymous" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="poster" alt={item.title} />
                        <h6 className="fw-bold font-title m-2">{item.title}</h6>
                        <p className="poppins-400 text-muted">{item.vote_average > 8 ? 'Rp. 21.250' : item.vote_average > 6 && item.vote_average < 8 ? 'Rp. 16.350' : item.vote_average > 3 && item.vote_average < 6 ? 'Rp. 8.250' : 'Rp. 3.500'}</p>
                        <Link to='/detail' className='text-decoration-none'>
                          <div className='btn-custom fw-bold'>Details</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={data.total_pages}
            onPageChange={(page) => handlePaginate(page.selected + 1)}
            containerClassName={"pagination"}
            disabledClassName={"pagination__disabled"}
            activeClassName={"pagination__active"}
          />
        </div>
      </section>
    </>
  );
}

export default Home;