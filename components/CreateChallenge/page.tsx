'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ChallengeDetailsForm from "@/components/ChallengerDetails/page";
import Header from '../ui/Header/page';

export interface Challenge {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string | null;
  levelType: string;
}

const CreateChallengePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId) {
      const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
      const challengeToEdit = challenges.find((c: Challenge) => c.id === editId);
      if (challengeToEdit) {
        setEditingChallenge(challengeToEdit);
      }
    }
  }, [searchParams]);

  const handleChallengeSubmit = (challenge: Challenge) => {
    const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    
    if (editingChallenge) {
      // Editing existing challenge
      const updatedChallenges = challenges.map((c: Challenge) => 
        c.id === editingChallenge.id ? { ...challenge, id: editingChallenge.id } : c
      );
      localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    } else {
      // Creating new challenge
      const newChallenge = { ...challenge, id: Date.now().toString() };
      localStorage.setItem('challenges', JSON.stringify([...challenges, newChallenge]));
    }
    
    router.push('/');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex text-black justify-between text-center bg-[#f8f9fd] px-20 py-10">
        {editingChallenge ? 'Edit Challenge' : 'Create New Challenge'}
      </h1>
      <ChallengeDetailsForm 
        onChallengeSubmit={handleChallengeSubmit} 
        initialChallenge={editingChallenge}
      />
    </div>
  );
};

export default CreateChallengePage;