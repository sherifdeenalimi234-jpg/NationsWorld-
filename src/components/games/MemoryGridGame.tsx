import React, { useState, useEffect } from 'react';
import { recordGameCompletion } from '../../services/gameStorage';
import { GameHeader, GameResultsScreen } from './GameHeader';
import { Eye, Layers } from 'lucide-react';

interface MemoryGridProps {
  onExit: () => void;
  onViewProgress?: () => void;
}

interface GridCell {
  id: number;
  isTarget: boolean;
  color: string;
}

const COLOR_PALETTE = ['#12A875', '#D6B56D', '#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B'];

export const MemoryGridGame: React.FC<MemoryGridProps> = ({ onExit, onViewProgress }) => {
  const [gridSize, setGridSize] = useState<3 | 4 | 5>(3);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'memorize' | 'recall' | 'feedback'>('memorize');
  const [cells, setCells] = useState<GridCell[]>([]);
  const [targetIds, setTargetIds] = useState<number[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [timer, setTimer] = useState(3);
  const [isFinished, setIsFinished] = useState(false);
  const [finalXp, setFinalXp] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  useEffect(() => {
    generateGrid(gridSize);
  }, [gridSize, level]);

  useEffect(() => {
    let t: any = null;
    if (phase === 'memorize' && timer > 0) {
      t = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (phase === 'memorize' && timer === 0) {
      setPhase('recall');
    }
    return () => clearInterval(t);
  }, [phase, timer]);

  const generateGrid = (size: number) => {
    const totalCells = size * size;
    const numTargets = size === 3 ? 3 : size === 4 ? 5 : 7;
    const chosenTargets = new Set<number>();

    while (chosenTargets.size < numTargets) {
      const rand = Math.floor(Math.random() * totalCells);
      chosenTargets.add(rand);
    }

    const tArray = Array.from(chosenTargets);
    const chosenColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];

    const newCells: GridCell[] = Array.from({ length: totalCells }, (_, i) => ({
      id: i,
      isTarget: chosenTargets.has(i),
      color: chosenTargets.has(i) ? chosenColor : '#0B3D2E',
    }));

    setCells(newCells);
    setTargetIds(tArray);
    setSelectedIds([]);
    setTimer(3);
    setPhase('memorize');
  };

  const handleCellClick = (cellId: number) => {
    if (phase !== 'recall' || selectedIds.includes(cellId)) return;

    const newSelected = [...selectedIds, cellId];
    setSelectedIds(newSelected);

    if (newSelected.length === targetIds.length) {
      // Evaluate
      setPhase('feedback');
      const correctSelected = newSelected.filter((id) => targetIds.includes(id)).length;
      const roundScore = correctSelected * 100;
      setScore((prev) => prev + roundScore);

      setTimeout(() => {
        if (level < 4) {
          setLevel((prev) => prev + 1);
          if (level === 2) setGridSize(4);
          if (level === 3) setGridSize(5);
        } else {
          handleFinishGame(score + roundScore);
        }
      }, 1500);
    }
  };

  const handleFinishGame = (finalScore: number) => {
    const earnedXp = Math.max(100, finalScore);
    const result = recordGameCompletion({
      gameId: 'memory-grid',
      earnedXp,
      score: finalScore,
      skillsImpact: { criticalThinking: 10, decisionMaking: 5 }
    });

    setFinalXp(earnedXp);
    setUnlockedAchievements(result.newlyUnlockedAchievements);
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <GameResultsScreen
        gameTitle="MEMORY GRID"
        score={score}
        xpEarned={finalXp}
        summaryText={`Completed ${level} levels up to a ${gridSize}x${gridSize} grid!`}
        skillsPracticed={['Visual Memory', 'Spatial Recall', 'Focus']}
        newAchievements={unlockedAchievements}
        onPlayAgain={() => {
          setGridSize(3);
          setLevel(1);
          setScore(0);
          setIsFinished(false);
        }}
        onBackToCenter={onExit}
        onViewProgress={onViewProgress}
      />
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col bg-obsidian text-ivory">
      <GameHeader
        title="Memory Grid"
        categoryLabel="VISUAL MEMORY"
        currentStep={level}
        totalSteps={4}
        score={score}
        onExit={onExit}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-between">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Layers className="w-4 h-4" />
            LEVEL {level} — GRID {gridSize}x{gridSize}
          </span>
          {phase === 'memorize' ? (
            <div className="flex items-center justify-center gap-2 text-mint font-bold text-sm">
              <Eye className="w-4 h-4 animate-pulse" />
              <span>MEMORIZE THE POSITIONS ({timer}s)</span>
            </div>
          ) : phase === 'recall' ? (
            <p className="text-xs text-sage">
              Select the <span className="font-bold text-gold">{targetIds.length}</span> highlighted positions! ({selectedIds.length}/{targetIds.length})
            </p>
          ) : (
            <p className="text-xs text-mint font-bold">Evaluating pattern recall...</p>
          )}
        </div>

        {/* Grid Display */}
        <div className="my-auto py-6">
          <div
            className="grid gap-2 sm:gap-3 p-4 sm:p-6 bg-deep-emerald/50 border border-gold/30 rounded-2xl shadow-2xl backdrop-blur-md"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              width: gridSize === 3 ? '280px' : gridSize === 4 ? '340px' : '380px',
            }}
          >
            {cells.map((cell) => {
              const isSelected = selectedIds.includes(cell.id);
              let cellBg = 'bg-obsidian/80 border-gold/20';

              if (phase === 'memorize' && cell.isTarget) {
                cellBg = 'border-gold shadow-lg shadow-gold/20';
              } else if (phase === 'recall') {
                if (isSelected) {
                  cellBg = 'bg-emerald border-mint text-white shadow-md';
                }
              } else if (phase === 'feedback') {
                if (cell.isTarget && isSelected) {
                  cellBg = 'bg-emerald border-mint shadow-md';
                } else if (!cell.isTarget && isSelected) {
                  cellBg = 'bg-red-800 border-red-500';
                } else if (cell.isTarget && !isSelected) {
                  cellBg = 'bg-gold/40 border-gold';
                }
              }

              return (
                <button
                  key={cell.id}
                  type="button"
                  disabled={phase !== 'recall'}
                  onClick={() => handleCellClick(cell.id)}
                  style={{
                    backgroundColor: phase === 'memorize' && cell.isTarget ? cell.color : undefined,
                    height: gridSize === 3 ? '72px' : gridSize === 4 ? '60px' : '52px',
                  }}
                  className={`rounded-xl border transition-all duration-300 flex items-center justify-center font-extrabold text-lg focus:outline-none ${cellBg}`}
                >
                  {phase === 'feedback' && cell.isTarget && isSelected && '✓'}
                  {phase === 'feedback' && !cell.isTarget && isSelected && '✕'}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
