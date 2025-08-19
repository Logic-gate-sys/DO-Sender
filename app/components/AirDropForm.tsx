"use client"

import InputField from './ui/input_ui';
import { useState } from 'react';

export default function AirdropForm() {
  const [input, setInput] = useState("");

  return (
    <div className="max-w-md mx-auto p-4">
      <InputField
        label="Token Address"
        name="token"
        id="token"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter token address"
        size="large"
      />
    </div>
  );
}
