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

let strParseRes;

let once = () => {
	$( ".checkfield" ).show();
	$( "#rangeSlider" ).hide();
	$( "#amount" ).hide();
	trials = genRandomEquations(range.value);
	$( "#checkbtn" )[0].innerHTML = `Check`;
	$( "#rsltld" ).hide();
	$( "#textSolve" )[0].innerText = trials[count].eq;
	once = () => {
		corrects += +(trials[count].res == $( "#chkfld" )[0].value);
		trials[count].c = +(trials[count].res == $( "#chkfld" )[0].value);
		$( "#chkfld" )[0].value = "";
		count++;
		try {
			$( "#textSolve" )[0].innerText = trials[count].eq;
		}
		catch {
			$( "#textSolve" )[0].innerText = `Korrekte svar: (${corrects} / ${range.value}, godt gået!!`;
			$( "#checkbtn" )[0].innerHTML = `Del Resultat`;
			$( ".checkfield" ).hide();
			strParseRes = parseLink(trials);
			once = () => {
				$( "#textSolve" )[0].innerText = "Din skore er blevet kopieret til udklipsholderen.";
				navigator.clipboard.writeText(strParseRes);
				$( "#chkfld" )[0].value = strParseRes;
				$( "#rsltld" ).show();
			};
		};
		$( "#crctcnt" )[0].innerHTML = `Korrekte svar: (${corrects} / ${range.value})`;
		console.log(count);
	}
}

function checkAns() {
	once();
}

let checkRslt = () => {
	$( ".checkfield" ).show();
	$( "#rangeSlider" ).hide();
	$( "#amount" ).hide();
	$( "#checkbtn" ).hide();
	$( '.checkfield')[1].innerHTML = "Indsæt resultats kode";
	once = () => checkRslt();
	checkRslt = () => {
		try {
			let color = ["danger", "success"]
			let decoded = decodeLink($( "#chkfld" )[0].value);
			for(const [key, value] of Object.entries(decoded)) {
				$( ".rsltbtns" ).append(`<a class="w-100 btn btn-lg btn-outline-${color[value[0]]} mt-2" onclick="return false;">${value[1]}, x = ${value[1].replace(" + x =", "").split(" ")[1]-value[1].replace(" + x =", "").split(" ")[0]}</a>`)
				console.log(value[1].replace(" + x =", "").split(" "))
			}
			checkRslt = () => {return false;}
			// console.log(decoded)
		}
		catch {

		}
	}
}

let range = $( "#rangeSlider" )[0],
    rangetxt = $( "#amount" )[0];

rangetxt.innerHTML = `Mængde af regnestykker: ${range.value}`;

// use 'change' instead to see the difference in response
range.addEventListener('input', function () {
  rangetxt.innerHTML = `Mængde af regnestykker: ${range.value}`;
}, false);

let parseRes = [];

function parseLink(x) {
	for(const [key, value] of Object.entries(x)) {
		parseRes[key] = `${value.c}:${value.eq.replace(' + ', '%').replace(' = ', '')}`
	}
	return JSON.stringify(parseRes);
};

function decodeLink(x) {
	x = JSON.parse(x);
	let group = [];
	for(const [key, value] of Object.entries(x)) {
		let pair = `${value.replace('%', ' + ').replace('x', 'x = ')}`;
		pair = pair.split(':');
		group[key] = pair;
	}
	return group;
}