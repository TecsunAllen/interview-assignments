import React from "react";
import SlideBar from "./components/SlideBar";
import "./App.css";

function App() {
  const onCardChange = function (index: number) {
    console.log(index)
  }
  return <div className="App"><SlideBar number={3} intervalTime={3000} onChange={onCardChange}>
  </SlideBar></div>;
}

export default App;
