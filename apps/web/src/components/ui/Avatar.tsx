import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { User } from 'lucide-react';

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  onClick?: () => void;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-xl',
  '2xl': 'w-28 h-28 text-3xl',
};

const statusClasses: Record<string, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-amber-400',
  busy: 'bg-red-500',
};

const statusSizeClasses: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5 border',
  sm: 'w-2 h-2 border',
  md: 'w-2.5 h-2.5 border-2',
  lg: 'w-3 h-3 border-2',
  xl: 'w-4 h-4 border-2',
  '2xl': 'w-5 h-5 border-2',
};

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return parts[0]?.slice(0, 2).toUpperCase() || '?';
}

function getAvatarColor(name: string): string {
  const colors = [
    'bg-primary text-white',
    'bg-accent text-primary-900',
    'bg-blue-500 text-white',
    'bg-purple-500 text-white',
    'bg-orange-500 text-white',
    'bg-pink-500 text-white',
    'bg-teal-500 text-white',
    'bg-indigo-500 text-white',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  className,
  onClick,
  status,
}: AvatarProps) {
  const hasImage = src && src.length > 0;
  const hasName = name && name.length > 0;

  return (
    <div className={cn('relative inline-flex shrink-0', onClick && 'cursor-pointer')}>
      <div
        onClick={onClick}
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center font-semibold select-none',
          sizeClasses[size],
          !hasImage && hasName && getAvatarColor(name),
          !hasImage && !hasName && 'bg-gray-200 text-gray-500',
          className
        )}
      >
        {hasImage ? (
          <Image
            src={src}
            alt={alt || name || 'Avatar'}
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        ) : hasName ? (
          <span>{getInitials(name)}</span>
        ) : (
          <User className="w-1/2 h-1/2" />
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-white',
            statusClasses[status],
            statusSizeClasses[size]
          )}
        />
      )}
    </div>
  );
}

export default Avatar;
