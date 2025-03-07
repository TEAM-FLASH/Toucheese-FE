import Error from '@components/Error/Error';
import Layout from '@components/Layout/Layout';

import StudioReviewWritePage from '@pages/Studio/StudioReview/StudioReviewWritePage';
import Auth from '@pages/User/Auth';
import AuthVerification from '@pages/User/AuthVerification';
import KakaoCallback from '@pages/User/KakaoCallback';
import LoginWithEmailPage from '@pages/User/LoginWithEmailPage';
import SignupSuccess from '@pages/User/signupSuccess';

import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('@pages/Home/Home'));
const Search = lazy(() => import('@pages/search/Search'));
const SearchResults = lazy(() => import('@pages/search/SearchResult'));
const StudioMain = lazy(() => import('@pages/Studio/StudioMain/StudioMain'));
const StudioMenu = lazy(() => import('@pages/Studio/StudioMenu/StudioMenu'));
const StudioMenuDetail = lazy(() => import('@pages/Studio/StudioMenu/StudioMenuDetail'));
const StudioPortfolio = lazy(() => import('@pages/Studio/StudioPortfolio/StudioPortfolio'));
const StudioReview = lazy(() => import('@pages/Studio/StudioReview/StudioReview'));
const StudioReviewPhotos = lazy(() => import('@pages/Studio/StudioReview/StudioReviewPhotos'));
const SignUp = lazy(() => import('@pages/User/SignUp'));
const MyPage = lazy(() => import('@pages/User/MyPage'));
const Profile = lazy(() => import('@pages/User/Profile'));
const ChangeProfile = lazy(() => import('@pages/User/ChangeProfile'));
const PasswordConfirm = lazy(() => import('@pages/User/PasswordConfirm'));
const ChangePassword = lazy(() => import('@pages/User/ChangePassword'));
const MyReviews = lazy(() => import('@pages/User/MyReviews'));
const BookmarkedStudios = lazy(() => import('@pages/User/BookmarkedStudios'));
const ReservationSchedule = lazy(() => import('@pages/Reservation/ReservationSchedule'));
const ReservationCheck = lazy(() => import('@pages/Reservation/ReservationCheck'));
const ReservationComplete = lazy(() => import('@pages/Reservation/ReservationComplete'));
const ReservationList = lazy(() => import('@pages/Reservation/ReservationList'));
const ReservationDetail = lazy(() => import('@pages/Reservation/ReservationDetail'));
const ReservationCanceled = lazy(() => import('@pages/Reservation/ReservationCanceled'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'user',
        children: [
          {
            path: 'auth',
            element: <Auth />,
          },
          {
            path: 'auth/kakao/callback',
            element: <KakaoCallback />,
          },
          {
            path: 'AuthVerification',
            element: <AuthVerification />,
          },

          {
            path: 'signup',
            element: <SignUp />,
          },

          {
            path: 'signupSuccess',
            element: <SignupSuccess />,
          },

          {
            path: 'mypage',
            element: <MyPage />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'profile/edit',
            element: <ChangeProfile />,
          },
          {
            path: 'profile/passwordConfirm',
            element: <PasswordConfirm />,
          },
          {
            path: 'profile/passwordChange',
            element: <ChangePassword />,
          },
          {
            path: 'myReviews',
            element: <MyReviews />,
          },
          {
            path: 'bookmarks',
            element: <BookmarkedStudios />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginWithEmailPage />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'search/results',
        element: <SearchResults />,
      },
      {
        path: 'studio/:_id',
        children: [
          { index: true, element: <StudioMain /> },
          {
            path: 'menu',
            children: [
              { index: true, element: <StudioMenu /> },
              { path: ':_menuId', element: <StudioMenuDetail /> },
            ],
          },
          { path: 'portfolio', element: <StudioPortfolio /> },
          {
            path: 'review',
            children: [
              {
                index: true,
                element: <StudioReview />,
              },
              { path: 'photos', element: <StudioReviewPhotos /> },
            ],
          },

          {
            path: 'reservation',
            children: [
              {
                index: true,
                element: <ReservationSchedule />,
              },
              {
                path: 'payment',
                element: <ReservationCheck />,
              },
              {
                path: 'complete',
                element: <ReservationComplete />,
              },
            ],
          },
        ],
      },
      {
        path: 'reservation',
        children: [
          {
            path: 'list',
            element: <ReservationList />,
          },
          {
            path: ':_id',
            children: [
              { index: true, element: <ReservationDetail /> },
              { path: 'canceled', element: <ReservationCanceled /> },
              { path: 'review/write', element: <StudioReviewWritePage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
