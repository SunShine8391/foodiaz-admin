export type Duration = "1d" | "7d" | "1m" | "3m" | "6m";

export type Months = "6m" | "1y" | "3y";

export interface UsersByGenderItem {
  gender: string;
  value: number;
}

export interface AppOpensItem {
  value: number;
  event_date: {
    value: string;
  };
}

export interface WithUserId {
  userId: string;
}

export interface PopularFeatureItem {
  label: string;
  value: number;
}

export interface RageTapsItem {
  page_name: string;
  value: number;
}