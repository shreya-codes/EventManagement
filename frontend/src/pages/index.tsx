import type { NextPage } from "next";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Event from "../components/Events";
const Home: NextPage = () => {
  return (
    <div>
      <Header heading="Event Mangement System" />
      <main>
        <Event />
      </main>
    </div>
  );
};

export default Home;
