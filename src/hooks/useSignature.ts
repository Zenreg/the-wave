import { useEffect, useState, useRef } from 'react';

// Séquence signature : Paix@62
const SIG_SEQ = ['p', 'a', 'i', 'x', '@', '6', '2'];

// Nom affiché (obfusqué par XOR)
const D = [22, 0, 11, 10, 41, 85, 87, 112, 38, 44, 42, 14, 115, 104];
const K = [112, 97, 105, 120, 64, 54, 50];

function r(): string {
  return D.map((c, i) => String.fromCharCode(c ^ K[i % K.length])).join('');
}

export function useSignature() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const sigPos = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key;

      if (key === SIG_SEQ[sigPos.current] || key.toLowerCase() === SIG_SEQ[sigPos.current]) {
        sigPos.current++;
        if (sigPos.current === SIG_SEQ.length) {
          setText(r());
          setVisible(true);
          sigPos.current = 0;
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setVisible(false), 6000);
        }
      } else {
        sigPos.current = 0;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(timer.current);
    };
  }, []);

  return { visible, text };
}
