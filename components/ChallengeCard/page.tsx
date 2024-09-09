"use client";

import React from "react";
import { Calendar, CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Challenge {
  id: string; // Add an id field
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string | null;
  levelType: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const router = useRouter();
  const now = new Date();
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);

  const getStatus = () => {
    if (now < startDate) return "upcoming";
    if (now > endDate) return "past";
    return "active";
  };

  const getTimeRemaining = (targetDate: Date) => {
    const timeRemaining = targetDate.getTime() - now.getTime();
    const days = String(
      Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    ).padStart(2, "0");
    const hours = String(
      Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ).padStart(2, "0");
    const minutes = String(
      Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    return `${days}d : ${hours}h : ${minutes}m`;
  };

  const handleClick = () => {
    router.push(`/challenge/${challenge.id}`);
  };

  const status = getStatus();

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {challenge.image && (
        <img
          src={challenge.image}
          alt={challenge.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold 
            ${
              challenge.levelType === "Easy"
                ? "bg-green-100 text-green-800"
                : challenge.levelType === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {challenge.levelType}
          </span>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold 
            ${
              status === "active"
                ? "bg-blue-100 text-green-800"
                : status === "upcoming"
                ? "bg-orange-100 text-black"
                : "bg-red-100 text-black"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <h3 className="font-bold text-xl text-center text-black mb-2">
          {challenge.name}
        </h3>
        <p className="text-gray-600 font-medium text-center mb-4">
          {challenge.description}
        </p>
        <div className="flex flex-col text-center items-center justify-center text-black font-medium text-xl mb-2">
          <div className="text-base font-medium text-black">
            {status === "past"
              ? startDate.toLocaleDateString()
              : status === "active"
              ? "Ends In"
              : "Starts In"}
          </div>
          <span className="text-2xl font-semibold">
            {status === "past"
              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              : status === "active"
              ? `${getTimeRemaining(endDate)}`
              : `${getTimeRemaining(startDate)}`}
          </span>
        </div>
        <div className="flex justify-center">
          <Button className="mt-4 bg-[#45924c] text-white py-6 px-6 text-xl font-bold hover:bg-green-600 transition duration-300">
            <CircleCheckBig className="mr-2" /> Participate Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
