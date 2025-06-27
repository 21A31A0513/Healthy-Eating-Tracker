import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodItem } from '../food-item.interface';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="meal-list">
      <h2>Today's Meals</h2>
      <div class="add-meal">
        <input [(ngModel)]="newMeal.name" placeholder="Food name" type="text">
        <input [(ngModel)]="newMeal.calories" placeholder="Calories" type="number">
        <input [(ngModel)]="newMeal.protein" placeholder="Protein (g)" type="number">
        <input [(ngModel)]="newMeal.carbs" placeholder="Carbs (g)" type="number">
        <input [(ngModel)]="newMeal.fats" placeholder="Fats (g)" type="number">
        <button (click)="addMeal()">Add Meal</button>
      </div>

      <div class="meals">
        <div *ngFor="let meal of meals" class="meal-item">
          <h3>{{ meal.name }}</h3>
          <p><span>Calories:</span> <span>{{ meal.calories }}</span></p>
          <p><span>Protein:</span> <span>{{ meal.protein }}g</span></p>
          <p><span>Carbs:</span> <span>{{ meal.carbs }}g</span></p>
          <p><span>Fats:</span> <span>{{ meal.fats }}g</span></p>
          <button (click)="deleteMeal(meal.id)">Delete</button>
        </div>
      </div>

      <div class="daily-summary">
        <h3>Daily Summary</h3>
        <p><span>Total Calories:</span> <span>{{ getTotalCalories() }}</span></p>
        <p><span>Total Protein:</span> <span>{{ getTotalProtein() }}g</span></p>
        <p><span>Total Carbs:</span> <span>{{ getTotalCarbs() }}g</span></p>
        <p><span>Total Fats:</span> <span>{{ getTotalFats() }}g</span></p>
      </div>
    </div>
  `
})
export class MealListComponent {
  meals: FoodItem[] = [];
  newMeal: FoodItem = {
    id: 0,
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    date: new Date()
  };

  addMeal() {
    if (this.newMeal.name && this.newMeal.calories) {
      this.meals.push({
        ...this.newMeal,
        id: Date.now(),
        date: new Date()
      });
      this.newMeal = {
        id: 0,
        name: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        date: new Date()
      };
    }
  }

  deleteMeal(id: number) {
    this.meals = this.meals.filter(meal => meal.id !== id);
  }

  getTotalCalories(): number {
    return this.meals.reduce((sum, meal) => sum + meal.calories, 0);
  }

  getTotalProtein(): number {
    return this.meals.reduce((sum, meal) => sum + meal.protein, 0);
  }

  getTotalCarbs(): number {
    return this.meals.reduce((sum, meal) => sum + meal.carbs, 0);
  }

  getTotalFats(): number {
    return this.meals.reduce((sum, meal) => sum + meal.fats, 0);
  }
}