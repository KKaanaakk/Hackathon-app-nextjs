"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ChallengeCard from "@/components/ChallengeCard/page";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WhyParticipate from "../WhyParticipate/page";
import photo from "@/public/assets/icons/Group1.svg";

interface Challenge {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string | null;
  levelType: string;
}

const LandingPage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Load challenges from localStorage when the component mounts
    const storedChallenges = localStorage.getItem("challenges");
    if (storedChallenges) {
      setChallenges(JSON.parse(storedChallenges));
    }
  }, []);

  useEffect(() => {
    let result = [...challenges];

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    // Apply level filter
    if (levelFilter !== "all") {
      result = result.filter(
        (challenge) => challenge.levelType === levelFilter
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      const now = new Date();
      result = result.filter((challenge) => {
        const startDate = new Date(challenge.startDate);
        const endDate = new Date(challenge.endDate);
        switch (statusFilter) {
          case "active":
            return now >= startDate && now <= endDate;
          case "upcoming":
            return now < startDate;
          case "past":
            return now > endDate;
          default:
            return true;
        }
      });
    }

    // Apply search query
    if (searchQuery) {
      result = result.filter((challenge) =>
        challenge.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredChallenges(result);
  }, [challenges, sortOrder, levelFilter, statusFilter, searchQuery]);

  return (
    <div>
      <div className="bg-[#063855] h-full py-24 flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl p-8">
          <div className="text-center lg:text-left w-2/3 mb-8 lg:mb-0">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-8 border-l-8 pl-6 border-[#ffce5d]">
              Accelerate Innovation <br /> with Global AI Challenges
            </h1>
            <p className="text-lg text-white mb-8 pl-6 max-w-lg font-medium leading-loose" >
              AI Challenges at DPhi simulate real-world problems. It is a great
              place to put your AI/Data Science skills to test on diverse
              datasets allowing you to foster learning through competitions.
            </p>
            <Link href="/create" className="text-white pl-6">
              <Button className="bg-white text-[#063855] text-xl p-6 rounded-lg font-semibold hover:bg-gray-100 transition">
                Create Challenge
              </Button>
            </Link>
          </div>
          <div className="w-1/3 max-w-md">
            <img
              src="/assets/icons/PicsArt.svg"
              alt="Rocket Launch"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#003447] border-y py-12">
        <div className="container mx-auto flex flex-col sm:flex-row justify-around items-center space-x-6  max-w-7xl">
          {/* AI Model Submissions */}
          <div className="text-white flex items-center space-x-4 rounded-lg p-4">
            <div>
              <img src="/assets/icons/Group1.svg" alt="My Icon" className="" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">100K+</h3>
              <p className="text-sm">AI model submissions</p>
            </div>
          </div>
          <hr className="sm:border-l h-12 border-white" />
          {/* Data Scientists */}
          <div className="text-white flex items-center space-x-4 rounded-lg p-4">
            <div>
              <img src="/assets/icons/Group2.svg" alt="My Icon" className="" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">50K+</h3>
              <p className="text-sm">Data Scientists</p>
            </div>
          </div>
          <hr className="sm:border-l h-12 border-white" />

          {/* AI Challenges Hosted */}
          <div className="text-white flex items-center space-x-4  rounded-lg p-4">
            <div>
              <img src="/assets/icons/Group3.svg" alt="My Icon" className="" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">100+</h3>
              <p className="text-sm">AI Challenges hosted</p>
            </div>
          </div>
        </div>
      </div>
      <WhyParticipate />
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-8 bg-[#003447] p-12 justify-center">
          <div>
            <h1 className="text-3xl font-bold">Explore Challenges</h1>
          </div>

          <div className="flex flex-col gap-4 mb-6 w-full max-w-4xl">
            <div>
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-xl h-12 text-black"
              />
            </div>
            <div className="flex flex-row gap-3 items-center justify-center">
              <Select
                onValueChange={(value: "newest" | "oldest") =>
                  setSortOrder(value)
                }
                
              >
                <SelectTrigger className="w-full bg-white h-12 rounded-xl text-black">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setLevelFilter(value)}>
                <SelectTrigger className="w-full bg-white h-12 rounded-xl text-black">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setStatusFilter(value)}>
                <SelectTrigger className="w-full bg-white h-12 rounded-xl text-black">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-[#063855] py-20 px-2 md:px-40">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
