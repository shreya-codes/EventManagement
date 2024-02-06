import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

import EventRow from "./EventRow";
import useFetcher from "../hooks/useFetcher";
import useMutation from "../hooks/useMutation";

import EventForm, { IEvent } from "./EventForm";
import DeleteConfirmationModal from "./DeleteConfirmation";

const EventList = () => {
  const { deleteRequest, isMutating } = useMutation();

  const [reload, setReload] = useState(false);
  const [editEvent, setEditEvent] = useState<IEvent | {}>({});
  const [deleteEvent, setDeleteEvent] = useState<IEvent | {}>({});
  const router = useRouter();

  const handleEditClick = (event: IEvent) => {
    setEditEvent(event);
    setDeleteEvent({});
  };
  const handleDeleteClick = (event: IEvent) => {
    setDeleteEvent(event);
    setEditEvent({});
  };

  const handleModalClose = () => {
    setEditEvent({});
    setDeleteEvent({});
  };
  const handleDeleteCancel = () => {
    setDeleteEvent({});
  };
  const handleDeleteConfirm = async () => {
    try {
      if ("_id" in deleteEvent && deleteEvent._id) {
        await deleteRequest(`/events/${deleteEvent?._id}`, {
          successMessage: "Event Deleted",
          onSuccess: () => {
            setReload(true);

            router.push(`/events`);
          },
        });
      }
      handleModalClose();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  const {
    data: events,
    isLoading,
    error,
    refetch,
  } = useFetcher(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events`, {
    swrOptions: { revalidateOnFocus: reload },
  });

  useEffect(() => {
    if (reload) {
      refetch();
      setReload(false);
    }
  }, [events, reload]);
  return (
    <div className="min-h-full max-w-screen-xl mx-auto mt-4 space-y-6 text-gray-600 ">
      <div className="w-full bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
        {isLoading && <p>Loading...</p>}
        {events && events.events && events.events.length === 0 ? (
          <p>No events available</p>
        ) : (
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Event Name</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Start Date</th>
                <th className="py-3 px-6">End Date</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events?.events.map((event: IEvent, index: number) => (
                <EventRow
                  key={event._id}
                  event={event}
                  index={index}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </tbody>
          </table>
        )}

        {"_id" in editEvent && editEvent._id && (
          <div className="fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 sm:p-8 sm:rounded-lg">
              <div>
                <EventForm
                  action="Edit"
                  event={editEvent}
                  onClose={handleModalClose}
                  reload={reload}
                  setReload={setReload}
                />
              </div>
            </div>
          </div>
        )}

        {"_id" in deleteEvent && deleteEvent._id && (
          <div className="fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
            <DeleteConfirmationModal
              onCancel={handleDeleteCancel}
              onConfirm={() => handleDeleteConfirm(deleteEvent?._id)}
              onClose={handleModalClose}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
