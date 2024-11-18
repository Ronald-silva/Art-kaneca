import React from "react";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary focus:outline-none sm:text-sm",
          className || ""
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
