import axios from './../axios';
import React, { useEffect, useState } from 'react'
import "./Row.css"
import { useNavigate } from 'react-router-dom';

function Row({fetchUrl,isLarge,title}) {
    const [posters,setPoster]=useState();
    const navigate=useNavigate();
    useEffect(()=>{
        async function fetchMovies(){
          const request=await axios.get(fetchUrl);
          setPoster(request.data.results);
          console.log(request.data)
          return request;
        }
        fetchMovies();
     },[])

     function detailPageHandler(id){
         navigate(`/movie/${id}`);
     }
  
  return (
  <div>
     <h2 style={{color:"white",marginLeft:"10px"}} className='font-bold text-xl'>{title}</h2>
       {posters? ( <div className='row_posters '>
       
            {posters.map((poster)=>{
               return(
                  
                      <img key={poster.id} onClick={()=>detailPageHandler(poster.id)} className='row_poster' src={`https://image.tmdb.org/t/p/original/${poster?.poster_path}`}/>
                )
               
             })}
             </div>):(<div>Loading...</div>)

    }
    </div>
  )
}

export default Row