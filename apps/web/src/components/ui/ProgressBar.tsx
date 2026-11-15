import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

type ProgressBarVariant = 'primary' | 'accent' | 'success' | 'warning' | 'danger';
type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  label?: string;
  showValue?: boolean;
  valueLabel?: string;
  animated?: boolean;
  striped?: boolean;
  className?: string;
  wrapperClassName?: string;
}

const variantClasses: Record<ProgressBarVariant, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
};

const trackColors: Record<ProgressBarVariant, string> = {
  primary: 'bg-primary-50',
  accent: 'bg-accent/20',
  success: 'bg-green-50',
  warning: 'bg-amber-50',
  danger: 'bg-red-50',
};

const sizeClasses: Record<ProgressBarSize, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  label,
  showValue = false,
  valueLabel,
  animated = true,
  className,
  wrapperClassName,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full', wrapperClassName)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showValue && (
            <span className="text-sm text-gray-500">
              {valueLabel || `${Math.round(percentage)}%`}
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          'w-full rounded-full overflow-hidden',
          trackColors[variant],
          sizeClasses[size],
          className
        )}
      >
        <div
          className={cn(
            'h-full rounded-full',
            variantClasses[variant],
            animated && 'transition-all duration-700 ease-out'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
