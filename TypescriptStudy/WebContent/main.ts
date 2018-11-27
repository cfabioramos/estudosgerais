/**
 * New typescript file
 */

let name: string = 'Carlos Fábio';
let total: number = 0;
let sentence: string = `My name is ${name}.
  I am a beginer in Typescript.`;

console.log(sentence);

// Array

let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

let person1: [string, number] = ['Fábio', 37];

console.log(person1);

// Enum
enum Color{Red = 5, Green, Blue};
let colorGreen: Color = Color.Green;

console.log(colorGreen);

// type any and unknow
let randomValue: any= 10;
randomValue = true;
randomValue = 'Fabomba';
console.log(randomValue);

let myVar: unknow = 10;
console.log((myVar as string).toUpperCase);

function hasNamePropertie(obj:any): obj is {name: string}{
  return !!obj && typeof obj === "object" && "name" in obj; 
}
if (hasNamePropertie(myVar)) {
  console.log(myVar.name);  
}
else {
   console.log('Não tem a propriedade nome...');
}

// multiType
let multiType: number | boolean;
multiType = 20;
multiType = true;
console.log(multiType);