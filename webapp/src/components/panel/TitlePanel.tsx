import { ReactNode } from "react";

interface TitleProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function TitlePanel({ title, description, children }: TitleProps) {
  return (
    <div>
      <div className="flex bg-dark p-4 round rounded-md overflow-hidden shadow">
        <div className="w-96 text-right px-6">
          <div className="px-4 sm:px-0">
            <h2 className="h2">{title}</h2>
            <p className="mt-1 text-sm">{description}</p>
          </div>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
