var StandardCalc =  (function () {
  var plus = function(x,y){
    return parseFloat(x) + parseFloat(y);
  };

  var minus = function(x,y){
    return parseFloat(x) - parseFloat(y);
  };

  var multiply = function(x,y){
    return parseFloat(x)*parseFloat(y);
  };

  var divide = function(x,y){
    if(y!== 0){
      return parseFloat(x)/parseFloat(y);
    }
  };

  return{
    '+':plus,
    '-':minus,
    '*':multiply,
    '/':divide
  }
})();

var ScientificCalc = (function (Module) {
    Module['^'] = function (x , y) {
        return Math.pow(parseFloat(x),parseFloat(y));
    };

    Module['root'] = function (x , y) {
      if(x!==0){
        return Math.pow(parseFloat(y),1/parseFloat(x));
      }
    };

 return Module;

})(StandardCalc || {});

var ProgrammerCalc = (function (Module) {
    Module['%'] = function (x , y) {
        return parseFloat(x)%parseFloat(y);
    };

 return Module;

})(StandardCalc || {});




var Calculator = function(calcType){
    var CalculatorMAP = {
        'standard':StandardCalc,
        'scientific':ScientificCalc,
        'programmer':ProgrammerCalc
    };
    var selectedCalculator = CalculatorMAP[calcType] || StandardCalc;
    var selectboxElement;
    var resultSpan;

    var operand1;
    var operand2;

    var calcOptions;

    var clearInput = function(){
        operand1.value ="";
        operand2.value ="";
        resultSpan.innerHTML = "";
    };

    var removeOptions = function(){
        var i;
        for(i=selectboxElement.options.length-1;i>=4;i--)
        {
            selectboxElement.remove(i);
        }
    };

    var addOptions = function(calcType){
        if(calcType === 'scientific'){
            var opt = document.createElement("option");
            opt.value = '^';
            opt.text = '^';
            selectboxElement.add(opt);
            var opt = document.createElement("option");
            opt.value = 'root';
            opt.text = 'root';
            selectboxElement.add(opt);
        }
        else if(calcType ==='programmer'){
            var opt = document.createElement("option");
            opt.value = '%';
            opt.text = '%';
            selectboxElement.add(opt);
        }
    };



    var calculate = function(){
        if(operand1.value && operand2.value && selectboxElement.value){
            var result = selectedCalculator[selectboxElement.value](operand1.value,operand2.value);
            resultSpan.innerHTML = Math.round(result * 10000) / 10000;
        }
    };



    var init = function(){
        selectboxElement = document.getElementById("operatorSelect");
        resultSpan = document.getElementById("calcResult");

        operand1 = document.getElementById("firstOperand");
        operand2 = document.getElementById("secondOperand");

        calcOptions = document.getElementsByName("calcOption");
        for(calcOption in calcOptions) {
            calcOptions[calcOption].onclick = function() {
                selectedCalculator = CalculatorMAP[this.value];
                clearInput();
                removeOptions();
                addOptions(this.value);
            }
        }
        selectboxElement.addEventListener("change", calculate);
        operand1.addEventListener("input", calculate);
        operand2.addEventListener("input", calculate);
    };

    return {
        init:init
    }
};


var isNumberKey = function(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
};


window.onload = function() {
    var calculator = new Calculator();
    calculator.init();
};





