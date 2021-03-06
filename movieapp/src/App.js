import React, { useState , useEffect} from 'react';
import './App.css';

function App() {
  const [inputVal, setinputVal] = useState();
  const [moviedetails, setmoviedetails] = useState([]);
  const [addfav, setaddfav]=useState("Add to favourites");
  // const [nodata, setnodata]=useState("IF APP DOESN'T WORK....PLEASE ASSUME API'S DAILY LIMIT HAS EXHAUSTED");
  const addmovie = (event) => {
    setinputVal(event.target.value);
  }
  // useEffect(()=>{
  //   setnodata("");
  // },[])
  useEffect(() => {
    setaddfav("Add to favourites");
  }, [moviedetails])
  
  const submitreq = async () => {
    try {
      const data = await fetch(`http://omdbapi.com/?t=${inputVal}&apikey=acae285b`);
      const obj = await data.json();
      setmoviedetails([obj]);
      console.log(moviedetails);
      setinputVal("");
    
    }
    catch (err) {
      console.log("the error is " + err);
    }
  }
  return (
    <div className="App">
    {/* <div>
      <p>{nodata}</p>
    </div> */}
    <div className="container">
    
        <input onChange={addmovie} placeholder="Enter movie name" value={inputVal}></input>
        <button disabled={!inputVal} onClick={submitreq} type="submit" >Search</button>
      </div>
      <div className="movie-wrapper">
      
        {
         moviedetails.map(({ Poster }, index) => {
            return (
              <div key={index} className="wrapper">
                <img src={Poster} alt="" ></img>
                <button onClick={()=>{
                  setaddfav("Added to favourites");
                }}>{addfav}</button>
              </div>
            )
          }) }
       </div>
      

    </div>
  );
}

export default App;
