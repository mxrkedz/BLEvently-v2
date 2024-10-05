"use client";
import React, { useState } from "react";
import { BiCalendar, BiUpload } from "react-icons/bi";
import {
  Calendar,
  Input,
  Button,
  Textarea,
  RadioGroup,
  Radio,
  TimeInput,
} from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { format } from "date-fns";
const CreatePage = () => {
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
    <div className="mt-10 flex items-center justify-center">
      <form className="max-w-3xl bg-gray-800/50  p-6 rounded-3xl">
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
          <label className="font-bold mt-5" htmlFor="location">
            Event Title
          </label>
          <Input
            id="title"
            name="title"
            value={eventData.title}
            placeholder="Enter event title"
            required
            className="border border-white mt-5"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 mt-5">
            <label className="font-bold mt-5">Start Date and Time</label>

            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    color="default"
                    className={`w-full justify-start text-left font-normal ${
                      !eventData.startDate && "text-muted-foreground"
                    }`}
                  >
                    <BiCalendar className="mr-2 h-4 w-4" />
                    {eventData.startDate ? (
                      format(eventData.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    aria-label="Date (Show Month and Year Picker)"
                    showMonthAndYearPickers
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                name="startTime"
                className="w-full border border-white"
              />
            </div>
          </div>
          <div className="space-y-2 mt-5">
            <label className="font-bold mt-5">End Date and Time</label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    color="default"
                    className={`w-full justify-start text-left font-normal ${
                      !eventData.startDate && "text-muted-foreground"
                    }`}
                  >
                    <BiCalendar className="mr-2 h-4 w-4" />
                    {eventData.startDate ? (
                      format(eventData.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    aria-label="Date (Show Month and Year Picker)"
                    showMonthAndYearPickers
                  />
                </PopoverContent>
              </Popover>
              <TimeInput isRequired />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label className="font-bold mt-5" htmlFor="location">
            Location
          </label>
          <Input
            id="location"
            name="location"
            value={eventData.location}
            placeholder="Enter event location"
            className="border border-white"
          />
        </div>

        <div className="mt-5">
          <label className="font-bold mt-5" htmlFor="description">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={eventData.description}
            placeholder="Enter event description"
            rows={4}
            className="border border-white"
          />
        </div>

        <div className="space-y-2 mt-5">
          <label className="font-bold mt-5">Ticket Type</label>
          <RadioGroup
            name="ticketType"
            value={eventData.ticketType}
            onValueChange={(value) =>
              setEventData((prev) => ({ ...prev, ticketType: value }))
            }
            className="flex space-x-4"
            style={{ alignItems: "start" }}
          >
            <div className="flex items-start space-x-2">
              <Radio
                value="free"
                id="free"
                className="mt-1"
                style={{ alignSelf: "flex-start" }}
              />
              <label
                htmlFor="free"
                className="font-bold mt-1"
                style={{ alignSelf: "flex-start" }}
              >
                Free
              </label>
            </div>
            <div className="flex items-start space-x-2">
              <Radio
                value="paid"
                id="paid"
                className="mt-1"
                style={{ alignSelf: "flex-start" }}
              />
              <label
                htmlFor="paid"
                className="font-bold mt-1"
                style={{ alignSelf: "flex-start" }}
              >
                Paid
              </label>
            </div>
          </RadioGroup>
        </div>

        {eventData.ticketType === "paid" && (
          <div className="mt-5">
            <label className="font-bold mt-5" htmlFor="ticketPrice">
              Ticket Price
            </label>
            <Input
              id="ticketPrice"
              name="ticketPrice"
              type="number"
              placeholder="Enter ticket price"
              className="border border-white"
            />
          </div>
        )}

        <div className="mt-5">
          <label className="font-bold mt-5">Event Capacity</label>
          <RadioGroup
            name="capacityType"
            value={eventData.capacityType}
            onValueChange={(value) =>
              setEventData((prev) => ({ ...prev, capacityType: value }))
            }
            className="flex space-x-4"
            style={{ alignItems: "start" }}
          >
            <div className="flex items-start space-x-2">
              <Radio
                value="unlimited"
                id="unlimited"
                className="mt-1"
                style={{ alignSelf: "flex-start" }}
              />
              <label
                htmlFor="unlimited"
                className="font-bold mt-1"
                style={{ alignSelf: "flex-start" }}
              >
                Unlimited
              </label>
            </div>
            <div className="flex items-start space-x-2">
              <Radio
                value="limited"
                id="limited"
                className="mt-1"
                style={{ alignSelf: "flex-start" }}
              />
              <label
                htmlFor="limited"
                className="font-bold mt-1"
                style={{ alignSelf: "flex-start" }}
              >
                Limited
              </label>
            </div>
          </RadioGroup>
        </div>

        {eventData.capacityType === "limited" && (
          <div className="mt-5">
            <label className="font-bold mt-5" htmlFor="maxCapacity">
              Maximum Capacity
            </label>
            <Input
              id="maxCapacity"
              name="maxCapacity"
              type="number"
              placeholder="Enter maximum capacity"
              className="border border-white"
            />
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Button
            type="submit"
            className="w-1/2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg border border-primary px-4 py-2"
          >
            Create Event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
