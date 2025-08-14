import { useState, useEffect } from 'react';

// Gunakan awalan "use" agar dikenali sebagai hook
export function useSwiperLength() {
  const [nilai, setNilai] = useState<number>(1);

  useEffect(() => {
    function updateNilai() {
      if (window.matchMedia('(min-width: 1536px)').matches) {
        setNilai(5); // 2xl
      } else if (window.matchMedia('(min-width: 1280px)').matches) {
        setNilai(4); // xl
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        setNilai(3); // lg
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        setNilai(3); // md
      } else if (window.matchMedia('(min-width: 640px)').matches) {
        setNilai(1); // sm
      } else {
        setNilai(1); // default
      }
    }

    updateNilai(); // jalankan saat pertama kali
    window.addEventListener('resize', updateNilai);
    return () => window.removeEventListener('resize', updateNilai);
  }, []);

  return nilai;
}
