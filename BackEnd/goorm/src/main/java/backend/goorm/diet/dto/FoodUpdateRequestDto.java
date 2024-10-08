package backend.goorm.diet.dto;

import backend.goorm.diet.entity.Food;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodUpdateRequestDto {

        private String foodName;
        private Float calories;
        private Float carbohydrate;
        private Float protein;
        private Float fat;
        private Float sugar;
        private Float salt;
        private Float cholesterol;
        private Float saturatedFat;
        private Float transFat;

        public void updateEntity(Food food) {

                food.setFoodName(this.foodName);
                food.setCalories(this.calories);
                food.setCarbohydrate(this.carbohydrate);
                food.setProtein(this.protein);
                food.setFat(this.fat);
                food.setSugar(this.sugar);
                food.setSalt(this.salt);
                food.setCholesterol(this.cholesterol);
                food.setSaturatedFat(this.saturatedFat);
                food.setTransFat(this.transFat);
        }
}
