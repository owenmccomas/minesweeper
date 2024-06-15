"use client";

import React, { useState } from "react";
import Cell from "./Cell";

type CellType = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

const generateEmptyGrid = (size: number): CellType[][] => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    })),
  );
};

const placeMines = (grid: CellType[][], mines: number): CellType[][] => {
  const size = grid.length;
  let placedMines = 0;
  while (placedMines < mines) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (grid[row] && grid[row][col] && !grid[row][col].isMine) {
      grid[row][col].isMine = true;
      placedMines++;
    }
  }
  return grid;
};

const calculateAdjacentMines = (grid: CellType[][]): CellType[][] => {
  const size = grid.length;

  const getAdjacentCells = (row: number, col: number) => {
    const adjacentCells: CellType[] = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          if (grid[newRow] && grid[newRow][newCol]) {
            adjacentCells.push(grid[newRow][newCol]);
          }
        }
      }
    }
    return adjacentCells;
  };

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell.isMine) {
        const adjacentCells = getAdjacentCells(rowIndex, colIndex);
        cell.adjacentMines = adjacentCells.filter(
          (adjCell) => adjCell.isMine,
        ).length;
      }
    });
  });

  return grid;
};

const Grid: React.FC = () => {
  const gridSize = 8;
  const mineCount = 10;
  const [grid, setGrid] = useState<CellType[][]>(() => {
    const initialGrid = generateEmptyGrid(gridSize);
    const gridWithMines = placeMines(initialGrid, mineCount);
    return calculateAdjacentMines(gridWithMines);
  });

  const revealCell = (
    grid: CellType[][],
    row: number,
    col: number,
  ): CellType[][] => {
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const stack = [[row, col]];

    while (stack.length > 0) {
      const [r, c] = stack.pop()!;
      
      const cell = newGrid[r][c];

      if (!cell.isRevealed && !cell.isFlagged) {
        cell.isRevealed = true;

        if (cell.adjacentMines === 0 && !cell.isMine) {
          getAdjacentCells(newGrid, r, c).forEach((adjCell) => {
            if (!adjCell.cell.isRevealed && !adjCell.cell.isMine) { // The .cell. is the issue if this line is causing error
              stack.push([adjCell.row, adjCell.col]);
            }
          });
        }
      }
    }

    return newGrid;
  };

  const getAdjacentCells = (
    grid: CellType[][],
    row: number,
    col: number,
  ): { row: number; col: number; cell: CellType }[] => {
    const size = grid.length;
    const adjacentCells: { row: number; col: number; cell: CellType }[] = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          if (grid[newRow] && grid[newRow][newCol]) {
            adjacentCells.push({
              row: newRow,
              col: newCol,
              cell: grid[newRow][newCol],
            });
          }
        }
      }
    }

    return adjacentCells;
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const cell = grid[rowIndex]?.[colIndex];

    if (cell?.isRevealed || cell?.isFlagged) return;

    if (cell?.isMine) {
      alert("Game over idiot. Watch your step");

      const newGrid = grid.map((row) =>
        row.map((cell) => (cell.isMine ? { ...cell, isRevealed: true } : cell)),
      );
      setGrid(newGrid);
    } else {
      const newGrid = revealCell(grid, rowIndex, colIndex);
      setGrid(newGrid);
    }
  };

  const handleCellRightClick = (
    e: React.MouseEvent,
    rowIndex: number,
    colIndex: number,
  ) => {
    e.preventDefault();
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newGrid[rowIndex]?.[colIndex];

    if (cell && !cell.isRevealed) {
      cell.isFlagged = !cell.isFlagged;
      setGrid(newGrid);
    }
  };

  return (
    <div className="grid grid-cols-8 gap-1">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            onContextMenu={(e: any) =>
              handleCellRightClick(e, rowIndex, colIndex)
            }
          />
        )),
      )}
    </div>
  );
};

export default Grid;
