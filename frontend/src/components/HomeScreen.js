import axios from "./../axios";
import requests from "../request";
import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import Nav from "./Nav";
import SignUpScreen from "./SignUpScreen";
import Banner from "./Banner";
import Row from "./Row";
import List from "./List";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged, SignInMethod } from "firebase/auth";
import SignInScreen from "./SignInScreen";
import { auth } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import UserProfile from "./UserProfile/UserProfile";
import MovieDetail from "./MovieDetail/MovieDetail";
import { UserData } from "../context/DataContext";
import NotSub from "./NotSub";

function HomeScreen() {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);
  const { getUserData } = UserData();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchMovies() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchMovies();
  }, []);
 useEffect(()=>{
   if(user){
    getUserData(user.uid).then((res)=>{
      setData(res)
    })
   }
 },[user])

  return (
    <BrowserRouter>
      <div className="homeScreen">
        <Nav />
        <Routes>
          //add a proctected route to make it more smooth
          <Route
            path="/"
            element={
              user == null ? (
                <SignInScreen />
              ) : (
                <div>
                  <Banner movies={movies} />
                  <div className="movies_list">
                    <List />
                  </div>
                </div>
              )
            }
          />
          <Route path="/login" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/user/profile" element={<UserProfile />} />
          {data?.status?
            <Route path="/movie/:id" element={<MovieDetail />} />:
            (
              <Route path="/movie/:id" element={<NotSub/>} />
            )


          }
         
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default HomeScreen;
