import { Review } from '@pages/Studio/StudioReview/components/StudioReviewItem';

export interface IPortfolio {
  id: number;
  studio: string;
  vibe: string;
  name: string;
  url: string;
  menuId: null | number;
  menuName: null | string;
  description: string;
  created_at: null | string;
  updated_at: null | string;
}

export interface IReviewImages {
  reviewContent?: string;
  userName?: string;
  rating?: number;
  menuName?: string;
  id: number;
  reviewId: number;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface IMenus {
  id: number;
  studio: string;
  name: string;
  description: string;
  price: number;
  created_at: null | string;
  updated_at: null | string;
}

export interface IOptions {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface IOpeningHours {
  closeTime: string;
  closed: boolean;
  dayOfWeek: string;
  id: number;
  openTime: string;
  studioId: number;
  studioName: string;
}

export interface IHolidays {
  dayOfWeek: string;
  id: number;
  studioId: number;
  studioName: string;
  weekOfMonth: number;
}

interface IStudioInfo {
  id: number;
  vibe: string;
  addressSi: string;
  addressGu: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  view_count: number;
  rating: number;
  bookmark_count: number;
  review_count: number;
  latitude: null | number;
  longitude: null | number;
  subVibe: string;
  portfolios: IPortfolio[];
}

export interface IStudioItem extends IStudioInfo {
  options: IOptions[];
  open_time: string;
  close_time: string;
  menus: IMenus[];
  created_at: null | string;
  updated_at: null | string;
  dayOfWeek: string;
  bookmark: boolean;
}

export interface IStudioDetail extends IStudioInfo {
  options: (
    | 'CHANGING_ROOM'
    | 'DRESSING_ROOM'
    | 'HAIR_MAKEUP'
    | 'INDIVIDUAL_EDITING'
    | 'SUIT_RENTAL_FREE'
    | 'ORIGINAL_FILES'
    | 'PARKING_AREA'
  )[];
  openingHours: IOpeningHours[];
  holidays: IHolidays[];
  open: boolean;
}

export interface IStudioRes<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface IAdditionalOptionsRes {
  id: number;
  menuId: number;
  menu: string;
  name: string;
  price: number;
  description: string;
  duration: string | null;
  createTime: string | null;
  updateTime: string | null;
}

export interface IMenuListRes {
  id: number;
  studioId: number;
  studioName: string;
  name: string;
  description: string;
  price: number;
  additionalOptions: IAdditionalOptionsRes[];
  menuImages: IPortfolio[] | IReviewImages[];
  duration: string | null; //소요시간
  offerFile: string | null; //기본 제공 파일
  pictureNum: string | null; //촬영 수
  pictureSize: string | null; //인화 사이즈
  avgScore: number;
  reviews: { content: Review[] };
  reviewCount: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface IUser {
  accessToken: string | null;
  email: string | null;
  phone: string | null;
  registration: 'EMAIL' | 'kakao' | 'google' | null;
  user_id: number | null;
  username: string | null;
}

export interface IUserRes {
  accessToken: string;
  email: string;
  phone: string;
  registration: 'EMAIL' | 'kakao' | 'google';
  user_id: number;
  username: string;
}

export type IResvRes = IResvItem[];

export interface IResvItem {
  reservationId: number;
  studioId: number;
  studioName: string;
  menuId: number;
  menuName: string;
  menuImgUrl: string;
  status: 'WAITING' | 'RESERVED' | 'COMPLETED' | 'CANCELED';
  date: string;
  startTime: string;
  // 임시
  review?: {
    rating: number;
    content: string;
  };
}

export interface SortBy {
  VIEW_COUNT: string;
  POPULARITY: string;
  RATING: string;
  REVIEW_COUNT: string;
}

export interface IReservationData {
  reservationId: number;
  studioId: number;
  studioName: string;
  startTime: string;
  endTime: string;
  menuId: number;
  menuName: string;
  additionalMenuIds: number[];
  additionalMenuNames: string[];
  additionalMenuPrices: number[];
  userName: string;
  userPhone: string;
  note: string;
  totalPrice: number;
  status: 'WAITING' | 'RESERVED' | 'COMPLETED' | 'CANCELED';
  date: string;
  basicPrice: number;
  paymentMethod: string;
  menuImageUrl: string;
}
