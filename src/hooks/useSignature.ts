import { useEffect, useState, useRef } from 'react';

// Séquence : ↑ ↑ ↓ ↓ ← → ← → W A V E
const SEQ = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'w', 'a', 'v', 'e',
];

const D = [50,9,7,5,8,21,0,18,119,119,102,58,45,63,87,8309,86,38,64,217,83,64,17,29,23,87,5,19,69,102,88,87,20,35,9,19,18];
const K = [116,104,101,119,97,118,101,50,48,50,52];

function r(): string {
  return D.map((c, i) => String.fromCharCode(c ^ K[i % K.length])).join('');
}

export function useSignature() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const pos = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === SEQ[pos.current]) {
        pos.current++;
        if (pos.current === SEQ.length) {
          setText(r());
          setVisible(true);
          pos.current = 0;
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setVisible(false), 6000);
        }
      } else {
        pos.current = 0;
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
