/**

 The MVC design pattern emerged from the Xerox Smalltalk research project in the 1970s and into the 80s.
 It is a pattern that has stood the test of time for front-end graphical user interfaces. The pattern came from desktop
 applications but has proven to be effective for web apps too.

 At its crux, the MVC design pattern is about a clean cut separation of concerns. The idea is to make the solution
 intelligible and inviting. Any fellow programmer looking to make specific changes can find the right spot with ease.


 Link: https://www.sitepoint.com/mvc-design-pattern-javascript/
 */

// THE CONTROLLER

var PenguinController = function PenguinController(penguinView, penguinModel) {
    this.penguinView = penguinView;
    this.penguinModel = penguinModel;
};

/**
 The constructor uses inversion of control and injects modules in this way.
 This pattern enables you to inject any component that meets the high-level contract.
 Think of it as a nice way to abstract code from implementation details.
 This pattern empowers you to write clean code in plain JavaScript.
 Then, user events get wired up and handled in this way:
 */

PenguinController.prototype.initialize = function initialize() {
    this.penguinView.onClickGetPenguin = this.onClickGetPenguin.bind(this);
};

PenguinController.prototype.onClickGetPenguin = function onClickGetPenguin(e) {
    var target = e.currentTarget;
    var index = parseInt(target.dataset.penguinIndex, 10);

    this.penguinModel.getPenguin(index, this.showPenguin.bind(this));
};


/**
 * Note this event uses the current target to grab the state stored in the DOM.
 * The DOM, in this case, tells you everything you need to know about its current state.
 * The current state of the DOM is what users see on the browser.
 * You can store state data in the DOM itself, as long as the controller does not change state.

 When an event is fired, the controller grabs the data and says what happens next.
 The this.showPenguin() callback is of interest:
 *
 */

PenguinController.prototype.showPenguin = function showPenguin(penguinModelData) {
    var penguinViewModel = {
        name: penguinModelData.name,
        imageUrl: penguinModelData.imageUrl,
        size: penguinModelData.size,
        favoriteFood: penguinModelData.favoriteFood
    };

    penguinViewModel.previousIndex = penguinModelData.index - 1;
    penguinViewModel.nextIndex = penguinModelData.index + 1;

    if (penguinModelData.index === 0) {
        penguinViewModel.previousIndex = penguinModelData.count - 1;
    }

    if (penguinModelData.index === penguinModelData.count - 1) {
        penguinViewModel.nextIndex = 0;
    }

    this.penguinView.render(penguinViewModel);
};

/**
 * The controller calculates indexes for each penguin and tells the view to render this.
 * It grabs data from the model and transforms it into an object the view understands and cares about.

 Here is a unit test of the happy path when showing a penguin:
 *
 */
var PenguinViewMock = function PenguinViewMock() {
    this.calledRenderWith = null;
};

PenguinViewMock.prototype.render = function render(penguinViewModel) {
    this.calledRenderWith = penguinViewModel;
};

// Arrange
var penguinViewMock = new PenguinViewMock();

var controller = new PenguinController(penguinViewMock, null);

var penguinModelData = {
    name: 'Chinstrap',
    imageUrl: 'http://chinstrapl.jpg',
    size: '5.0kg (m), 4.8kg (f)',
    favoriteFood: 'krill',
    index: 2,
    count: 5
};

// Act
controller.showPenguin(penguinModelData);

// Assert
assert.strictEqual(penguinViewMock.calledRenderWith.name, 'Chinstrap');
assert.strictEqual(penguinViewMock.calledRenderWith.imageUrl, 'http://chinstrapl.jpg');
assert.strictEqual(penguinViewMock.calledRenderWith.size, '5.0kg (m), 4.8kg (f)');
assert.strictEqual(penguinViewMock.calledRenderWith.favoriteFood, 'krill');
assert.strictEqual(penguinViewMock.calledRenderWith.previousIndex, 1);
assert.strictEqual(penguinViewMock.calledRenderWith.nextIndex, 3);

/**
 * Note the controller does not care about implementation details.
 * It uses the contracts the view provides like this.render().
 * This is the discipline necessary for clean code.
 * The controller can trust each component to do what it says it will do.
 * This adds transparency which makes the code readable.
 *
 */



//****************************** THE VIEW ******************************
    //The view only cares about the DOM element and wiring up events, for example:

var PenguinView = function PenguinView(element) {
    this.element = element;

    this.onClickGetPenguin = null;
};


