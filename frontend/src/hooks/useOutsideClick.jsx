import { useEffect, useRef } from 'react';

const useOutsideClick = (handler, listenCapturing = true) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    window.addEventListener('click', handleClick, listenCapturing);

    return () => window.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
};

export default useOutsideClick;
