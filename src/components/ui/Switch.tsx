"use client";

import { useState } from "react";

type Props = {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
};

export function Switch({ checked, onCheckedChange }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`
        inline-flex items-center h-6 w-11 rounded-full transition-colors 
        ${checked ? "bg-green-500" : "bg-gray-300"} 
        ${focused ? "ring-2 ring-offset-2 ring-primary" : ""}
      `}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
