import PCHeader from '@components/Header/PCHeader';
import ScrollToTop from '@hooks/useScrollToTop';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      {/* PC 버전 헤더 */}
      <PCHeader />
      <Outlet />
    </>
  );
};

export default Layout;
