import type { SVGProps } from 'react';

export function TradeViewIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2l-2.4 4.8L4 8l4.8 2.4L8 16l4-4 4 4 1.2-4.8L20 8l-5.6-1.2L12 2z" fill="hsl(var(--primary))" stroke="none" />
      <path d="M12 2v20" stroke="hsl(var(--primary))" strokeWidth="1" />
    </svg>
  );
}
