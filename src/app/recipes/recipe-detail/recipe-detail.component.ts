import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.module';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipeSelected: Recipe;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this.shoppingListService.addIngredient(ingredient);
    });
  }

}
