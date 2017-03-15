var bar;
var filler;
var progressText;
var title;

var max_progress;
var progress = 0;

function generateBar() {
	document.body.style.backgroundColor = document.getElementById("bk-color").value;
	title = document.createElement("h2");
	title.innerHTML = document.getElementById("title").value;
	title.style.color = document.getElementById("bar-fg-color").value;
	bar = document.createElement("div");
	bar.style.height = (document.getElementById("height").value + "px");
	bar.style.width = ("100%");
	bar.style.border = (document.getElementById("borderSelect").options[document.getElementById("borderSelect").selectedIndex].text);
	bar.style.borderColor = document.getElementById("bar-border-color").value;
	bar.style.backgroundColor = document.getElementById("bar-bg-color").value;
	filler = document.createElement("div");
	filler.style.backgroundColor = document.getElementById("bar-fg-color").value;
	filler.style.height = (document.getElementById("height").value + "px");
	filler.style.width = "0px";
	bar.appendChild(filler);
	progressText = document.createElement("p");
	if (parseInt(document.getElementById("styleSelect").value) == 0) {
		max_progress = 100;
		progressText.innerHTML = (progress + "%");
	} else {
		max_progress = parseInt(document.getElementById("max-value").value);
		progressText.innerHTML = progress.toString() + document.getElementById("separator").value + max_progress.toString();
	}
	progressText.style.color = document.getElementById("bar-fg-color").value;
	document.getElementById("barContainer").appendChild(title);
	document.getElementById("barContainer").appendChild(bar);
	document.getElementById("barContainer").appendChild(progressText);
	document.getElementById("barContainer").style.textAlign = "center";

	document.getElementById("barContainer").style.width = (document.getElementById("width").value + "%");
}

function runBar() {
	var step = max_progress / parseInt(document.getElementById("speed").value);
	var interval = 1000 / step;
	var id = setInterval(function () {
		if (progress < max_progress) {
			progress++;
			if (parseInt(document.getElementById("styleSelect").value) == 0) {
				progressText.innerHTML = (progress + "%");
			} else {
				progressText.innerHTML = progress.toString() + document.getElementById("separator").value + max_progress.toString();
			}
			filler.style.width = (progress / max_progress * 100) + "%";
		} else {
			onBarFinish();
			clearInterval(id);
		}
	}, interval);
}

function onBarFinish() {
	document.getElementById("finishMenu").style.display = "block";
	title.innerHTML = title.innerHTML = document.getElementById("fin-title").value;
}

window.onload = function () {

	document.getElementById("borderSelect").onchange = function () {
		if (document.getElementById("borderSelect").options[document.getElementById("borderSelect").selectedIndex].text == "none") {
			document.getElementById("borderColor").style.display = "none";
		} else {
			document.getElementById("borderColor").style.display = "table-row";
		}
	};

	document.getElementById("styleSelect").onchange = function () {
		if (parseInt(document.getElementById("styleSelect").value) == 1) {
			document.getElementById("maxValue").style.display = "table-row";
			document.getElementById("sep").style.display = "table-row";
		} else {
			document.getElementById("maxValue").style.display = "none";
			document.getElementById("sep").style.display = "none";
		}
	};

	document.getElementById("refresh-btn").addEventListener('click', function () {
		location.reload();
	}, false);

	document.getElementById("get-code-button").addEventListener('click', function () {
		document.getElementById("code-text-area").innerHTML = document.getElementById("barContainer").innerHTML.toString();
		document.getElementById("codeArea").style.display = "block";
	}, false);

	document.getElementById("SetButton").addEventListener('click', function () {
		document.getElementById("settings").style.display = "none";
		generateBar();
		runBar();
	}, false);

};