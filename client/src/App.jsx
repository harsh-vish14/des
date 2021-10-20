import { useEffect, useState } from "react";
import CountUp from "react-countup";
import loading from "../animation/loading.json";
import LottieAnimation from "./components/lottie/lottieAnimation";
import classes from "./App.module.scss";
import Header from "./components/header/header";

function App() {
  const [startingPage, setStartingPage] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setStartingPage(false);
    }, 1000);
  }, []);
  if (startingPage) {
    return (
      <div className={classes.starting}>
        <LottieAnimation lottieJson={loading} height={300} width={300} />
        <div>Loading</div>
      </div>
    );
  }
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
