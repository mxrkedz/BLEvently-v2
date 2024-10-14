"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { Input, Button, Textarea, DatePicker } from "@nextui-org/react";
import NavBar from "@/app/components/navbar";
import { now, getLocalTimeZone } from "@internationalized/date";
import { FaPeopleGroup } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

const EditPage = () => {
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(0);
  const [ticketType, setTicketType] = useState("Free");
  const [capacity, setCapacity] = useState("Unlimited");
  const [maxCapacity, setMaxCapacity] = useState<number | undefined>(0);
  const { data: session } = useSession();
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/event/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        if (response.ok) {
          const eventData = await response.json();
          setName(eventData.event.name);
          setStartDate(new Date(eventData.event.startDate));
          setEndDate(new Date(eventData.event.endDate));
          setLocation(eventData.event.location);
          setDescription(eventData.event.description);
          setTicketType(eventData.event.ticketType);
          setPrice(eventData.event.price);
          setCapacity(eventData.event.capacity);
          setMaxCapacity(eventData.event.maxCapacity);
          setImagesPreview(eventData.event.images.map((image) => image.url));
          console.log(eventData.event.images.map((image) => image.url));
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [id, session]);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files?.length ? e.target.files : []);
    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result as string]);
          setImages((prev) => [...prev, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    // @ts-ignore
    formData.append("startDate", startDate);
    // @ts-ignore
    formData.append("endDate", endDate);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("ticketType", ticketType);
    formData.append("price", price?.toString() || "");
    formData.append("capacity", capacity);
    formData.append("maxCapacity", maxCapacity?.toString() || "");

    images.forEach((image) => {
      formData.append("file", image);
    });

    try {
      const response = await fetch(`http://localhost:5000/api/v1/event/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        router.replace("/events");
      } else {
        const errorData = await response.json();
        console.error("Failed to update event:", errorData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="my-10 flex items-center justify-center">
        <form
          className="max-w-3xl w-2xl md:w-9/12 bg-gray-800/50 p-6 rounded-3xl"
          onSubmit={handleSubmit}
        >
          <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
            <div className="md:flex">
              <div className="w-full p-3">
                <div className="relative h-48 rounded-lg border-dashed border-2 border-[#fd9e02] bg-gray-900/50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  {imagesPreview?.length > 0 ? (
                    <img
                      src={imagesPreview[0]}
                      alt="Event preview"
                      className="absolute h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="absolute flex flex-col items-center">
                      <BiUpload size={60} className="mb-3" />
                      <span className="block text-gray-500 font-semibold">
                        Drag &amp; drop your files here
                      </span>
                      <span className="block text-gray-400 font-normal mt-1">
                        or click to upload
                      </span>
                    </div>
                  )}
                  <input
                    name="image"
                    className="absolute h-full w-full opacity-0 cursor-pointer"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Input
              label="Event Title"
              id="title"
              name="title"
              type="text"
              placeholder="Enter Event Title"
              isClearable
              isRequired
              radius="lg"
              labelPlacement="outside"
              variant="bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 mt-5">
              <DatePicker
                label="Start Date and Time"
                labelPlacement="outside"
                variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
                isRequired
                errorMessage="Please enter a valid date."
                minValue={now(getLocalTimeZone())}
                // @ts-ignore
                onChange={(value) => setStartDate(value.toString())}
              />
              {/* <p className="text-default-500 text-sm">
                Selected date:
                {startDate ? formatter.format(startDate) : "--"}
              </p> */}
            </div>
            <div className="space-y-2 mt-5">
              <DatePicker
                label="End Date and Time"
                labelPlacement="outside"
                variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
                isRequired
                errorMessage="Please enter a valid date."
                minValue={now(getLocalTimeZone())}
                // @ts-ignore
                onChange={(value) => setEndDate(value.toString())}
              />
            </div>
          </div>

          <div className="mt-8">
            <Input
              label="Location"
              id="location"
              name="location"
              type="text"
              placeholder="Enter Event Location"
              isClearable
              isRequired
              radius="lg"
              labelPlacement="outside"
              variant="bordered"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <Textarea
              label="Description"
              id="description"
              name="description"
              isRequired
              labelPlacement="outside"
              placeholder="Describe your event..."
              variant="bordered"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2 mt-5">
            <label className="font-bold mt-5">Ticket Type</label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="ticketType"
                  value="Free"
                  id="Free"
                  checked={ticketType === "Free"}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="Free" className="font-bold mt-1">
                  Free
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="ticketType"
                  value="Paid"
                  id="Paid"
                  checked={ticketType === "Paid"}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="Paid" className="font-bold mt-1">
                  Paid
                </label>
              </div>
            </div>
          </div>

          {ticketType === "Paid" && (
            <div className="mt-10">
              <Input
                id="ticketPrice"
                name="ticketPrice"
                type="number"
                label="Ticket Price"
                isRequired
                variant="bordered"
                placeholder="0.00"
                labelPlacement="outside"
                value={price?.toString()}
                onChange={(e) => setPrice(Number(e.target.value))}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$SOL</span>
                  </div>
                }
              />
            </div>
          )}

          <div className="space-y-2 mt-5">
            <label className="font-bold mt-5">Event Capacity</label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="capacityType"
                  value="Unlimited"
                  id="Unlimited"
                  checked={capacity === "Unlimited"}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                  className="w-4 h-4 "
                />
                <label htmlFor="Unlimited" className="font-bold mt-1">
                  Unlimited
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="capacityType"
                  value="Limited"
                  id="Limited"
                  checked={capacity === "Limited"}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="Limited" className="font-bold mt-1">
                  Limited
                </label>
              </div>
            </div>
          </div>

          {capacity === "Limited" && (
            <div className="mt-10">
              <Input
                id="maxCapacity"
                name="maxCapacity"
                type="number"
                label="Maximum Capacity"
                variant="bordered"
                isRequired
                placeholder="0"
                labelPlacement="outside"
                value={maxCapacity?.toString()}
                onChange={(e) => setMaxCapacity(Number(e.target.value))}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">
                      <FaPeopleGroup />
                    </span>
                  </div>
                }
              />
            </div>
          )}

          <div className="flex justify-center mt-10">
            <Button
              type="submit"
              className="w-1/2 bg-primary bg-skin-button-base hover:bg-skin-button-base-hover transition ease-in duration-200 text-white font-bold rounded-lg px-4 py-2"
            >
              Update Event
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPage;
