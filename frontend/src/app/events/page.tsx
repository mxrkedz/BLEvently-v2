"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  CardHeader,
  Image,
  CardFooter,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { BiCalendarMinus, BiTrash } from "react-icons/bi";
import { PiPencil } from "react-icons/pi";
import Loader from "../components/loader";
import NavBar from "../components/navbar";
import { useSession } from "next-auth/react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Component() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  useEffect(() => {
    if (session?.user?.token) {
      setToken(session.user.token);
    }
  }, [session]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/event/myevents`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        const data = await response.json();

        if (data.success) {
          setEvents(data.events);
        } else {
          console.error("Failed to fetch events");
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.token) {
      fetchEvents();
    }
  }, [token, session]);

  const handleDelete = async () => {
    if (!eventIdToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/event/${eventIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setEvents(events.filter((event) => event._id !== eventIdToDelete));
      } else {
        console.error("Failed to delete event:", data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      onOpenChange();
      setEventIdToDelete(null);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          <BiCalendarMinus className="mr-2" size={25} />
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
        </div>

        <div className="my-4 border-t border-b border-default-600 dark:border-default-100" />

        {loading ? (
          <Loader />
        ) : error || !events.length ? (
          <section className="overflow-y-auto">
            <div className="text-xl font-bold p-4 text-center">
              {error ? "Error Fetching Events." : "No Events Available."}
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-[1920px] px-4 py-12 text-skin-base">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Deleting Event...
                    </ModalHeader>
                    <ModalBody>
                      <p>Are you sure you want to delete this event?</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={() => {
                          onClose();
                          setEventIdToDelete(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button color="primary" onPress={handleDelete}>
                        Confirm
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <div className="mb-4 grid grid-cols-12 gap-4">
              {events.map((event) => (
                <Card
                  isFooterBlurred
                  key={event._id}
                  className="w-full h-[300px] col-span-4"
                >
                  <CardHeader className="absolute z-10 top-1 flex justify-between items-center">
                    <div className="flex flex-col items-start">
                      <h4 className="text-white/90 font-bold text-xl">
                        {event.name}
                      </h4>
                      <p className="text-xs text-white/60 uppercase font-bold">
                        {event.description}
                      </p>
                    </div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          size="sm"
                          color="primary"
                          radius="full"
                          className="font-bold rounded-full bg-gray-500/20 backdrop-blur"
                        >
                          <BsThreeDotsVertical className="text-skin-base" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu variant="faded">
                        <DropdownItem
                          href={`/events/edit/${event._id}`}
                          showDivider
                          startContent={
                            <PiPencil
                              className={cn(iconClasses, "text-primary")}
                            />
                          }
                        >
                          Edit
                        </DropdownItem>

                        <DropdownItem
                          onPress={() => {
                            onOpen();
                            setEventIdToDelete(event._id);
                          }}
                          className="text-danger"
                          color="danger"
                          description="Permanently delete your event"
                          startContent={
                            <BiTrash
                              className={cn(iconClasses, "text-danger")}
                            />
                          }
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt="Event Image"
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
                        <p className="font-bold text-tiny text-skin-inverted uppercase">
                          {event.organizer.name.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <Button
                      as={Link}
                      href="/events/1"
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
        )}
      </div>
    </>
  );
}

interface Event {
  _id: string;
  name: string;
  description: string;
  images: { url: string }[];
  organizer: {
    name: string;
  };
}
