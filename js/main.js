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
    plus:plus,
    minus:minus,
    multiply:multiply,
    divide:divide
  }
})();

var ScientificCalc = (function (Module) {
    Module.power = function (x , y) {
        return Math.pow(parseFloat(x),parseFloat(y));
    };

    Module.root = function (x , y) {
      if(x!==0){
        return Math.pow(parseFloat(y),1/parseFloat(x));
      }
    };

 return Module;

})(StandardCalc || {});

var ProgrammerCalc = (function (Module) {
    Module.mod = function (x , y) {
        return parseFloat(x)%parseFloat(y);
    };

 return Module;

})(StandardCalc || {});


var CalculatorMAP = {
      'standard':StandardCalc,
      'scientific':ScientificCalc,
      'programmer':ProgrammerCalc
};
var OperatorTextMap = {
      '+':'plus',
      '-':'minus',
      '/': 'divide',
      '*':'multiply',
      '^':'power',
      'root':'root',
      '%':'mod'
}

var selectedCalculator = StandardCalc;
var selectboxElement = document.getElementById("operatorSelect");
var resultSpan = document.getElementById("calcResult");
var calcOptions = document.getElementsByName("calcOption");
var operand1 = document.getElementById("firstOperand");
var operand2 = document.getElementById("secondOperand");
for(calcOption in calcOptions) {
    calcOptions[calcOption].onclick = function() {
        selectedCalculator = CalculatorMAP[this.value];
        clearInput();
        removeOptions();
        addOptions(this.value);
    }
}




function calculate(){
  if(operand1.value && operand2.value && selectboxElement.value){
      var result = selectedCalculator[selectboxElement.value](operand1.value,operand2.value);
      resultSpan.innerHTML = Math.round(result * 10000) / 10000;
  }
}


function clearInput(){
  operand1.value ="";
  operand2.value ="";
  resultSpan.innerHTML = "";
};

function removeOptions()
{
    var i;
    for(i=selectboxElement.options.length-1;i>=4;i--)
    {
        selectboxElement.remove(i);
    }
}


function addOptions(calcType){
  if(calcType === 'scientific'){
      var opt = document.createElement("option");
      opt.value = 'power';
      opt.text = '^';
      selectboxElement.add(opt);
      var opt = document.createElement("option");
      opt.value = 'root';
      opt.text = 'root';
      selectboxElement.add(opt);
  }
  else if(calcType ==='programmer'){
      var opt = document.createElement("option");
      opt.value = 'mod';
      opt.text = '%';
      selectboxElement.add(opt);
  }
}



function isNumberKey(evt){
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
             return false;

          return true;
}

selectboxElement.addEventListener("change", calculate);
operand1.addEventListener("input", calculate);
operand2.addEventListener("input", calculate);
