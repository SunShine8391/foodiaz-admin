export interface FirebaseError {
  errorCode: string;
  userDisplayMessage: string;
}

export type Option = Record<"value" | "label", string> & Record<string, string>;

export interface Person {
  id: number;
  name: string;
}

export type UserSubscription = "premium" | "free";

export interface User {
  id: string;
  userName: string;
  country: string;
  device: string;
  zipCode: string;
  uid: string;
  subscription: UserSubscription;
}

export interface GoalChart {
  value: number;
  name: string;
  color: string;
}
