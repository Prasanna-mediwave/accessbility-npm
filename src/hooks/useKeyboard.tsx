import { useEffect } from 'react';

const useKeyboard = (state: any) => {
  useEffect(() => {
    function escHandler(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        state(false);
      }
    }

    document.addEventListener('keyup', escHandler);

    return () => {
      document.removeEventListener('keyup', escHandler);
    };
  }, []);
};

export default useKeyboard;
