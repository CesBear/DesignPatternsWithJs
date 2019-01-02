/**
 * Explanation:
 *
 * Make functions and instances after being created
 * we added anew function with our class Car and we created a new instance *
 */

class Car {
    constructor(doors, engine, color) {
        this.doors = doors;
        this.engine = engine;
        this.color = color;
    }
}

class CarFactory {
    createCar(type) {
        switch(type) {
            case 'civic':
                return new Car(4, 'V6', 'grey')
            case 'honda':
                return new Car(2, 'V4', 'red')
        }
    }
}

//We create the mixing
let carMixin = {
    revEngine() {
        console.log(`The ${this.engine} is doing Vroom Vroom!`);
    }
};

const carFactory = new CarFactory();

const autoManufacturer = (type, model) => {
    switch(type) {
        case 'car':
            return carFactory.createCar(model);
        case 'suv':
            return suvFactory.createSuv(model);
    }
};

//assign the mixing to the object
Object.assign(Car.prototype, carMixin);

const honda = autoManufacturer('car', 'honda');

honda.revEngine();
