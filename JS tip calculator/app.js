/***This app calculates tips by reading the input fields, calculating the tip, and setting the results fields to the calculated amounts.  It utilizes Immediately Invoked Function Expression (IIFE) for privacy and self-containment. ***/
 
var getInput = (function() {
    
    var domStrings = { 
        billAmount: '.bill',
        percentAmount: '.percent',
        submitInfo: '.submitInfo',
        totalAmount: '.totalAmount',
        tipAmount: '.tipAmount'
    }; //sets html classes to variables so that the code won't break in the event the classes are changed later on 
    
    return {
        readInput: function() { 
            return {
                bill: document.querySelector(domStrings.billAmount).value,
                percent: document.querySelector(domStrings.percentAmount).value
            }; // 4) bill and percent are set to whatever the user entered into the bill and tip percentage fields
        },
        
        getDomStrings: function() {
            return domStrings;
        } //makes the domStrings object public
    }
})();


var calculateTip = (function(gi) {
    
     var total = {
         bill: 0,
         tip: 0
    }; //initializes an object containing the bill amount and tip to be returned
    
    return {
        calcBillAndTip: function() {  
            var billAndPercentage = gi.readInput(); // 5) retrieves the input from the getInput function
            var iPerc = Number(billAndPercentage.percent);
            var iBill = Number(billAndPercentage.bill); //converts the returned string to a number
            total.tip = iBill * iPerc;       
            total.bill = total.tip + iBill;
            return total; // 6) returns the object with its properties calculated
        }
    };
       
})(getInput);


var tipButton = (function(gi, ct) {
    var dom = gi.getDomStrings(); //assigns the domSrings object from getInput to a local variable for usage
    
    var setupEventListeners = function() {        
        document.querySelector(dom.submitInfo).addEventListener('click', function() {
            calc();           
        }); // 3) When the submit button is clicked, it calls the calc function   
    };
    
    var calc = function() {
        var billTipTotal = ct.calcBillAndTip(); // 7) assignes the result from step 6 to a local variable
        document.querySelector(dom.tipAmount).value = billTipTotal.tip;
        document.querySelector(dom.totalAmount).value = billTipTotal.bill; // 8) sets the results fields to the tip and total bill
    }; 
    
    return {
        init: function() {
            setupEventListeners(); // 2) calls the setupEventListeners function
        }
    };
    
})(getInput, calculateTip);


tipButton.init(); // 1) initializes the entire app by calling the init function in tipButton


