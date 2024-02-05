import type { NextPage } from "next";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import EventList from "../components/EventList";
const Home: NextPage = () => {
  return (
    <div>
      <Header
        heading="Event Mangement System"
        actionItems={[
          { title: "Login", directTo: "/login" },
          { title: "signup", directTo: "/signup" },
        ]}
      />

      <main>
        <EventList />
      </main>
    </div>
  );
};

export default Home;
