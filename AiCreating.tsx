/**
 * @fileoverview AiCreating - AI Assistant Processing Animation Component
 *
 * A multi-stage animation component that visualizes an AI assistant processing
 * a user's request. Shows a friendly robot character going through stages:
 * idle → reading → processing → delivering → complete
 *
 * @module AiCreating
 * @requires react
 * @requires ./AiCreating.css
 *
 * @example
 * // Basic usage - show loading animation
 * <AiCreating isLoading={true} />
 *
 * @example
 * // With completion callback and custom size
 * <AiCreating
 *   isLoading={isProcessing}
 *   onComplete={() => console.log('Animation complete')}
 *   size="lg"
 * />
 *
 * @example
 * // Full-screen overlay mode
 * <AiCreating isLoading={true} size="full" />
 */

'use client';

import { useEffect, useState } from 'react';
import './AiCreating.css';

/**
 * Animation stage type representing the current state of the AI processing animation.
 *
 * @typedef {'idle' | 'reading' | 'processing' | 'delivering' | 'complete'} AnimationStage
 *
 * Stage flow and timing:
 * - idle: Initial state, no animation shown
 * - reading: (0-1.8s) Robot reads user's request card
 * - processing: (1.8-3.6s) Gears spinning, sparkles appear
 * - delivering: (3.6s+) Result card slides in
 * - complete: Final state with checkmark, triggers onComplete after 1.2s
 */
type AnimationStage = 'idle' | 'reading' | 'processing' | 'delivering' | 'complete';

/**
 * Props for the AiCreating component.
 *
 * @interface AiCreatingProps
 */
export interface AiCreatingProps {
  /**
   * Controls whether the animation is running.
   * When true, starts the animation sequence from 'reading' stage.
   * When false (after being true), transitions to 'complete' stage.
   *
   * @type {boolean}
   * @required
   */
  isLoading: boolean;

  /**
   * Callback function invoked when the animation sequence completes.
   * Called 1.2 seconds after the 'complete' stage is reached.
   *
   * @type {() => void}
   * @optional
   */
  onComplete?: () => void;

  /**
   * Size variant for the animation container.
   * - 'xs': Extra small (suitable for inline indicators)
   * - 'sm': Small (compact display)
   * - 'md': Medium (default, balanced size)
   * - 'lg': Large (prominent display)
   * - 'full': Full-screen overlay mode
   *
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'full'}
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
}

/**
 * AiCreating - AI Assistant Processing Animation Component
 *
 * Renders an animated robot character that visualizes AI processing stages.
 * The animation automatically progresses through stages when isLoading is true.
 *
 * @component
 * @param {AiCreatingProps} props - Component props
 * @returns {JSX.Element} The animated AI processing visualization
 *
 * @description
 * Component Structure:
 * - Wrapper container with size-based CSS class
 * - Background particles for ambient animation
 * - Robot character (head with eyes, mouth, antenna; body with chest light)
 * - Request card (shown during reading/processing stages)
 * - Processing gears and sparkles (shown during processing stage)
 * - Result card (shown during delivering/complete stages)
 * - Status text area with animated dots
 * - Progress indicator with 4-step tracker
 *
 * CSS Classes Applied:
 * - .ai-creating-wrapper.size-{size} - Container sizing
 * - .ai-creating-container.stage-{stage} - Stage-specific animations
 * - .ai-robot.{stage} - Robot state animations
 */
export default function AiCreating({
  isLoading,
  onComplete,
  size = 'md'
}: AiCreatingProps): JSX.Element {
  /**
   * Current animation stage state.
   * Automatically transitions through stages based on timers when isLoading is true.
   */
  const [stage, setStage] = useState<AnimationStage>('idle');

  /**
   * Effect: Manages stage transitions based on isLoading state.
   *
   * When isLoading becomes true:
   * - Immediately sets stage to 'reading'
   * - After 1800ms, transitions to 'processing'
   * - After 3600ms, transitions to 'delivering'
   *
   * When isLoading becomes false (and not in idle/reading):
   * - Sets stage to 'complete'
   * - After 1200ms, calls onComplete and resets to 'idle'
   */
  useEffect(() => {
    if (isLoading) {
      setStage('reading');
      const t1 = setTimeout(() => setStage('processing'), 1800);
      const t2 = setTimeout(() => setStage('delivering'), 3600);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else if (stage !== 'idle' && stage !== 'reading') {
      setStage('complete');
      const t = setTimeout(() => {
        onComplete?.();
        setStage('idle');
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  /**
   * Human-readable status text for each animation stage.
   * Displayed below the robot character during animation.
   */
  const stageText: Record<AnimationStage, string> = {
    idle: '',
    reading: 'Reading your request',
    processing: 'Working on it',
    delivering: 'Almost there',
    complete: 'Done!'
  };

  return (
    <div className={`ai-creating-wrapper size-${size}`}>
      <div className={`ai-creating-container stage-${stage}`}>

        {/* Animated Background Particles */}
        <div className="particles">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>

        {/* Main Content */}
        <div className="ai-scene">

          {/* AI Robot Character */}
          <div className={`ai-robot ${stage}`}>
            <div className="robot-head">
              <div className="robot-face">
                <div className="robot-eyes">
                  <div className="eye left">
                    <div className="pupil"></div>
                  </div>
                  <div className="eye right">
                    <div className="pupil"></div>
                  </div>
                </div>
                <div className="robot-mouth"></div>
              </div>
              <div className="antenna">
                <div className="antenna-ball"></div>
              </div>
            </div>
            <div className="robot-body">
              <div className="chest-light"></div>
            </div>
          </div>

          {/* User Request Card - Reading Stage */}
          {(stage === 'reading' || stage === 'processing') && (
            <div className={`request-card ${stage}`}>
              <div className="card-icon">📝</div>
              <div className="card-lines">
                <span className="line"></span>
                <span className="line short"></span>
              </div>
            </div>
          )}

          {/* Processing Gears - Processing Stage */}
          {stage === 'processing' && (
            <div className="processing-visual">
              <div className="gear gear-1">⚙️</div>
              <div className="gear gear-2">⚙️</div>
              <div className="sparkles">
                <span>✨</span><span>✨</span><span>✨</span>
              </div>
            </div>
          )}

          {/* Result Card - Delivering Stage */}
          {(stage === 'delivering' || stage === 'complete') && (
            <div className={`result-card ${stage}`}>
              <div className="result-icon">{stage === 'complete' ? '✅' : '📄'}</div>
              <div className="result-lines">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line short"></span>
              </div>
            </div>
          )}

          {/* Status Text */}
          {stage !== 'idle' && (
            <div className="status-area">
              <span className={`status-text ${stage}`}>{stageText[stage]}</span>
              {stage !== 'complete' && (
                <span className="dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
              )}
            </div>
          )}

          {/* Progress Indicator */}
          <div className="progress-track">
            <div className={`progress-bar stage-${stage}`}></div>
            <div className="progress-steps">
              <div className={`step ${stage !== 'idle' ? 'active' : ''}`}></div>
              <div className={`step ${stage === 'processing' || stage === 'delivering' || stage === 'complete' ? 'active' : ''}`}></div>
              <div className={`step ${stage === 'delivering' || stage === 'complete' ? 'active' : ''}`}></div>
              <div className={`step ${stage === 'complete' ? 'active' : ''}`}></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
