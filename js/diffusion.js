(function(imageproc) {
    "use strict";

    imageproc.diffusion = function(inputData, outputData){
        function find_closest_palette_color(oldRGB) {
            let quant_number = $("#quant-number").val()-1   
            let pixel = {}
            pixel.r = parseInt(Math.round(quant_number*oldRGB.r/255) * (255/quant_number))
            pixel.g = parseInt(Math.round(quant_number*oldRGB.g/255) * (255/quant_number))
            pixel.b = parseInt(Math.round(quant_number*oldRGB.b/255) * (255/quant_number))

            return pixel
        }

        // Do value clipping
    	function checkValid(val, newVal){
    		let temp = val + newVal;
    		if (temp < 0) return 0;
    		if (temp > 255) return 255;
    		return parseInt(temp);
    	}

        // Turn it to grayscale if the user request
        if($("#error-diffu-grayscale").prop("checked")) imageproc.grayscale(inputData, inputData);

        // Copy inputData to OutputData
    	for (let y = 0; y < inputData.height; y++) {
            for (let x = 0; x < inputData.width; x++) {
            	let rgb = imageproc.getPixel(inputData, x, y);
            	let i = ( (x) + (y * outputData.width)) * 4;
            	outputData.data[i] = rgb.r;
            	outputData.data[i+1] = rgb.g;
            	outputData.data[i+2] = rgb.b;
            }
        }

    	for (let y = 0; y < inputData.height; y++) {
            for (let x = 0; x < inputData.width; x++) {
                let oldRGB = imageproc.getPixel(outputData, x, y);
                let newRGB = find_closest_palette_color(oldRGB)

                let i = ( x + y * outputData.width) * 4;
                outputData.data[i] = newRGB.r;
                outputData.data[i+1] = newRGB.g;
                outputData.data[i+2] = newRGB.b;

                let errorR = oldRGB.r - newRGB.r
                let errorG = oldRGB.g - newRGB.g
                let errorB = oldRGB.b - newRGB.b

                if( (x + 1) < inputData.width){
                	let i = ( (x+1) + (y * outputData.width)) * 4;
                	outputData.data[i] = checkValid(outputData.data[i],(errorR*7)/16);
                	outputData.data[i+1] = checkValid(outputData.data[i+1],(errorG*7)/16);
                	outputData.data[i+2] = checkValid(outputData.data[i+2],(errorB*7)/16);
                }

                if( x-1 > 0 && y+1 < inputData.height){
                	let i = ((x-1) + ((y+1) * outputData.width)) * 4;
                	outputData.data[i] = checkValid(outputData.data[i],(errorR*3)/16);
                	outputData.data[i+1] = checkValid(outputData.data[i+1],(errorG*3)/16);
                	outputData.data[i+2] = checkValid(outputData.data[i+2],(errorB*3)/16);
                }

                if( y+1 < inputData.height){
                	let i = (x + ((y+1) * outputData.width)) * 4;
                	outputData.data[i] = checkValid(outputData.data[i],(errorR*5)/16);
                	outputData.data[i+1] = checkValid(outputData.data[i+1],(errorG*5)/16);
                	outputData.data[i+2] = checkValid(outputData.data[i+2],(errorB*5)/16);
                }

                if( x+1 < inputData.width && y+1 < inputData.height){
                	let i = (x+1 + ((y+1) * outputData.width)) * 4;
                	outputData.data[i] = checkValid(outputData.data[i],errorR/16);
                	outputData.data[i+1] = checkValid(outputData.data[i+1],errorG/16);
                	outputData.data[i+2] = checkValid(outputData.data[i+2],errorB/16);
                }
			}
    	}
    }
}(window.imageproc = window.imageproc || {}));
