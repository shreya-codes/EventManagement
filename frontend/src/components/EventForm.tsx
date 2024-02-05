import { SubmitHandler, useForm } from "react-hook-form";

import Router, { useRouter } from "next/router";
import React from "react";
import useMutation from "../hooks/useMutation";

interface IProps {
  action: string;
  event?: IEvent;
  reload?: boolean;
  onClose: () => void;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

const EventForm: React.FC<IProps> = ({ action, event, onClose, setReload }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IEvent>({
    defaultValues:
      action === "Edit"
        ? {
            _id: event?._id,
            name: event?.name,
            description: event?.description,
            startDate: event?.startDate,
            endDate: event?.endDate,
            location: event?.location,
          }
        : {},
  });
  const startDate = watch("startDate") as Date;

  const { postRequest, putRequest, isMutating } = useMutation();

  const onSubmit: SubmitHandler<IEvent> = async (data) => {
    const eventInput = {
      name: data.name,
      description: data.description,
      location: data.location,
      startDate: data?.startDate,
      endDate: data?.endDate,
    };
    try {
      if (action === "Create") {
        await postRequest("/events", {
          options: { data: eventInput },
          successMessage: "Event Created",
          onSuccess: () => {
            setReload && setReload(true);
          },
        });
      }

      if (action === "Edit") {
        await putRequest(`/events/${event?._id}`, {
          options: { data: eventInput },
          successMessage: "Event Updated",
          onSuccess: () => {
            setReload && setReload(true);
          },
        });
      }
      onClose();
    } catch {}
  };

  return (
    <main className="w-full h-screen flex flex-col items-center  bg-gray-50 sm:px-4">
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-50 bg-opacity-70 z-50">
        <div className="bg-white w-full max-w-md p-4 sm:p-6 sm:rounded-lg relative">
          <div>
            <button
              className="absolute top-4 right-4 text-gray-500 px-4 py-2"
              onClick={onClose}
            >
              close
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="font-medium">Description</label>
              <input
                {...register("description")}
                type="text"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Location</label>
              <input
                {...register("location")}
                type="text"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Start Date</label>
              <input
                {...register("startDate", {
                  required: "End Date is required",
                })}
                type="date"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )}
            </div>
            <div>
              <label className="font-medium">End Date</label>
              <input
                {...register("endDate", {
                  required: "End Date is required",
                  validate: (value) =>
                    new Date(value) > new Date(startDate) ||
                    "End Date must be after Start Date",
                })}
                type="date"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.endDate && (
                <p className="text-red-500">{errors.endDate.message}</p>
              )}
            </div>
            <button
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              disabled={isMutating}
            >
              {action} Event
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EventForm;
