import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import requests from "../../request";
import Row from "../Row";

function MovieDetail() {
  const params = useParams();
  const [detail, setDetail] = useState();
  const [videoDetail, setVideoDetail] = useState();
  const API_KEY=process.env.REACT_TMBD_KEY;
  async function fetchDetails() {
    const request = await axios.get(
      `/movie/${params.id}?api_key=${API_KEY}&language=en-US`
    );
    setDetail(request.data);
    console.log(request.data);
  }
  async function fetchVideoDetail() {
    const request = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${API_KEY}&language=en-US`
    );
    setVideoDetail(request.data);
  }
  console.log(videoDetail);
  function renderMovie() {
    let trailer = videoDetail.results.find(
      (vid) => vid.name === "Official Trailer" || "Offical Promo"
    );
    console.log(trailer);
    return (
      <YouTube
        className=" relative w-[100vw] h-[65vh] mt-[-13em]"
        videoId={trailer.key}
        opts={{
          width: "100%",
          height: "100%",
        }}
      />
    );
  }
  useEffect(() => {
    fetchDetails();
    fetchVideoDetail();
  }, []);
  let percentage = Math.round(100 - detail?.vote_average);
  return (
    <div className=" h-[100vh]">
      <div className=" w-auto   ">{videoDetail ? renderMovie() : null}</div>

      <div className=" absolute top-[80%]  ml-5">
        <div className=" text-white mb-2">
          Title-
          <div className=" text-3xl font-bold">
            {detail?.original_title} (Match for you :
            <span className=" text-green-500"> {percentage}%</span>)
          </div>
        </div>
        <div className="flex flex-row gap-10 mt-6">
        <div className=" text-white  mb-2 text-lg font-bold bg-purple-500 rounded-lg p-3">
          popularity -{detail?.popularity}
        </div>
        <div className=" text-white  mb-2 text-lg font-bold  bg-purple-500 rounded-lg p-3">
          Status -{detail?.status}
        </div>
        <div className=" text-white  mb-2 text-lg font-bold  bg-purple-500 rounded-lg p-3">
          Genres -{detail?.genres[0].name}
        </div>
        <div className=" text-white  mb-2 text-lg font-bold  bg-purple-500 rounded-lg p-3">
          Runtime -{detail?.runtime} minutes
        </div>
        </div>
        <div className=" text-white text-xl mb-7 mt-6">
          Description-
          <div className=" font-bold text-lg mt-2">{detail?.overview}</div>
        </div>
        <Row title={"More Like This"} fetchUrl={requests.fetchTopRated} isLarge={true}/>
      </div>
     
    </div>
  );
}

export default MovieDetail;
