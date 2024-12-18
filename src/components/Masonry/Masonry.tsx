import { ReactNode } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const MasonryList = ({ children, gap = '.2rem', breakPoints = { 300: 2, 1024: 4 } }: { children: ReactNode; gap?: string; breakPoints?: { [key: number]: number } }) => {
  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={breakPoints}>
        <Masonry gutter={gap}>{children}</Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default MasonryList;
