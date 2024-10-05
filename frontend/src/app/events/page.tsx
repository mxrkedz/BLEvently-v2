"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  CardHeader,
  Image,
  CardFooter,
  Link,
} from "@nextui-org/react";
import { BiTrash } from "react-icons/bi";
import { PiPencil } from "react-icons/pi";

export default function Component() {
  const [events, setEvents] = useState([]); // State to hold the events
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/event/all");
        const data = await response.json();

        if (data.success) {
          setEvents(data.events); // Store fetched events in state
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchEvents(); // Call the function to fetch events
  }, []); // Empty dependency array means this runs once on mount

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this event? ${id}`
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/v1/event/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setEvents(events.filter((event) => event._id !== id)); // Update state to remove deleted event
      } else {
        console.error("Failed to delete event:", data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
      </div>

      <div className="my-4 border-t border-b border-default-600 dark:border-default-100" />

      <section className="mx-auto max-w-[1920px] px-4 py-12 text-skin-base">
        <div className="mb-4 grid grid-cols-12 gap-4">
          {events.map((event) => (
            <Card
              isFooterBlurred
              key={event._id} // Use a unique identifier for the key
              className="w-full h-[300px] col-span-4"
            >
              <CardHeader className="absolute z-10 top-1 flex justify-between items-center">
                <div className="flex flex-col items-start">
                  <h4 className="text-white/90 font-medium text-xl">
                    {event.name}
                  </h4>
                  <p className="text-xs text-white/60 uppercase font-bold">
                    {event.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    as={Link}
                    href={`/events/edit/${event._id}`} // Use the event ID for editing
                    size="sm"
                    color="primary"
                    className="font-bold rounded-full bg-blue-500/20 backdrop-blur"
                  >
                    <PiPencil className="text-blue-500" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    className="font-bold rounded-full bg-red-500/20 backdrop-blur"
                    onClick={() => handleDelete(event._id)} // Call delete function
                  >
                    <BiTrash className="text-red-500" /> Delete
                  </Button>
                </div>
              </CardHeader>
              <Image
                removeWrapper
                alt="Event Image" // Update the alt text accordingly
                className="z-0 w-full h-full object-cover"
                src={
                  event.images[0]?.url ||
                  "https://nextui.org/images/card-example-1.jpeg"
                }
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">Organized by</p>
                    <p className="font-bold text-tiny text-white/60">
                      {event.organizer}{" "}
                      {/* Assuming the organizer's name is available */}
                    </p>
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  className="font-bold rounded-full bg-gray-500/20 backdrop-blur"
                >
                  See Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* <Pagination total={2} initialPage={1} /> */}
    </div>
  );
}
