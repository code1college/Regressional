class Regression {
    static Linear(x, y) {
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumX2 = 0;
        let sumY2 = 0;
        let yActualArrayL = new Array();
        let yPredictedArrayL = new Array();
        let residualsLinear = new Array();
          
        for(let i = 0; i < x.length; i++) {
            sumX += x[i];
        }

        for(let i = 0; i < y.length; i++) {
            sumY += y[i];
        }

        for(let i = 0; i < x.length; i++) {
            sumXY += x[i] * y[i];
        }

        for(let i = 0; i < x.length; i++) {
            sumX2 += x[i] * x[i];
        }
          
        for(let i = 0; i < y.length; i++) {
            sumY2 += y[i] * y[i]
        }
        
        const slope = ([(x.length*sumXY) -(sumX*sumY)] / [(x.length*sumX2) - (sumX * sumX)])//.toFixed(3);
        const yInt = ([(sumY - slope*sumX)] / [(x.length)])//.toFixed(3);
        const rVal = ([(x.length*sumXY) -(sumX*sumY)] / Math.sqrt([(x.length*sumX2) - (sumX * sumX)] * [y.length*sumY2 - (sumY * sumY)])).toFixed(3);
        document.getElementById("equation").textContent = ("y = "+slope+"x + "+yInt);
        document.getElementById("rValue").textContent = ("R: "+rVal);
        document.getElementById("rValue2").textContent = ("R^2: "+(rVal**2).toFixed(3));

        for(let i = 0; i < y.length; i++) {
            let yActualL = y[i]
            yActualArrayL.push(yActualL);
        }

        //console.log(yActualArrayL)
        //console.log(slope, yInt)

        for(let i = 0; i < x.length; i++) {
            let yPredictedL = (slope * x[i]) + yInt
            yPredictedArrayL.push(yPredictedL)
        }

        //console.log(yPredictedArrayL)

        for(let i = 0; i < x.length; i++) {
            let residualTempL = yActualArrayL[i] - yPredictedArrayL[i]
            residualsLinear.push(x[i]+", "+residualTempL);
        }

        document.getElementById("residuals").textContent = "Residuals: ["+residualsLinear+"]";
    }

    static Exponential(x1, y1) {
        let sumEX = 0;
        let sumEY = 0;
        let sumEsmallxY = 0;
        let sumSmallXY = 0;
        let sumlogY = 0;
        let sumEX2 = 0;
        let sumEY2 = 0;
        let sumlogY2 = 0;
        let yActualArrayE = new Array();
        let yPredictedArrayE = new Array();
        let residualsExponential = new Array();

        let sumlogYList = new Array();

        for(let i = 0; i < x1.length; i++) {
            sumEX += x1[i];
        }

        for(let i = 0; i < y1.length; i++) {
            sumEY += y1[i];
        }

        for(let i = 0; i < y1.length; i++) {
            sumlogYList.push(Math.log10(y1[i]));
        }

        for(let i = 0; i < sumlogYList.length; i++) {
            sumlogY += sumlogYList[i];
        }

        for(let i = 0; i < x1.length; i++) {
            sumEsmallxY += x1[i] * sumlogYList[i];
        }

        for(let i = 0; i < x1.length; i++) {
            sumSmallXY += x1[i] * y1[i];
        }

        for(let i = 0; i < x1.length; i++) {
            sumEX2 += x1[i] * x1[i];
        }

        for(let i = 0; i < y1.length; i++) {
            sumEY2 += y1[i] * y1[i];
        }

        for(let i = 0; i < sumlogYList.length; i++) {
            sumlogY2 += sumlogYList[i] * sumlogYList[i];
        }

        const systemEX1 = x1.length;
        const systemEY1 = sumEX;

        const systemEX2 = sumEX;
        const systemEY2 = sumEX2;

        const eY1 = sumlogY;
        const eY2 = sumEsmallxY;

        const NewsystemEY1 = systemEY1 * systemEX2;
        const NewsystemEY2 = systemEY2 * systemEX1; 

        const NeweY1 = eY1 * systemEX2;

        const NeweY2 = eY2 * systemEX1;

        const newYVal = (NeweY1 - NeweY2) / (NewsystemEY1 - NewsystemEY2)

        const newYS = sumEX * newYVal
        const newYEnd = sumlogY - newYS;

        const newXVal = newYEnd / x1.length;

        const finalA = Math.pow(10, newXVal);
        const finalB = Math.pow(10, newYVal);

        const rValE = ([(x1.length*sumEsmallxY) -(sumEX*sumlogY)] / Math.sqrt([(x1.length*sumEX2) - (sumEX * sumEX)] * [y1.length*sumlogY2 - (sumlogY * sumlogY)])).toFixed(3);

        document.getElementById("rValue").textContent = "R: "+rValE;
        console.log(rValE);
        document.getElementById("rValue2").textContent = "R^2: "+(rValE**2).toFixed(3)


        document.getElementById("equation").textContent = "y = "+finalA.toFixed(3)+"("+finalB.toFixed(3)+")^x";

        for(let i = 0; i < x1.length; i++) {
            let yActualE = y1[i]
            yActualArrayE.push(yActualE);
        }

        for(let i = 0; i < y1.length; i++) {
            let yPredictedE = finalA * (finalB ** x1[i])
            yPredictedArrayE.push(yPredictedE)
        }

        for(let i = 0; i < y1.length; i++) {
            let residualTempE = yActualArrayE[i] - yPredictedArrayE[i]
            residualsExponential.push("("+x1[i]+", "+residualTempE+")");
        }



        document.getElementById("residuals").textContent = "Residuals: ["+residualsExponential+"]";

    }
}