import Image from "next/image";
import React from "react";
import Robot from "@/public/assets/icons/Robot.svg";
import vector from "@/public/assets/icons/Vector.svg";
import notebook from "@/public/assets/icons/carbon_notebook-reference.svg";
import card from "@/public/assets/icons/IdentificationCard.svg";

const WhyParticipate: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-4xl font-bold text-black mb-8 text-center">
        Why Participate in{" "}
        <span className="text-green-500">AI Challenges?</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl p-2">
        <div className="bg-[#f8f9fd] rounded-3xl px-6 space-y-4 py-12">
          <div className="flex items-center mb-4">
            <Image src={Robot} alt="" className="rounded-3xl" />
          </div>
          <h3 className="text-xl sm:text-3xl font-semibold text-black mb-2">
            Prove your skills
          </h3>
          <p className="text-[#65607c] text-sm sm:text-base font-medium">
            Gain substantial experience by solving real-world problems and pit
            against others to come up with innovative solutions.
          </p>
        </div>

        <div className="bg-[#f8f9fd] rounded-3xl px-6 space-y-4 py-12">
          <div className="flex items-center mb-4">
          <Image src={vector} alt="" className="rounded-3xl" />
          </div>
          <h3 className="text-xl sm:text-3xl font-semibold text-black mb-2">
           Learn from Community
          </h3>
          <p className="text-[#65607c] text-sm sm:text-base font-medium">
            Gain substantial experience by solving real-world problems and pit
            against others to come up with innovative solutions.
          </p>
        </div>

        <div className="bg-[#f8f9fd] rounded-3xl px-6 space-y-4 py-12">
          <div className="flex items-center mb-4">
            <Image src={notebook} alt="" className="rounded-3xl" />
          </div>
          <h3 className="text-xl sm:text-3xl font-semibold text-black mb-2">
            Prove your skills
          </h3>
          <p className="text-[#65607c] text-sm sm:text-base font-medium">
            Gain substantial experience by solving real-world problems and pit
            against others to come up with innovative solutions.
          </p>
        </div>

        <div className="bg-[#f8f9fd] rounded-3xl px-6 space-y-4 py-12">
          <div className="flex items-center mb-4">
            <Image src={card} alt="" className="rounded-3xl" />
          </div>
          <h3 className="text-xl sm:text-3xl font-semibold text-black mb-2">
            Prove your skills
          </h3>
          <p className="text-[#65607c] text-sm sm:text-base font-medium">
            Gain substantial experience by solving real-world problems and pit
            against others to come up with innovative solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyParticipate;
