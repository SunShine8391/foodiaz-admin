export interface MostUsedIngredientItem {
  ImagePath: string;
  IngredientName: string;
  IngredietId: number;
  id: number;
  usedNumber: number;
}

export interface LessUsedIngredientItem {
  ImageUrl: string;
  IngredientName: string;
  IngredietId: number;
  id: number;
  usedNumber: number;
}

export interface PurchasedItem {
  Id: number;
  ImageUrl: string;
  Name: string;
  PurchasedCount: number;
}

export interface RecipeItem {
  Name: string;
  NumberOfRate: number;
  Rating: number;
  RecipeId: number;
  ImageUrl: string;
}

export interface SavedRecipeItem {
  Name: string;
  RecipeId: number;
  SavedCount: number;
  ImageUrl: string;
}

export interface CommentedRecipeItem {
  CommentCount: number;
  Name: string;
  RecipeId: number;
  ImageUrl: string;
}

export interface MealTypeRatioItemType {
  MealTypeId: number,
  MealTypeName: string,
  IsActive: boolean,
  Ratio: number
}

interface DatabaseMetricsTypeNotNull {
  TotalRecipe: number;
  MissingCuisineTypeCount: number;
  MissingRecipeIngredientCount: number;
  MissingImageCount: number;
  MissingNutritionCount: number;
  MissingMealTypeCount: number;
  TotalIngredients: number;
  mealTypeRatios: MealTypeRatioItemType[],
  cusineTypeRatios: MealTypeRatioItemType[]
}

export type DatabaseMetricsType = DatabaseMetricsTypeNotNull | null;
