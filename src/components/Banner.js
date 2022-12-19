import React from 'react'
import "./Banner.css";

function Banner({movies}) {
    let desc=movies.overview;

   async function truncate(string, n){
       
        return string?.length>n?string.substring(0,n-1)+'...':string;
}
  return (
    <div>
        <div className='banner_container' style={{ 
            backgroundSize:"cover",
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies.backdrop_path})`,
             backgroundPosition:'center center' 
             }} >
            <div className='banner_content'>
            <div className='banner_img '></div>
            <div className='banner_title text-xl font-extrabold'><h1>{movies?.name||movies?.title||movies?.original_name}</h1></div>
            <div className='banner-buttons'>
                <button className='banner_button'>Play</button>
                <button className='banner_button'>My List</button>
            </div>
            <div className='banner_discription font-bold'>
             {movies.overview}

            </div>
           <div className='banner--fadeBottom'/>
            </div>
        </div>
    </div>
  )
}

export default Banner