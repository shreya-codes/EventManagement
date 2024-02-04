// EventsPage.js
import React, { useEffect, useState } from "react";
import useFetcher from "../../hooks/useFetcher";
import EventList from "../../components/EventList";
import Link from "next/link";
import EventForm from "../../components/EventForm";
const EventsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const {
    data: events,
    isLoading,
    error,
    refetch,
  } = useFetcher(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events`);

  useEffect(() => {
    console.log(reload, "------ reerere");
    if (reload) {
      refetch();
      setReload(false);
    }
  }, [events, reload]);
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl mx-auto">
        {showModal && (
          <EventForm
            action="Create"
            onClose={handleModalClose}
            reload={reload}
            setReload={setReload}
          />
        )}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <button
          className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          Add Event
        </button>
        <EventList />
      </div>
    </div>
  );
};

export default EventsPage;
