"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Calendar, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Challenge {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string | null;
  levelType: string;
}

interface ChallengeDetailsFormProps {
  onChallengeSubmit: (challenge: Challenge) => void;
  initialChallenge?: Challenge | null;
}

const ChallengeDetailsForm: React.FC<ChallengeDetailsFormProps> = ({
  onChallengeSubmit,
  initialChallenge,
}) => {
  const [challenge, setChallenge] = useState<Challenge>({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    image: null,
    levelType: "Easy",
  });

  useEffect(() => {
    if (initialChallenge) {
      setChallenge(initialChallenge);
    }
  }, [initialChallenge]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setChallenge((prev) => ({ ...prev, [name]: value }));
  };
  const handleLevelChange = (value: string) => {
    setChallenge((prev) => ({ ...prev, levelType: value }));
  };
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChallenge((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChallengeSubmit(challenge);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl pb-6 mx-auto px-4 ">
      <div>
        <label
          htmlFor="name"
          className="block text-xl mb-2 font-medium text-black"
        >
          Challenge Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={challenge.name}
          onChange={handleChange}
          className="text-black h-8 w-1/2 rounded-sm border-2 py-4 px-2"
          required
        />
      </div>

      <div>
        <label
          htmlFor="startDate"
          className="block text-xl mb-2 font-medium text-black"
        >
          Start Date
        </label>
        <div className="mt-1 relative">
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={challenge.startDate}
            onChange={handleChange}
            className="text-black h-8 w-1/2 rounded-sm border-2 py-4 px-2"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="endDate"
          className="block text-xl mb-2 font-medium text-black"
        >
          End Date
        </label>
        <div className="mt-1 relative">
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={challenge.endDate}
            onChange={handleChange}
            className="text-black h-8 w-1/2 rounded-sm border-2 py-4 px-2"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-xl mb-2 font-medium text-black"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={challenge.description}
          onChange={handleChange}
          rows={4}
          className="text-black w-2/3 rounded-sm border-2 py-4 px-2"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-xl mb-2 font-medium text-black">
          Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-sm file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-black
            hover:file:bg-violet-10"
        />
      </div>

      <div>
        <label
          htmlFor="levelType"
          className="block text-xl mb-2 font-medium text-black"
        >
          Level Type
        </label>
        {/* <Select
          id="levelType"
          name="levelType"
          value={challenge.levelType}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </Select> */}
        <Select value={challenge.levelType} onValueChange={handleLevelChange}>
          <SelectTrigger className="text-black w-1/3 rounded-sm border-2 py-4 px-2">
            <SelectValue placeholder="Select a difficulty level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className=" mx-auto bg-[#45924c]">
        {initialChallenge ? "Save Changes" : "Create Challenge"}
      </Button>
    </form>
  );
};

export default ChallengeDetailsForm;
