const xData = new Array();
const yData = new Array();

function submitX() {
    const xDataInput = strToNum(getValue(document.getElementById("xValueInput")));
    xData.push(xDataInput);
    document.getElementById("xValueInput").value = ""
    document.getElementById("xData").textContent = "["+xData+"]";
}

function deleteX() {
    xData.pop(xData);
    document.getElementById("xData").textContent = "["+xData+"]";
    if(xData.length == 0) {
        document.getElementById("xData").textContent = "";
    }
}

function submitY() {
    const yDataInput = strToNum(getValue(document.getElementById("yValueInput")));
    yData.push(yDataInput);
    document.getElementById("yValueInput").value = "";
    document.getElementById("yData").textContent = "["+yData+"]";
}

function deleteY() {
    yData.pop(yData);
    document.getElementById("yData").textContent = "["+yData+"]";
    if(yData.length == 0) {
        document.getElementById("yData").textContent = "";
    }
}


function calculate() {
    if(document.getElementById("RegressionChoose").value == "linear") {
        Regression.Linear(xData, yData);
    }

    else if(document.getElementById("RegressionChoose").value == "exponential") {
        Regression.Exponential(xData, yData);
    }

    else {
        alert("Error")
    }
}

function getValue(thing) {
    return thing.value;
}

function strToNum(str) {
    return Number(str)
}