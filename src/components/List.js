import React from 'react'
import requests from '../request'
import Row from './Row'

function List() {
  return (
    <>
     <Row title={"Netflix originals"} fetchUrl={requests.fetchNetflixOriginals} isLarge={true}/>
      <Row title={"Top rated"} fetchUrl={requests.fetchTopRated} isLarge={true}/>
      <Row title={"Trending"} fetchUrl={requests.fetchTrending} isLarge={true}/>
      <Row title={"Action Movies"} fetchUrl={requests.fetchActionMovies} isLarge={true}/>
      <Row title={"Comedy Movies"} fetchUrl={requests.fetchComedyMovies} isLarge={true}/>
      <Row title={"Documentaries"} fetchUrl={requests.fetchDocumentaries} isLarge={true}/>
      <Row title={"Horror Movies"} fetchUrl={requests.fetchHorrorMovies} isLarge={true}/>
      <Row title={"Romance Movies"} fetchUrl={requests.fetchRomanceMovies} isLarge={true}/>
    </>
  )
}

export default List