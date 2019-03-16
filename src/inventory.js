class Inventory {
    constructor(params) {    
        const { name, amount } = params;

        this._name = name;
        this._amount = amount;
    }

    get name () {
        return this._name.toString();
    }

    get amount() {
        return this._amount
    }

    set amount(newValue) {
        if(newValue < 0) throw new Error ('Inventory item too low')
        this._amount = newValue;
    }
}
module.exports = Inventory;