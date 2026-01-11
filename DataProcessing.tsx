/**
 * @fileoverview DataProcessing - Pipeline Visualization Component
 *
 * An animated component that visualizes data flowing through a processing pipeline.
 * Shows three-stage progression (Input → Processing → Complete) with animated
 * data cards and progress counter. Ideal for ETL processes, data transformations,
 * or any multi-stage data workflows.
 *
 * @module DataProcessing
 * @requires react
 * @requires framer-motion
 * @requires lucide-react
 *
 * @example
 * // Basic usage
 * <DataProcessing isProcessing={true} />
 *
 * @example
 * // With completion callback
 * <DataProcessing
 *   isProcessing={isTransforming}
 *   onComplete={() => {
 *     setIsTransforming(false);
 *     refreshData();
 *   }}
 * />
 *
 * @example
 * // Controlled processing state
 * const [isProcessing, setIsProcessing] = useState(false);
 * <button onClick={() => setIsProcessing(true)}>Start Pipeline</button>
 * <DataProcessing isProcessing={isProcessing} />
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Database, Cpu, CheckCircle } from 'lucide-react';

/**
 * Pipeline stage type representing current processing phase.
 *
 * @typedef {'input' | 'processing' | 'output' | 'complete'} PipelineStage
 *
 * Stage flow and timing:
 * - input: (0-0.8s) Initial data ingestion stage
 * - processing: (0.8-2.5s) Active data transformation
 * - output: (2.5-4s) Results being generated
 * - complete: (4s+) Pipeline finished, triggers onComplete
 */
type PipelineStage = 'input' | 'processing' | 'output' | 'complete';

/**
 * Props for the DataProcessing component.
 *
 * @interface DataProcessingProps
 */
export interface DataProcessingProps {
  /**
   * Controls whether the pipeline animation is active.
   * When true, starts the processing animation sequence.
   * When false, resets to initial 'input' stage.
   *
   * @type {boolean}
   * @required
   */
  isProcessing: boolean;

  /**
   * Callback function invoked when pipeline reaches 'complete' stage.
   * Called once when stage transitions to complete (~4 seconds after start).
   *
   * @type {() => void}
   * @optional
   */
  onComplete?: () => void;
}

/**
 * DataProcessing - Pipeline Visualization Component
 *
 * Renders an animated data pipeline with three stages, flowing data cards,
 * connection progress bars, and real-time processing counter.
 *
 * @component
 * @param {DataProcessingProps} props - Component props
 * @returns {JSX.Element} Data pipeline visualization
 *
 * @description
 * Visual Elements:
 * - Stage icons: Database (Input), CPU (Processing), CheckCircle (Complete)
 * - Connection lines: Animated fill showing progress between stages
 * - Data cards: 3 cards flowing through the pipeline with rotation effects
 * - Stats display: Processed count (0-100) and current stage status
 *
 * Stage Timing:
 * - 0ms: Start at 'input' stage
 * - 800ms: Transition to 'processing' stage
 * - 2500ms: Transition to 'output' stage
 * - 4000ms: Transition to 'complete' stage, trigger onComplete
 *
 * Data Counter:
 * - Increments by 1 every 40ms
 * - Reaches 100 in ~4 seconds (synchronized with stage completion)
 *
 * Icons Used (lucide-react):
 * - Database: Input stage indicator
 * - Cpu: Processing stage indicator
 * - CheckCircle: Complete stage indicator
 */
export default function DataProcessing({ isProcessing, onComplete }: DataProcessingProps): JSX.Element {
  /**
   * Current pipeline stage state.
   * Automatically transitions through stages based on timers.
   */
  const [stage, setStage] = useState<PipelineStage>('input');

  /**
   * Processed data counter (0-100).
   * Increments every 40ms during processing.
   */
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    if (isProcessing) {
      // Progress through stages
      const inputTimer = setTimeout(() => setStage('processing'), 800);
      const processTimer = setTimeout(() => setStage('output'), 2500);
      const outputTimer = setTimeout(() => setStage('complete'), 4000);

      // Increment data counter
      const counterInterval = setInterval(() => {
        setDataCount(prev => Math.min(prev + 1, 100));
      }, 40);

      return () => {
        clearTimeout(inputTimer);
        clearTimeout(processTimer);
        clearTimeout(outputTimer);
        clearInterval(counterInterval);
      };
    } else {
      setStage('input');
      setDataCount(0);
    }
  }, [isProcessing]);

  useEffect(() => {
    if (stage === 'complete') {
      onComplete?.();
    }
  }, [stage, onComplete]);

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="relative">
        {/* Pipeline Stages */}
        <div className="flex items-center justify-between mb-8">
          {/* Stage 1: Input */}
          <motion.div
            className={`flex flex-col items-center ${
              stage === 'input' ? 'opacity-100' : 'opacity-50'
            }`}
            animate={stage === 'input' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: stage === 'input' ? Infinity : 0 }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              stage === 'input' ? 'bg-blue-500' : 'bg-gray-300'
            }`}>
              <Database className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-medium mt-2">Input</p>
          </motion.div>

          {/* Connection Line 1 */}
          <div className="flex-1 h-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: stage !== 'input' ? '100%' : '0%' }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Stage 2: Processing */}
          <motion.div
            className={`flex flex-col items-center ${
              stage === 'processing' ? 'opacity-100' : 'opacity-50'
            }`}
            animate={stage === 'processing' ? { rotate: [0, 360] } : {}}
            transition={{ duration: 2, repeat: stage === 'processing' ? Infinity : 0, ease: "linear" }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              stage === 'processing' ? 'bg-purple-500' : 'bg-gray-300'
            }`}>
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-medium mt-2">Processing</p>
          </motion.div>

          {/* Connection Line 2 */}
          <div className="flex-1 h-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: stage === 'output' || stage === 'complete' ? '100%' : '0%' }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Stage 3: Output */}
          <motion.div
            className={`flex flex-col items-center ${
              stage === 'output' || stage === 'complete' ? 'opacity-100' : 'opacity-50'
            }`}
            animate={stage === 'complete' ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              stage === 'complete' ? 'bg-green-500' : stage === 'output' ? 'bg-indigo-500' : 'bg-gray-300'
            }`}>
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-medium mt-2">Complete</p>
          </motion.div>
        </div>

        {/* Data Cards Animation */}
        <div className="relative h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg overflow-hidden">
          <AnimatePresence>
            {isProcessing && stage !== 'complete' && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-0 w-32 h-24 bg-white rounded-lg shadow-lg border-2 border-blue-300 flex items-center justify-center"
                    initial={{ x: -150, y: -50 }}
                    animate={{
                      x: [
                        -150,
                        150,
                        stage === 'processing' || stage === 'output' ? 400 : 150,
                        stage === 'output' ? 700 : 400,
                      ],
                      rotate: stage === 'processing' ? [0, 360, 720] : 0,
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.3,
                      times: [0, 0.25, 0.6, 1],
                      repeat: Infinity,
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <Database className="w-6 h-6 mx-auto text-blue-500" />
                      <p className="text-xs mt-1">Data {i + 1}</p>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Stats Display */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <p className="text-xs text-gray-500">Processed</p>
              <p className="text-2xl font-bold text-blue-600">{dataCount}</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-semibold text-gray-700 capitalize">{stage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
