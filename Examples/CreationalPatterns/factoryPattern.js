/**
 * Explanation:
 *
 *
 *
 *
 *
 */

class Car {
    constructor(doors, engine, color) {
        this.doors = doors;
        this.engine = engine;
        this.color = color;
    }
}

class carFactory {
    createCar(type) {
        switch(type) {
            case 'civic':
                return new Car(5, 'v6', 'grey');
            case 'honda':
                return new Car(6, 'v4', 'red');
        }
    }
}

const factory = new carFactory();
const honda = factory.createCar('honda');
console.log(honda);


