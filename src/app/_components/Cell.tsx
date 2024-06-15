import React from "react";
import { Button } from "@/components/ui/button";

type CellProps = {
  cell: {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    adjacentMines: number;
  };
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
};

const Cell: React.FC<CellProps> = ({ cell, onClick, onContextMenu }) => {
  let content = "";

  if (cell.isRevealed) {
    if (cell.isMine) {
      content = "x";
    } else if (cell.adjacentMines > 0) {
      content = cell.adjacentMines.toString();
    }
  } else if (cell.isFlagged) {
    content = 'F'
  }

  return (
    <Button
      className={`w-10 h-10 ${
        cell.isRevealed ? 'bg-gray-300' : 'bg-gray-500'
      } rounded-md flex items-center justify-center`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {content}
    </Button>
  );
};

export default Cell;
