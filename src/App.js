import React, { useEffect } from 'react';
import './App.css';
import NavTop from './components/NavTop';
import NavBottom from './components/NavBottom';
import Wrapper from './components/Wrapper'

function App() {
  const  limitWrapperHeight = () => {
    const body = document.documentElement.clientHeight;
    const nav1 = document.getElementById("first-nav").clientHeight;
    const nav2 = document.getElementById("second-nav").clientHeight;
    const wrapper = document.getElementById("wrapper");
    wrapper.style.maxHeight = (body - nav1 - nav2 - 5) + "px";
    wrapper.style.minHeight = (body - nav1 - nav2 - 5) + "px";
  };

  useEffect(() => {
    limitWrapperHeight();
  }, []);

  return (
    <div className="App">
      <NavTop />
      <NavBottom />
      <Wrapper />
    </div>
  );
}

export default App;
