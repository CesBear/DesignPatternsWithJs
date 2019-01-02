/**
 * Explanation:
 *
 *
 *
 *
 *
 */


let instance = null;

class Car {
    constructor(doors, engine, color) {
        if (!instance) {
            this.doors = doors;
            this.engine = engine;
            this.color = color;
            instance = this;
        } else {
            return instance;
        }
    }
}

const civic = new Car(4,'v6', 'grey');

//No matter what values are passed to the new instance this values will not be
//passed
const honda = new Car(4,'v4', 'red');


console.log(civic);
console.log(honda);
