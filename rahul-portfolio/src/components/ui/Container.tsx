'use client';

import { forwardRef, type HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, size = 'xl', className = '', ...props }, ref) => {
    const sizeStyles = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[1200px]',
      full: 'max-full'
    };

    return (
      <div
        ref={ref}
        className={`mx-auto w-full px-6 md:px-10 ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';