PenguinView.prototype.render = function render(viewModel) {
    this.element.innerHTML = '<h3>' + viewModel.name + '</h3>' +
        '<img class="penguin-image" src="' + viewModel.imageUrl +
        '" alt="' + viewModel.name + '" />' +
        '<p><b>Size:</b> ' + viewModel.size + '</p>' +
        '<p><b>Favorite food:</b> ' + viewModel.favoriteFood + '</p>' +
        '<a id="previousPenguin" class="previous button" href="javascript:void(0);"' +
        ' data-penguin-index="' + viewModel.previousIndex + '">Previous</a> ' +
        '<a id="nextPenguin" class="next button" href="javascript:void(0);"' +
        ' data-penguin-index="' + viewModel.nextIndex + '">Next</a>';

    this.previousIndex = viewModel.previousIndex;
    this.nextIndex = viewModel.nextIndex;

    // Wire up click events, and let the controller handle events
    var previousPenguin = this.element.querySelector('#previousPenguin');
    previousPenguin.addEventListener('click', this.onClickGetPenguin);

    var nextPenguin = this.element.querySelector('#nextPenguin');
    nextPenguin.addEventListener('click', this.onClickGetPenguin);
    nextPenguin.focus();
};

//the Test

var ElementMock = function ElementMock() {
    this.innerHTML = null;
};

// Stub functions, so we can pass the test
ElementMock.prototype.querySelector = function querySelector() { };
ElementMock.prototype.addEventListener = function addEventListener() { };
ElementMock.prototype.focus = function focus() { };

// Arrange
var elementMock = new ElementMock();

var view = new PenguinView(elementMock);

var viewModel = {
    name: 'Chinstrap',
    imageUrl: 'http://chinstrap1.jpg',
    size: '5.0kg (m), 4.8kg (f)',
    favoriteFood: 'krill',
    previousIndex: 1,
    nextIndex: 2
};

// Act
view.render(viewModel);

// Assert
assert(elementMock.innerHTML.indexOf(viewModel.name) > 0);
assert(elementMock.innerHTML.indexOf(viewModel.imageUrl) > 0);
assert(elementMock.innerHTML.indexOf(viewModel.size) > 0);
assert(elementMock.innerHTML.indexOf(viewModel.favoriteFood) > 0);
assert(elementMock.innerHTML.indexOf(viewModel.previousIndex) > 0);
assert(elementMock.innerHTML.indexOf(viewModel.nextIndex) > 0);


//******************************THE MODEL **********************************
//In MVC, all the model cares about is Ajax. For example:
var PenguinModel = function PenguinModel(XMLHttpRequest) {
    this.XMLHttpRequest = XMLHttpRequest;
};

/**
 * In MVC, all the model cares about is Ajax. For example
 *
 */


PenguinModel.prototype.getPenguin = function getPenguin(index, fn) {
    var oReq = new this.XMLHttpRequest();

    oReq.onload = function onLoad(e) {
        var ajaxResponse = JSON.parse(e.currentTarget.responseText);
        // The index must be an integer type, else this fails
        var penguin = ajaxResponse[index];

        penguin.index = index;
        penguin.count = ajaxResponse.length;

        fn(penguin);
    };

    oReq.open('GET', 'https://codepen.io/beautifulcoder/pen/vmOOLr.js', true);
    oReq.send();
};

// The Test

var LIST_OF_PENGUINS = '[{"name":"Emperor","imageUrl":"http://imageUrl",' +
    '"size":"36.7kg (m), 28.4kg (f)","favoriteFood":"fish and squid"}]';

var XMLHttpRequestMock = function XMLHttpRequestMock() {
    // The system under test must set this, else the test fails
    this.onload = null;
};

XMLHttpRequestMock.prototype.open = function open(method, url, async) {
    // Internal checks, system under test must have a method and url endpoint
    assert(method);
    assert(url);
    // If Ajax is not async, you’re doing it wrong :-)
    assert.strictEqual(async, true);
};

XMLHttpRequestMock.prototype.send = function send() {
    // Callback on this object simulates an Ajax request
    this.onload({ currentTarget: { responseText: LIST_OF_PENGUINS } });
};

// Arrange
var penguinModel = new PenguinModel(XMLHttpRequestMock);

// Act
penguinModel.getPenguin(0, function onPenguinData(penguinData) {

    // Assert
    assert.strictEqual(penguinData.name, 'Emperor');
    assert(penguinData.imageUrl);
    assert.strictEqual(penguinData.size, '36.7kg (m), 28.4kg (f)');
    assert.strictEqual(penguinData.favoriteFood, 'fish and squid');
    assert.strictEqual(penguinData.index, 0);
    assert.strictEqual(penguinData.count, 1);
});

/**
 *
 *As you can see, the model only cares about raw data.
 * This means working with Ajax and JavaScript objects.
 * If you are unclear about Ajax in vanilla JavaScript, there is an article with more info.
 * https://www.sitepoint.com/guide-vanilla-ajax-without-jquery/
 */