"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChartColumnIncreasing, Tag } from "lucide-react";

interface Challenge {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string | null;
  levelType: string;
}

export default function ChallengeDetails({
  params,
}: {
  params: { id: string };
}) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const router = useRouter();

  useEffect(() => {
    const challenges = JSON.parse(localStorage.getItem("challenges") || "[]");
    const foundChallenge = challenges.find(
      (c: Challenge) => c.id === params.id
    );
    if (foundChallenge) {
      setChallenge(foundChallenge);
    }
  }, [params.id]);

  const handleEdit = () => {
    router.push(`/create?edit=${params.id}`);
  };

  const handleDelete = () => {
    const challenges = JSON.parse(localStorage.getItem("challenges") || "[]");
    const updatedChallenges = challenges.filter(
      (c: Challenge) => c.id !== params.id
    );
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
    router.push("/");
  };

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="bg-[#063855] h-full py-24 flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl p-8">
          <div className="text-center flex flex-col items-center justify-center lg:text-left w-2/3 mb-8 lg:mb-0">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-8">
              {challenge.name}
            </h1>
            <p className="text-lg text-white mb-8 max-w-lg font-medium leading-loose">
              {challenge.description}
            </p>
            <p className="px-4 py-1 bg-white rounded-lg w-fit flex flex-row items-center justify-center text-[#063855]  text-xl font-bold ">
              <ChartColumnIncreasing className="w-6 h-6 mr-2" />{" "}
              {challenge.levelType}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between shadow-lg bg-[#f8f9fd] px-5 sm:px-20 ">
        {" "}
        <div className="text-xl text-black font-semibold border-b-4 border-[#45924c] pt-8">
          <p>Overview</p>
        </div>
        <div className="flex space-x-4 items-center justify-center">
          <Button className="bg-[#45924c] text-white text-xl font-semibold" onClick={handleEdit}>Edit</Button>
          <Button className="border-2 border-red-400 bg-white text-red-400 text-xl font-semibold" onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </div>
      </div>

      <div className="flex justify-start pt-10 px-5 sm:px-20 ">
      <p className="text-lg text-gray-500 mb-8 max-w-lg font-medium leading-loose">
              {challenge.description}
            </p>
      </div>
    </div>
  );
}
