export interface TagType {
  Id: number;
  UserId: string;
  Rating: number;
  LikedFeatureId: number;
  ImprovedFeatureId: number;
  Feedback: string | null;
  CreatedOn: Date;
}