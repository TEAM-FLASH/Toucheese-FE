export interface IPortfolio {
  id: number;
  studio: string;
  vibe: string;
  name: string;
  url: string;
  description: string;
  created_at: string;
  updated_at: null | string;
}

export interface IReviewImages {
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

export interface IStudioItem {
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
  latitude: null | string;
  longitude: null | string;
  open_time: string;
  close_time: string;
  subVibe: string;
  portfolios: IPortfolio[];
  menus: IMenus[];
  options: [] | IOptions;
  created_at: null | string;
  updated_at: null | string;
  day_of_week: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  bookmark: boolean;
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

export interface IMenuImagesRes {
  id: number;
  menuId: number;
  menu: string;
  url: string;
  created_at: string | null;
  updated_at: string | null;
}
export interface IMenuListRes {
  id: number;
  studioId: number;
  studioName: string;
  name: string;
  description: string;
  price: number;
  duration: string | null;
  additionalOptions: IAdditionalOptionsRes[];
  menuImages: IPortfolio[] | IReviewImages[];
  reviewCount: number;
  created_at: string | null;
  updated_at: string | null;
}
