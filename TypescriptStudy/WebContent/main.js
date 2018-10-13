/**
 * New typescript file
 */
var name = 'Carlos Fábio';
var total = 0;
var sentence = "My name is " + name + ".\n  I am a beginer in Typescript.";
console.log(sentence);
// Array
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
var person1 = ['Fábio', 37];
console.log(person1);
// Enum
var Color;
(function (Color) {
    Color[Color["Red"] = 5] = "Red";
    Color[Color["Green"] = 6] = "Green";
    Color[Color["Blue"] = 7] = "Blue";
})(Color || (Color = {}));
;
var colorGreen = Color.Green;
console.log(colorGreen);
// type any and unknow
var randomValue = 10;
randomValue = true;
randomValue = 'Fabomba';
console.log(randomValue);
var myVar = 10;
console.log(myVar.toUpperCase);
function hasNamePropertie(obj) {
    return !!obj && typeof obj === "object" && "name" in obj;
}
if (hasNamePropertie(myVar)) {
    console.log(myVar.name);
}
else {
    console.log('Não tem a propriedade nome...');
}
// multiType
var multiType;
multiType = 20;
multiType = true;
console.log(multiType);
