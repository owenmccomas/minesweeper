"use client"

import React from "react";
import Grid from "./_components/Grid";
import { Button } from "@/components/ui/button";

const handleRestart = () => {
  window.location.reload();
}

export default function Home() {
  return (
    <div lang="en">
      <div className="flex min-h-screen flex-col">
        <header className="bg-white">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">Minesweeper</h1>
            <Button onClick={handleRestart} className="btn" variant={"ghost"}>
              Restart
            </Button>
          </div>
        </header>
        <div className="container mx-auto my-auto py-8">
          <div className="mx-auto my-auto flex items-center justify-center">
            <Grid />
          </div>
        </div>
      </div>
    </div>
  );
}
