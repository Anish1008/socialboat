import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import FormData from "form-data";
export default function App() {
  let cnt=0,cntr=0,c="",co="";
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [debounced,setDebounced] = useState(false);
  function handleChange(e) {
    // setTimer(setTimeout(()=>{
    //   setText(e.target.value);

    // },2000))
    // if(timer)
    // clearTimeout(timer);
    setText(e.target.value);
  }
  const [uniqueTags,setUniqueTags] = useState([])
  useEffect(() => {
    let timer = setTimeout(()=>{
      setSelected("")
      var data = new FormData();
      var numResults = 100;
      var config = {
        method: "get",
        url: `https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=${text}&numResults=${numResults}`,
  
        data: data
      };
      if (text) {
        axios(config)
          .then(function (response) {
            let tagArray=[];
let unique =[]
  let temp ="";
  response.data.results.map((data)=>{
    data.tags.map((res)=>{
      tagArray.push(res)
      return null
    })
  })
  tagArray.sort()
  tagArray.map((data)=>{
    if(data!==temp){
      unique.push(data)
      temp=data;
    }
    return null
  })
  setUniqueTags(unique)
  setDebounced(true)
            setResults(response.data.results);
            console.log(response.data.results);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },2000)
    return function(){
      clearTimeout(timer)
    }
  }, [text]);
  const [selected,setSelected]=useState("");
  console.log(selected)
  console.log(uniqueTags)
  return (
    <div className="App">
      <div className="head">
        <div className="logo">
            <img className="logo-img" src="https://media.istockphoto.com/vectors/vector-design-element-for-the-fitness-center-vector-id1035561592?k=20&m=1035561592&s=612x612&w=0&h=8MwrSK9UQ_cY7K6NrKbi5txxK1R_Nhue0FGrw3L1BiI=" alt=""/>
        </div>
        <div className="search">
            <input className="input" onChange={handleChange} type="text" name="search" placeholder="Search"id="search"/>
                <button className="button" type="button">submit</button>
        </div>
        <div className="prop">
            <img className="prop-img" src="https://media.istockphoto.com/vectors/vector-design-element-for-the-fitness-center-vector-id1035561592?k=20&m=1035561592&s=612x612&w=0&h=8MwrSK9UQ_cY7K6NrKbi5txxK1R_Nhue0FGrw3L1BiI=" alt=""/>
        </div>
    </div>
      <div>
      {(text && debounced) ? (
        <>
        <h2 className="filter">Filter by Tags</h2>
        <div className="Uniquetags">
      
          {uniqueTags.map((data)=>{
          return<div onClick={()=>setSelected(data)}>{data}</div>
          })}
        </div>
        <div className="cardHolder">
        {  selected ? (
        results.map((res) => {
          if(res.tags.includes(selected)){
          return (
            <div key={cntr++}>
                <div key={cnt++} className="card">
                  <div className="video-box">
              <video key={c+="a"}controls>
                <source src={res.video} type="video/mp4" />
              </video>
              </div>
              <h3 key={co+="b"}>{res.heading.substring(text.length+1)}</h3>
              <div className="tags">

              {res.tags.map((tag) => {
                return <span key={cntr++}>#{tag} </span>;
              })}
              </div>
              </div>
            </div>
          );}
        })): (
          results.map((res) => {
            return (
            <div key={cntr++}>
                <div key={cnt++} className="card">
                  <div className="video-box">
              <video key={c+="a"}controls>
                <source src={res.video} type="video/mp4" />
              </video>
              </div>
              <h3 key={co+="b"}>{res.heading.substring(text.length+1)}</h3>
              <div className="tags">

              {res.tags.map((tag) => {
                return <span key={cntr++}>#{tag} </span>;
              })}
              </div>
              </div>
            </div>
)}))}
        </div>
      </>
      ) : (
        <>
          <p>Nothing to display</p>
        </>
      )
      }
      </div>
    </div>
  );
}

