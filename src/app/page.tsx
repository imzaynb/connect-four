import Board from '@/components/game/Board';
import React from 'react';

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-max flex flex-col items-center">
      <Board />
    </div>
  );
}
