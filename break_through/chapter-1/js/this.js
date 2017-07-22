// function Human(name){
//     this.name = name;
// };
//
// Human.prototype.greet = function(){
//     console.log("Hello " + this.name);
// };
//
// var mike = new Human("Mike");
// mike.greet();

// callの使い方
// function Human(name){
//     this.name = name;
// };
//
// function greet(arg1, arg2){
//     console.log(arg1 + this.name + arg2);
// };
//
// var mike = new Human("Mike");
// greet.call(mike, "Hello ", "!!");


// applyの使い方
// function Human(name){
//     this.name = name;
// }
//
// function greet(arg1, arg2){
//     console.log(arg1 + this.name + arg2);
// }
//
// var mike = new Human("mike");
// greet.apply(mike,["hello ","!!"]);

// bindの使い方
function Human(name){
    this.name = name;
}

function greet(arg1, arg2){
    console.log(arg1 + this.name + arg2);
}

var mike = new Human("mike");
var greetMorning = greet.bind(mike);
greetMorning("good morning ", "!!");