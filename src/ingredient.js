class Ingredient {
 constructor(params) {    
    const { name, cost } = params;

    this.name = name;
    this.cost = cost;
 }
    toString () {
        return this.name;
    }
}
module.exports = Ingredient;