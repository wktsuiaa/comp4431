(function(imageproc) {
    "use strict";

    imageproc.poster_diffusion = function(inputData, outputData, redBits=null, greenBits=null, blueBits=null){
        function makeBitMask(bits) {
            var mask = 0;
            for (var i = 0; i < bits; i++) {
                mask >>= 1;
                mask |= 128;
            }
            return mask;
        }
        
        function find_closest_palette_color(oldRGB) {
            let pixel = {}
            let redM=makeBitMask(redBits);
            let greenM=makeBitMask(greenBits);
            let blueM=makeBitMask(blueBits);
            pixel.r = oldRGB.r & redM;
            pixel.g = oldRGB.g & greenM;
            pixel.b = oldRGB.b & blueM;

            return pixel
        }

        // Copy inputData to OutputData
    	// for (let y = 0; y < inputData.height; y++) {
     //        for (let x = 0; x < inputData.width; x++) {
     //        	let rgb = imageproc.getPixel(inputData, x, y);
     //        	let i = ( (x) + (y * outputData.width)) * 4;
     //        	outputData.data[i] = rgb.r;
     //        	outputData.data[i+1] = rgb.g;
     //        	outputData.data[i+2] = rgb.b;
     //        }
     //    }

        var errorImage = imageproc.createBuffer(inputData);

    	for (let y = 0; y < inputData.height; y++) {
            for (let x = 0; x < inputData.width; x++) {
                let inputRGB = imageproc.getPixel(inputData, x, y);
                let errorRGB = imageproc.getPixel(errorImage, x, y);
                let oldRGB = {}
                oldRGB.r = inputRGB.r + errorRGB.r
                oldRGB.g = inputRGB.g + errorRGB.g
                oldRGB.b = inputRGB.b + errorRGB.b
                let newRGB = find_closest_palette_color(oldRGB)

                let i = ( x + y * outputData.width) * 4;
                outputData.data[i] = newRGB.r;
                outputData.data[i+1] = newRGB.g;
                outputData.data[i+2] = newRGB.b;

                let errorR = inputRGB.r - newRGB.r
                let errorG = inputRGB.g - newRGB.g
                let errorB = inputRGB.b - newRGB.b

                if( (x + 1) < inputData.width){
                	let i = ( (x+1) + (y * outputData.width)) * 4;
                	errorImage.data[i] = errorImage.data[i] + (errorR*7)/16;
                	errorImage.data[i+1] = errorImage.data[i+1] + (errorG*7)/16;
                	errorImage.data[i+2] = errorImage.data[i+2] + (errorB*7)/16;
                }

                if( x-1 > 0 && y+1 < inputData.height){
                	let i = ((x-1) + ((y+1) * outputData.width)) * 4;
                	outputData.data[i] = errorImage.data[i] + (errorR*3)/16;
                	outputData.data[i+1] = errorImage.data[i] + (errorR*3)/16;
                	outputData.data[i+2] = errorImage.data[i] + (errorR*3)/16;
                }

                if( y+1 < inputData.height){
                	let i = (x + ((y+1) * outputData.width)) * 4;
                	outputData.data[i] = errorImage.data[i] + (errorR*5)/16;
                	outputData.data[i+1] = errorImage.data[i] + (errorR*5)/16;
                	outputData.data[i+2] = errorImage.data[i] + (errorR*5)/16;
                }

                if( x+1 < inputData.width && y+1 < inputData.height){
                	let i = (x+1 + ((y+1) * outputData.width)) * 4;
                	outputData.data[i] = errorImage.data[i] + (errorR*1)/16;
                	outputData.data[i+1] = errorImage.data[i] + (errorR*1)/16;
                	outputData.data[i+2] = errorImage.data[i] + (errorR*1)/16;
                }
			}
    	}
    }
}(window.imageproc = window.imageproc || {}));
