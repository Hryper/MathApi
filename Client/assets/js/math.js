function solveThis(res, xarg) {
	console.log(xarg, res)
	return {"eq": `${xarg} + x = ${res}`, "res": res-xarg}
}

function genRandomEquations(n) {
	const equations = [];
	const arg1 = []; //Defining res
	const arg2 = []; //Defining arg
	for(let i = 0; i < n; i++) {
		arg1[i] = Math.floor(Math.random()*20)+6;
		arg2[i] = Math.floor(Math.random()*10)+1;
		equations[i] = solveThis(arg1[i], arg2[i]);
	}
	return equations
}

let count = 0;
let corrects = 0;
let trials = [];

$( ".checkfield" ).hide()

let once = () => {
	$( ".checkfield" ).show();
	$( "#rangeSlider" ).hide();
	$( "#amount" ).hide();
	trials = genRandomEquations(range.value);
	$( "#checkbtn" )[0].innerHTML = "Check"
	$( "#textSolve" )[0].innerText = trials[count].eq;
	once = () => {
		console.log((trials[count].res + "&" + $( "#chkfld" )[0].value))
		corrects += +(trials[count].res == $( "#chkfld" )[0].value);
		$( "#chkfld" )[0].value = "";
		count++;
		$( "#textSolve" )[0].innerText = trials[count].eq;
		console.log(count);
	}
}

function checkAns() {
	once();
}

let range = $( "#rangeSlider" )[0],
    rangetxt = $( "#amount" )[0];

rangetxt.innerHTML = `Mængde af regnestykker: ${range.value}`;

// use 'change' instead to see the difference in response
range.addEventListener('input', function () {
  rangetxt.innerHTML = `Mængde af regnestykker: ${range.value}`;
}, false);

