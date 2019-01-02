/**
 *
 * When we need to maintain a list of objects base on events.
 * Usually implemented in  Meteor Js publish and submit methods*
 *

 *Another link where implements observer is Meteor Js:
 * https://docs.meteor.com/api/pubsub.html
 */

class Car {
    constructor(gas) {
        this.gas = gas;
    }

    setGasLevel(val) {
        this.gas = val;
        this.notifyAll();
    }

    register(observer) {
        this.actions.push(observer);
    }

    unregister(observer) {
        this.actions.remove.filter(function(el) {
            return el !== observer;
        });
    }

    /*
    This notifies wherever happens with the gas
     */
    notifyAll() {
        return this.actions.forEach(function(el) {
            el.update(this);
        }.bind(this));
    }
}

//We update the car gas
class consumption {
    update(car) {
        car.gas = car.gas + 1;
    }
}
