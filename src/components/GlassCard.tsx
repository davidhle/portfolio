import type { ComponentPropsWithoutRef, ElementType } from 'react';
import './GlassCard.css';

type GlassCardProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

// Shared frosted-glass container — every piece of page content sits in one.
export function GlassCard<T extends ElementType = 'div'>({
  as,
  className,
  ...rest
}: GlassCardProps<T>) {
  const Component = as ?? 'div';
  return <Component className={['glass-card', className].filter(Boolean).join(' ')} {...rest} />;
}
