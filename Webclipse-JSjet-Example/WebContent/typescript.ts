/*
 * == Introduction ==
 *
 * This file walks you through TypeScript development in Eclipse with JSjet.
 * For the basic JavaScript walkthrough, please open index.js. 
 * 
 */

/*
 * == Setup ==
 * 
 * If you don't have line numbers enabled in the editor, turn them on using
 * the context menu in the ruler area on the left.
 * 
 */

interface Person {
  firstName: string;
  lastName: string;
}

/**
 * Example class
 */
class Student {
  constructor(public firstName, public lastName) {
  }

  getFullName(): string {
    return this.firstName + this.lastName;
  }

}

var johnDoe = new Student("John", "Doe");

/*  
 * == Content Assist ==
 * 
 * Uncomment line 49 and type in a period (.) after "johnDoe". Content assist will 
 * automatically show you some possibilities, including firstName and lastName fields,
 * and the getFullName method defined above. As you type, filtering will reduce the number 
 * of suggestions displayed. Press enter to insert the selected suggestion.
 *  
 * Content assist can also be manually invoked at any time by pressing 
 * Ctrl + Space (or Alt + / with Emacs bindings)
 */

//johnDoe

/*
 * == Outline & Navigation ==
 * 
 * Observe the Outline view on the right, which shows you the structure of this 
 * file (if the view is not visible, open it using: 
 * Window > Show View > Outline)
 * 
 * You can select any item in the outline view to navigate to that location in
 * your source. 
 * 
 * A faster method of navigation is the quick outline. 
 * Press Ctrl + O to activate the quick outline. In the view, type "s"
 * which will filter results to Student class. 
 * Press enter to navigate to that method immediately - really fast!
 * 
 * You can also navigate via hyperlinks. On line 72, press the Ctrl key and 
 * hover over "getFullName". You will see it underlined, clicking it will take
 * you to the method definition instantly.
 * 
 */

var fullName = johnDoe.getFullName();

/*
 * == Validation ==
 * 
 * Uncomment line 89 to see a validation error in the ruler area. 
 * Hover over these errors to see the validation error messages explaining what 
 * is wrong with your code.
 * 
 * Now open Webclipse-JSjet-Example/tsconfig.json file and change 
 * "noImplicitAny" value to true, save changes and agree to rebuild - you will 
 * now see 2 new errors on line 26. If we replace constructor signature to: 
 * constructor(public firstName: string, public lastName: string)
 * both errors will go away.
 * 
 */

//fullName = johnDoe.fullName;

/*
 * == Formatting == 
 * 
 * To see how this works, select lines 102-103 and press Ctrl + Shift + F.
 * You can format the entire file as well, by invoking the formatter without
 * having an active selection.
 * 
 * To change formatting preferences, go to:
 * Window > Preferences > TypeScript > Formatter 
 */

function greeter(person: Person) { return "Hello, " + person.firstName;
 }
 
/*
 * == Compile on Save ==
 * 
 * Webclipse supports TypeScript files compilation when changed file is saved.
 * This option works if compileOnSave is set to true in tsconfig.json. Uncomment
 * line 116 and save changes. You will see that there is typescript.js file in
 * Webclipse-JSjet-Example/dist folder which now contains that line of code.
 * 
 */

//document.body.innerHTML = greeter(johnDoe);