'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Palette, RotateCcw } from 'lucide-react';

export interface ColorConfig {
  primary: string;
  accent: string;
  background: string;
}

export interface PreviewControlsProps {
  children: ReactNode;
  showColorPicker?: boolean;
  defaultColors?: Partial<ColorConfig>;
  onColorsChange?: (colors: ColorConfig) => void;
  title?: string;
  subtitle?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const presetColors = [
  { name: 'Violet', primary: '#8b5cf6', accent: '#a78bfa' },
  { name: 'Blue', primary: '#3b82f6', accent: '#60a5fa' },
  { name: 'Emerald', primary: '#10b981', accent: '#34d399' },
  { name: 'Rose', primary: '#f43f5e', accent: '#fb7185' },
  { name: 'Orange', primary: '#f97316', accent: '#fb923c' },
  { name: 'Cyan', primary: '#06b6d4', accent: '#22d3ee' },
];

export function PreviewControls({
  children,
  showColorPicker = true,
  defaultColors,
  onColorsChange,
  title = 'Preview',
  subtitle = 'Interactive component demo',
  gradientFrom = 'from-violet-500',
  gradientTo = 'to-purple-500',
}: PreviewControlsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Sync with gallery theme on mount and when theme changes
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const galleryIsDark = resolvedTheme === 'dark';
      setIsDark(galleryIsDark);
    }
  }, [mounted, resolvedTheme]);
  const [selectedColor, setSelectedColor] = useState(presetColors[0]);
  const [customPrimary, setCustomPrimary] = useState(defaultColors?.primary || '#8b5cf6');

  const handleColorChange = (color: typeof presetColors[0]) => {
    setSelectedColor(color);
    setCustomPrimary(color.primary);
    onColorsChange?.({
      primary: color.primary,
      accent: color.accent,
      background: isDark ? '#09090b' : '#ffffff',
    });
  };

  const handleCustomColorChange = (color: string) => {
    setCustomPrimary(color);
    onColorsChange?.({
      primary: color,
      accent: color,
      background: isDark ? '#09090b' : '#ffffff',
    });
  };

  const resetColors = () => {
    handleColorChange(presetColors[0]);
  };

  return (
    <div className="bg-card rounded-xl border overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="text-white/80 text-sm">{subtitle}</p>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsDark(!isDark);
                onColorsChange?.({
                  primary: customPrimary,
                  accent: selectedColor.accent,
                  background: !isDark ? '#09090b' : '#ffffff',
                });
              }}
              className={`
                p-2 rounded-lg transition-all
                ${isDark
                  ? 'bg-white/20 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
                }
              `}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Color Controls */}
      {showColorPicker && (
        <div className="px-6 py-3 border-b bg-muted/30 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Theme:</span>
          </div>

          {/* Preset Colors */}
          <div className="flex items-center gap-1.5">
            {presetColors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorChange(color)}
                className={`
                  w-6 h-6 rounded-full transition-all border-2
                  ${selectedColor.name === color.name
                    ? 'border-foreground scale-110'
                    : 'border-transparent hover:scale-105'
                  }
                `}
                style={{ backgroundColor: color.primary }}
                title={color.name}
              />
            ))}
          </div>

          {/* Custom Color Picker */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Custom:</label>
            <input
              type="color"
              value={customPrimary}
              onChange={(e) => handleCustomColorChange(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={resetColors}
            className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="Reset colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Mode Badge */}
          <div className={`
            ml-auto px-2 py-1 rounded text-xs font-medium
            ${isDark ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-800'}
          `}>
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </div>
        </div>
      )}

      {/* Preview Area */}
      <div
        className={`
          p-6 min-h-[400px] transition-colors duration-300
          ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}
        `}
        style={{
          ['--preview-primary' as string]: customPrimary,
          ['--preview-accent' as string]: selectedColor.accent,
        }}
      >
        <div className={isDark ? 'dark' : ''}>
          <div className={`
            w-full h-full rounded-lg
            ${isDark ? 'text-white' : 'text-zinc-900'}
          `}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewControls;
