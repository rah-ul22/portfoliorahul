'use client';

interface TextProps {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'subtle' | 'accent';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function Text({ 
  children, 
  as = 'p', 
  size = 'base', 
  weight = 'normal', 
  color = 'default',
  align = 'left',
  className = '',
}: TextProps) {
  const sizeStyles = {
    xs: 'text-xs leading-relaxed',
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-relaxed'
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold text-bold'
  };

  const colorStyles = {
    default: 'text-text',
    muted: 'text-text-muted',
    subtle: 'text-text-subtle',
    accent: 'text-accent'
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const Component = as;

  return (
    <Component
      className={`${sizeStyles[size]} ${weightStyles[weight]} ${colorStyles[color]} ${alignStyles[align]} ${className}`}
    >
      {children}
    </Component>
  );
}

Text.displayName = 'Text';