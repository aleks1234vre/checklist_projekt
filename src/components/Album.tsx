import Card from "./Card.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

const Album = () => {
 const [cards, setCards] =
     useState([]);

 const loadBlogs = async () => {
     const res =
         await axios.get('http://localhost:3000/tasks');
     setCards(res.data);
 }

 useEffect(()=>{loadBlogs()},[]);


  return (
      <>
          <div className="album py-5 bg-body-tertiary">
              <div className="container">

                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                      {
                          cards.map((card:any,i)=>{
                              return <Card cardData={card} key={i}/>;
                          })
                      }
                  </div>
              </div>
          </div>
      </>
  )
}

export default Album;