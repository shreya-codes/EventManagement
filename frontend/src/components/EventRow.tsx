import React, { useState } from "react";
import { IEvent } from "./EventForm";

interface IProps {
  event: IEvent;
  index: number;
}

const EventRow: React.FC<IProps> = ({
  event,
  index,
  reload,
  setReload,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <>
      <tr
        key={event._id}
        className={`${index % 2 === 0 ? "bg-gray-100" : ""} border-b`}
      >
        <td className="py-3 px-6">{event.name}</td>
        <td className="py-3 px-6">{event.description}</td>
        <td className="py-3 px-6">{event.location}</td>
        <td className="py-3 px-6">
          {new Date(event.startDate).toLocaleDateString()}
        </td>
        <td className="py-3 px-6">
          {new Date(event.endDate).toLocaleDateString()}
        </td>
        <td className="py-3 px-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => onEditClick(event)}
            disabled={reload}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => onDeleteClick(event)}
            disabled={reload}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default EventRow;
