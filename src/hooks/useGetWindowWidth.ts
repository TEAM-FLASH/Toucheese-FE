import { useEffect, useState } from 'react';

// 추후 debounce나 throttle을 이용하여 호출 횟수 조절 예정
const useGetWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};

export default useGetWindowWidth;
