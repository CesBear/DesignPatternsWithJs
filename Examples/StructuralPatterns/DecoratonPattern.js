/**
 * Explanation
 *
 *it's basically a wrapper which extends the functionality of an object while maintaining object interface.

 */

//Example 1: Basic decoration of existing object constructors with new functionality

function vehicle( vehicleType ){
    /*properties and defaults*/
    this.vehicleType = vehicleType || 'car',
        this.model = 'default',
        this.license = '00000-000'
}
/*Test instance for a basic vehicle*/
let testInstance = new vehicle('car');
console.log(testInstance);
/*vehicle: car, model:default, license: 00000-000*/
/*Lets create a new instance of vehicle, to be decorated*/
let truck = new vehicle('truck');
/*New functionality we're decorating vehicle with*/
truck.setModel = function( modelName ){
    this.model = modelName;
};
truck.setColor = function( color ){
    this.color = color;
};

/*Test the value setters and value assignment works correctly*/
truck.setModel('CAT');
truck.setColor('blue');
console.log(truck);
/*vehicle:truck, model:CAT, color: blue*/
/*Demonstrate 'vehicle' is still unaltered*/
let secondInstance = new vehicle('car');
console.log(secondInstance);
/*as before, vehicle: car, model:default, license: 00000-000*/




//Example 2: Simply decorate objects with multiple decorators

//What we're going to decorate
function MacBook() {
    this.cost = function () { return 997; };
    this.screenSize = function () { return 13.3; };
}
/*Decorator 1*/
function Memory(macbook) {
    let v = macbook.cost();
    macbook.cost = function() {
        return v + 75;
    }
}
/*Decorator 2*/
function Engraving( macbook ){
    let v = macbook.cost();
    macbook.cost = function(){
        return  v + 200;
    };
}

/*Decorator 3*/
function Insurance( macbook ){
    let v = macbook.cost();
    macbook.cost = function(){
        return  v + 250;
    };
}
let mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);
console.log(mb.cost()); //1522
console.log(mb.screenSize()); //13.3


/**
 * Here, the decorators are overriding the superclass .cost() method to return the current price of the
 * MacBook plus with the cost of the upgrade being specified. It's considered a decoration as the original
 * MacBook object's constructor methods which are not overridden (eg. screenSize()) as well as any other properties
 * which we may define as a part of the MacBook remain unchanged and in tact.

 As you can probably tell, there isn't really a defined 'interface' in the above example and duck typing is used
 to shift the responsibility of ensuring an object meets an interface when moving from the creator to the receiver.
 */