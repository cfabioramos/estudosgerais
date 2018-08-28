/*
 * == Introduction ==
 *
 * With the sample project in this tutorial, you will quickly learn
 * how to develop JavaScript and TypeScript in Eclipse using JSjet.
 * 
 */

/*
 * == Setup ==
 * 
 * If you don't have line numbers enabled in the editor, turn them on using
 * the context menu in the ruler area on the left.
 * 
 */

var JSjet = function() {
	this.exampleField = "example";
};

/**
 * Example method
 * @param {string} toshow
 */
JSjet.prototype.exampleMethod = function(toshow) {
	this.calledMethod();
	console.log(toshow);
};

var jet1 = new JSjet();

/*	
 * == Content Assist ==
 * 
 * Uncomment line 44 and type in a period (.) after "jet1". Content assist will 
 * automatically show you some possibilities, including the exampleField and
 * exampleMethod defined above. As you type, filtering will reduce the number 
 * of suggestions displayed. Press enter to insert the selected suggestion.
 *	
 * Content assist can also be manually invoked at any time by pressing 
 * Ctrl + Space (or Alt + / with Emacs bindings)
 */ 

//jet1


/*
 * We also provide a number of modules which provide advanced content assist.
 * The jQuery module has already been enabled for this project, uncomment 
 * line 55 and type in a period after the "$" to see advanced content assist for
 * the jQuery framework which includes documentation. You can enable other 
 * modules under Project Properties > JavaScript > Include Path (Technologies)
 */

//$

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
 * Press Ctrl + O to activate the quick outline. In the view, type "exampleM"
 * which will filter results until only the exampleMethod is selected. 
 * Press enter to navigate to that method immediately - really fast!
 * 
 * You can also navigate via hyperlinks. On line 78, press the Ctrl key and 
 * hover over "exampleMethod". You will see it underlined, clicking it will take
 * you to the method definition instantly.
 * 
 */

jet1.exampleMethod("Nothing");

/*
 * == Code Analysis ==
 * 
 * = Call Hierarchy = - this can be used to analyze calls to methods as well as 
 * variable references. 
 * 
 * Go to line 106, place your cursor in "calledMethod" 
 * and invoke the call hierarchy by typing Ctrl + Alt + H. 
 * Observe the results in the Call Hierarchy view indicating that calledMethod
 * was called by exampleMethod earlier in our code.
 * 
 * On line 107, invoke callHierarchy on exampleField to see the two references
 * to that field in our current source file.
 * 
 * = Search = - when you need more detailed analysis, you can use the JavaScript 
 * search from the Search > JavaScript menu (or press Ctrl + H and choose the 
 * JavaScript tab). Bring up this dialog and search for "oldVariable", select 
 * Var in the "Search For" section and "Write accesses". You will see the write
 * to this variable on line 107. If you repeat the process with "Read accesses",
 * you will see the read access online 108.
 *
 */

/**
 * Example for call hierarchy
 */
JSjet.prototype.calledMethod = function() {
	var oldVariable = this.exampleField;
	var newVariable = oldVariable;
};

/*
 * =Type Hierarchy= - the type hierarchy will handle several types of OOP that are
 * possible in JavaScript, including the old prototype based extension as well 
 * as the new class based subsclassing like the example below.
 * 
 * Place your cursor on line 119 in "JSSuperJet" and press F4 to see its type
 * hierarchy.
 */

class JSSuperJet extends JSjet {
		
}

/*
 * == Validation & Linting ==
 * 
 * Uncomment line 140 and 142 to see validation errors in the ruler area. 
 * Hover over these errors to see the validation error messages explaining what 
 * is wrong with your code.
 * 
 * For this project, we've enabled the JSHint linter as well, so in addition to
 * the validation errors on the above lines, you will also see linting errors. 
 * 
 * However, if you take a look at line 150 and 151, you will see warnings from 
 * JSHint about issues that aren't validation errors, but which could be 
 * problematic at runtime.
 * 
 */

//function () { }

//function badArgs(a,,b) { }

class ValidationTest {
	
	get foo() {
		return 0;
	}

	set boo(arg) {
		if (arg != 0) {
			//do nothing
		}		
	}
}

/*
 * == Formatting ==
 * 
 * JSjet uses esformatter to format and beautify your code. 
 * 
 * To see how this works, select lines 170-173 and press Ctrl + Shift + F.
 * You can format the entire file as well, by invoking the formatter without
 * having an active selection.
 * 
 * To change formatting preferences, go to:
 *  Window > Preferences > JavaScript > Code Style > Formatter 
 */

	function badFormat(p1,   p2,p3) 
{
			console.log( "This section of code is terribly formatted!");			
}

/*
 * == TypeScript ==
 * 
 * To proceed with the TypeScript portion of this tutorial,  
 * please open the typescript.ts file.
 *  
 */
 