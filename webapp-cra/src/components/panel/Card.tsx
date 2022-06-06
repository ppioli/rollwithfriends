import { ReactNode } from "react";
import { Input } from "components/form/Input";

export interface CardProps {
  children: ReactNode;
  footer?: ReactNode;
  layout?: string;
  className?: string;
}

export function Card({ children, footer, layout, className }: CardProps) {
  return (
    <div
      className={`shadow rounded-md overflow-hidden flex flex-col ${
        className ?? ""
      }`}
    >
      <div
        className={`flex-1 px-4 py-5 bg-white space-y-6 sm:p-6 h-auto h-full ${
          layout ?? ""
        }`}
      >
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">{footer}</div>
      )}
    </div>
  );
}
