class Recipe {
    constructor(params) {    
        const { name, ingredients } = params;

        this.name = name;
        this.ingredientList = ingredients;
        this.cost = this.findCostOfRecipe();
    }

    findCostOfRecipe () {
        const reducer = (accumulator, ingredient) => accumulator + ingredient.kind.cost * ingredient.amount
        return this.ingredientList.reduce(reducer,0);
    }

    toString() {
        return `${this.name},${this.renderCost}`
    }

    get renderCost() {
        var dollars = this.cost / 100;
        return dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
    }
}
module.exports = Recipe;