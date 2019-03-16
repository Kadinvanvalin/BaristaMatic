
const  BaristaMatic =require('../src/baristaMatic');
const Inventory = require('../src/inventory')
const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');



const coffee = new Ingredient({name:"Coffee", cost: 75});
const decafCoffee = new Ingredient({name:"Decaf Coffee", cost: 75});
const sugar = new Ingredient({name:"Sugar", cost: 25});
const cream = new Ingredient({name:"Cream", cost: 25});
const steamedMilk = new Ingredient({name:"Steamed Milk", cost: 35});
const foamedMilk = new Ingredient({name:"Foamed Milk", cost: 35});
const espresso = new Ingredient({name:"Espresso", cost: 110});
const cocoa = new Ingredient({name:"Cocoa", cost: 90});
const whippedCream = new Ingredient({name:"Whipped Cream", cost: 100});


const allIngredients = [
    coffee,
    decafCoffee,
    sugar,
    cream,
    steamedMilk,
    foamedMilk,
    espresso,
    cocoa,
    whippedCream
]


const recipes = [
  new Recipe({name:"Coffee", 
        ingredients: [
            { amount: 3, kind: coffee }, 
            { amount: 1, kind: sugar },
            { amount: 1, kind: cream }
        ] 
    }),
  new Recipe({name:"Decaf Coffee", 
        ingredients: [
            { amount: 3, kind: decafCoffee },
            { amount: 1, kind: sugar },
            { amount: 1, kind: cream }
        ]
    }),
   new Recipe({name:"Caffe Latte",
        ingredients: [
            { amount: 2, kind: espresso },
            { amount: 1, kind: steamedMilk }
        ] 
    }),
    new Recipe({name:"Caffe Americano", 
        ingredients: [
            { amount: 3, kind: espresso },
        ]
    }),
   new Recipe({name:"Caffe Mocha",
        ingredients: [
            { amount: 1, kind: espresso },
            { amount: 1, kind: cocoa },
            { amount: 1, kind: steamedMilk },
            { amount: 1, kind: whippedCream }
        ] 
    }),
   new Recipe({name:"Cappuccino", 
        ingredients: [
            { amount: 2, kind: espresso },
            { amount: 1, kind: steamedMilk },
            { amount: 1, kind: foamedMilk }
        ] 
    })
]

const totalInventory = allIngredients.map((ingredient) =>{ return new Inventory({name: ingredient, amount: 10})})



new BaristaMatic(totalInventory, recipes)
    