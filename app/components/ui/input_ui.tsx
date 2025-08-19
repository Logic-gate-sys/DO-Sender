"use client";

import { ChangeEvent } from "react";
import clsx from "clsx";

type InputSize = "small" | "large";

interface InputFieldProps {
  label: string;
  name: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: InputSize; // default "small"
  placeholder?: string;
}

export default function InputField({
  label,
  name,
  id,
  type = "text",
  value,
  onChange,
  size = "small",
  placeholder,
}: InputFieldProps) {
  const inputClasses = clsx(
    "w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all",
    {
      "px-3 py-2 text-sm": size === "small",
      "px-4 py-3 text-base": size === "large",
    }
  );

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
      />
    </div>
  );
}
