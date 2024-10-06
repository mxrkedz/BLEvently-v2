"use client";
import React, { useState } from "react";
import { BiUpload } from "react-icons/bi";
import { Input, Button, Textarea, DatePicker } from "@nextui-org/react";
import NavBar from "@/app/components/navbar";
import { now, getLocalTimeZone } from "@internationalized/date";
import { FaPeopleGroup } from "react-icons/fa6";

const EditPage = () => {
  const [eventData, setEventData] = useState({
    image: null,
    title: "",
    startDate: null,
    startTime: "",
    endDate: null,
    endTime: "",
    location: "",
    description: "",
    ticketType: "free",
    ticketPrice: "",
    capacityType: "unlimited",
    maxCapacity: "",
  });
  return (
    <>
      <NavBar />
      <div className="my-10 flex items-center justify-center">
        <form className="max-w-3xl bg-gray-800/50 p-6 rounded-3xl">
          <div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                {eventData.image && (
                  <img
                    src={URL.createObjectURL(eventData.image)}
                    alt="Event preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-muted hover:bg-muted/80 text-muted-foreground px-4 py-2 rounded flex items-center mt-2"
                >
                  <BiUpload className="mr-2 h-4 w-4" />
                  Upload Image
                </label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Input
              label="Event Title"
              id="title"
              type="text"
              placeholder="Enter Event Title"
              isClearable
              isRequired
              radius="lg"
              labelPlacement="outside"
              variant="bordered"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 mt-5">
              <div className="flex space-x-2 rounded-lg">
                <DatePicker
                  label="Start Date and Time"
                  labelPlacement="outside"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  isRequired
                  errorMessage="Please enter a valid date."
                  defaultValue={now(getLocalTimeZone())}
                  minValue={now(getLocalTimeZone())}
                />
              </div>
            </div>
            <div className="space-y-2 mt-5">
              <div className="flex space-x-2 rounded-lg">
                <DatePicker
                  label="End Date and Time"
                  labelPlacement="outside"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  isRequired
                  errorMessage="Please enter a valid date."
                  defaultValue={now(getLocalTimeZone())}
                  minValue={now(getLocalTimeZone())}
                />
              </div>
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
            />
          </div>

          <div className="space-y-2 mt-5">
            <label className="font-bold mt-5">Ticket Type</label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="ticketType"
                  value="free"
                  id="free"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  defaultChecked
                  checked={eventData.ticketType === "free"}
                  onChange={(e) =>
                    setEventData((prev) => ({
                      ...prev,
                      ticketType: e.target.value,
                    }))
                  }
                />
                <label htmlFor="free" className="font-bold mt-1">
                  Free
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="ticketType"
                  value="paid"
                  id="paid"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  checked={eventData.ticketType === "paid"}
                  onChange={(e) =>
                    setEventData((prev) => ({
                      ...prev,
                      ticketType: e.target.value,
                    }))
                  }
                />
                <label htmlFor="paid" className="font-bold mt-1">
                  Paid
                </label>
              </div>
            </div>
          </div>

          {eventData.ticketType === "paid" && (
            <div className="mt-10">
              <Input
                id="ticketPrice"
                name="ticketPrice"
                type="number"
                label="Ticket Price"
                isRequired
                placeholder="0.00"
                labelPlacement="outside"
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
                  value="unlimited"
                  id="unlimited"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  checked={eventData.capacityType === "unlimited"}
                  onChange={(e) =>
                    setEventData((prev) => ({
                      ...prev,
                      capacityType: e.target.value,
                    }))
                  }
                />
                <label htmlFor="unlimited" className="font-bold mt-1">
                  Unlimited
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="capacityType"
                  value="limited"
                  id="limited"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  checked={eventData.capacityType === "limited"}
                  onChange={(e) =>
                    setEventData((prev) => ({
                      ...prev,
                      capacityType: e.target.value,
                    }))
                  }
                />
                <label htmlFor="limited" className="font-bold mt-1">
                  Limited
                </label>
              </div>
            </div>
          </div>

          {eventData.capacityType === "limited" && (
            <div className="mt-10">
              <Input
                id="maxCapacity"
                name="maxCapacity"
                type="number"
                label="Maximum Capacity"
                isRequired
                placeholder="0"
                labelPlacement="outside"
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
