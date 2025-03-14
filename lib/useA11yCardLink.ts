import { useCallback, useRef } from 'react';

interface A11yCardLinkOptions {
  linkSelector?: string;
  clickThreshold?: number;
  disabled?: boolean;
  onNavigate?: (href: string) => void;
}

export const useA11yCardLink = ({
  linkSelector = 'a',
  clickThreshold = 200,
  disabled = false,
  onNavigate,
}: A11yCardLinkOptions = {}) => {
  const clickStartTime = useRef<number | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (disabled || e.button !== 0) return;
    clickStartTime.current = Date.now();
  }, [disabled]);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (disabled || e.button !== 0 || clickStartTime.current === null) return;

    const elapsedTime = Date.now() - clickStartTime.current;
    clickStartTime.current = null;

    if (
      elapsedTime < clickThreshold &&
      window.getSelection()?.toString() === '' &&
      !e.target.closest('a, button, input, select, textarea')
    ) {
      const link = e.currentTarget.querySelector(linkSelector) as HTMLAnchorElement | null;
      const href = link?.getAttribute('href');
      if (href) {
        onNavigate?.(href);
      }
    }
  }, [disabled, clickThreshold, linkSelector, onNavigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (disabled || (e.key !== 'Enter' && e.key !== ' ')) return;

    e.preventDefault();
    const link = e.currentTarget.querySelector(linkSelector) as HTMLAnchorElement | null;
    const href = link?.getAttribute('href');
    if (href) {
      onNavigate?.(href);
    }
  }, [disabled, linkSelector, onNavigate]);

  return {
    props: {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onKeyDown: handleKeyDown,
      tabIndex: disabled ? -1 : 0,
      role: 'link',
    },
  };
};
