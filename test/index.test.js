const chai = require('chai')
const expect = chai.expect;
const BaristaMatic =require('../src/baristaMatic');
const sinon = require('sinon')
const util = require('../src/log');
const sandbox = sinon.createSandbox();
const sinonChai = require("sinon-chai");
const Inventory = require('../src/inventory')
const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');
chai.use(sinonChai);


describe("discovery tests", function () {
    let logStub;
    afterEach(sandbox.restore);
   beforeEach(function() {
        logStub = sandbox.stub(util, 'log');
   });

    it('should pass this canary test', function () {
        expect(true).to.equal(true);
    });

    it('init of BaristaMatic should call #startUpRender and #listen', function() { 
        const listenStub = sandbox.stub(BaristaMatic.prototype, 'listen');
        const startUpRenderStub = sandbox.stub(BaristaMatic.prototype, 'startUpRender');

        const subject = new BaristaMatic();


       expect(listenStub).to.have.been.callCount(1);
        expect(startUpRenderStub).to.have.been.callCount(1);
  });

    it('init of BaristaMatic should call #startUpRender which calls #renderInventory and #renderMenu', function() { 
        const renderInventoryStub = sandbox.stub(BaristaMatic.prototype, 'renderInventory');
        const renderMenuStub = sandbox.stub(BaristaMatic.prototype, 'renderMenu');
        const startUpRenderSpy = sandbox.spy(BaristaMatic.prototype, 'startUpRender');
        // we are stubbing listen to prevent it from being called on init
       sandbox.stub(BaristaMatic.prototype, 'listen');

        const subject = new BaristaMatic();

        expect(startUpRenderSpy).to.have.been.callCount(1);

        expect(renderMenuStub).to.have.been.callCount(1);
        expect(renderInventoryStub).to.have.been.callCount(1);
    });

    it('#renderInventory should log the header and call #formatInventory', function() {
        const formatInventoryStub = sandbox.spy(BaristaMatic.prototype, 'formatInventory');


        // we are stubbing listen to prevent it from being called on init
       sandbox.stub(BaristaMatic.prototype, 'listen');
       sandbox.stub(BaristaMatic.prototype, 'renderMenu');

       const subject = new BaristaMatic();

       expect(formatInventoryStub).to.have.been.callCount(1);
       expect(logStub).to.have.been.calledWith("Inventory:\n");
       expect(logStub).to.have.been.calledWith(subject.formatInventory());
    });


    it('#formatInventory should take an array of inventory objects return a string of that object formatted', function() {
        // we are stubbing listen to prevent it from being called on init
        sandbox.stub(BaristaMatic.prototype, 'startUpRender');
        sandbox.stub(BaristaMatic.prototype, 'listen');

       const subject = new BaristaMatic();
       const coffee = new Inventory({name:"coffee", amount: 1});
       const sugar = new Inventory({name:"sugar", amount: 1});

        const formattedInventory = subject.formatInventory([coffee, sugar])
        expect(formattedInventory).to.equal('coffee,1\nsugar,1')
    });

    it('BaristaMatic will format inventory that it accepts on init', function() {
        // we are stubbing listen to prevent it from being called on init
        sandbox.stub(BaristaMatic.prototype, 'startUpRender');
        sandbox.stub(BaristaMatic.prototype, 'listen');
       const coffee = new Inventory({name:"coffee", amount: 1});
       const sugar = new Inventory({name:"sugar", amount: 1});
       const subject = new BaristaMatic([coffee, sugar]);

       subject.renderInventory()

       expect(logStub).to.have.been.calledWith("Inventory:\n");
       expect(logStub).to.have.been.calledWith('coffee,1\nsugar,1');
    });


    it('#renderMenu should call log with menu, and log #formatRecipe', function() { 
        // we are stubbing listen to prevent it from being called on init
       sandbox.stub(BaristaMatic.prototype, 'listen');
       sandbox.stub(BaristaMatic.prototype, 'startUpRender');
       const formatRecipeStub = sandbox.stub(BaristaMatic.prototype, 'formatRecipe');
       sandbox.spy(BaristaMatic.prototype, 'renderMenu');

        const subject = new BaristaMatic();
        subject.renderMenu();


        expect(logStub).to.have.been.calledWith("Menu:\n");
        expect(logStub).to.have.been.calledWith(subject.formatRecipe());
    });

    xit('#formatRecipe should take an array of objects, and return a string with order number and the objects', function() { 
        // we are stubbing listen to prevent it from being called on init
       sandbox.stub(BaristaMatic.prototype, 'listen');
       sandbox.stub(BaristaMatic.prototype, 'startUpRender');
  

        const subject = new BaristaMatic();
        const formattedRecipe = subject.formatRecipe(["tasty treats", "candy", "water"]);


        expect(formattedRecipe).to.equal("1,tasty treats\n2,candy\n3,water");
    });


    it("Inventory can be created with ingredient objects", function () {
        const coffee = new Ingredient({name:"Coffee", cost: 75});
        const inventoryOfCoffee = new Inventory({name: coffee, amount: 10});
        expect(inventoryOfCoffee.name).to.equal("Coffee")
    });
    it("Recipes are created with ingredient objects, and can find the cost of the recipe based on the amount and cost of ingredients", function() {
        const coffee = new Ingredient({name:"coffee", cost: 75});
        const sugar = new Ingredient({name:"sugar", cost: 25});
       const coffeeRecipe =  new Recipe({name:"Coffee", ingredients: [{amount: 3, kind: coffee}, {amount: 1, kind: sugar}] });

       const costOfCoffee = coffeeRecipe.cost;
        expect(costOfCoffee).to.equal(250)
    });
});
