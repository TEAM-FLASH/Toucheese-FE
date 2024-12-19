import { useState } from 'react';

const Clipboard = (text: string) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return { isCopied, copyToClipboard };
};

export default Clipboard;
