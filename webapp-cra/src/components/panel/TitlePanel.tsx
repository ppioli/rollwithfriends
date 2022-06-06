import { ReactNode } from "react";

interface TitleProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function TitlePanel({ title, description, children }: TitleProps) {
  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6 mb-3">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h2 className="h4">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">{children}</div>
      </div>
    </div>
  );
}
