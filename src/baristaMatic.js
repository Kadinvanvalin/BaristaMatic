
const Util = require('./log');
class BaristaMatic {
    constructor(inventory, recipes) {
        this.quit = {
            condition: (check) => check.toLowerCase() === 'q',
            action: () => { this.done() }
        };

        this.dispense = {
            condition: (check) => !isNaN(check),
            action: (userInput) => { 
                this.dispenseOrder(userInput)
                this.startUpRender();
            }
        };
    
        this.restock = {
            condition: (check) => check.toLowerCase() === 'r',
            action: () => { 
                this.restockInventory();
                this.startUpRender();
            }
        };
    
        this.userActions = [this.restock, this.dispense, this.quit];


        this.inventory = inventory;
        this.recipes = recipes;

        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        this.startUpRender();
        this.listen(); 
    }

    restockInventory() {
        console.log(this.inventory)
        this.inventory.forEach((items) => { items.amount = 10 });
    }

    listen() {
        process.stdin.on('data',  (text) => {
             const userInput = text.trim()
        this.userActions
            .find(pattern => pattern.condition(userInput))
            .action(userInput);
              });
    }

     done() {
      Utils.log('Now that process.stdin is paused, there is nothing more to do.');
      process.exit()
    }

     startUpRender() {
         this.renderInventory();
         this.renderMenu();
    }

    renderInventory () {
        Util.log("Inventory:\n")
        const formattedInventory = this.formatInventory(this.inventory);
        Util.log(formattedInventory);
    }

    formatInventory (totalInventory) {
        if(!totalInventory) return '';

        if(Util.isIterable(totalInventory)) {
            return totalInventory.map((inventoryItem) => `${inventoryItem.name},${inventoryItem.amount}`).join('\n')
        }
        throw new Error('Wrong inventory format');
    }

    renderMenu () {
        Util.log("Menu:\n")
        const formattedRecipes = this.formatRecipe(this.recipes);
       Util.log(formattedRecipes)
    }

    formatRecipe(recipes) {
        if(!recipes) return '';

        if(Util.isIterable(recipes)) {
            return recipes.map((recipe, index) => `${index + 1},${recipe},${this.canMake(recipe)}`).join('\n')
        }
        throw new Error('Wrong recipe format');
    }

    canMake(customerOrder) {
        try {
            customerOrder.ingredientList.map((ingredient) => {
                let foundItem = this.inventory.find((item) =>  item.name === ingredient.kind.name);
              
                if(foundItem.amount - ingredient.amount < 0) throw new Error("Item not found");
            });
            return true;
        } catch (e) {
            return false;
        }
    }

    dispenseOrder (orderNumber) {
        try {
            const customerOrder = this.recipes[orderNumber - 1];
            if(customerOrder) {
                
                this.removeInventoryForOrder(customerOrder);
                Util.log("Dispensing: " + customerOrder.name)
            } else {
                Util.log("That is not a valid option")
            }
        } catch(e) {
            Util.log(e.message)
        }
    }

    removeInventoryForOrder(customerOrder) {
        customerOrder.ingredientList.forEach((ingredient) => {
            this.inventory.forEach((item) => {
                if(item.name === ingredient.kind.name) {
                    console.log(item.name)
                    item.amount = item.amount - ingredient.amount;
                }
            });
        });
    }
}

module.exports = BaristaMatic;