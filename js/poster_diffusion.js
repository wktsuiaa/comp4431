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
        // function checkValid(val, newVal){
        //     let temp = val + newVal;
        //     if (temp < 0) return 0;
        //     if (temp > 255) return 255;
        //     return parseInt(temp);
        // }
        function find_closest_palette_color(RGB) {
            let pixel = {}
            let redM=makeBitMask(redBits);
            let greenM=makeBitMask(greenBits);
            let blueM=makeBitMask(blueBits);
            
            pixel.r = RGB.r & redM;
            pixel.g = RGB.g & greenM;
            pixel.b = RGB.b & blueM;

            // let quant_number = $("#quant-number").val()-1   
            // let pixel = {}
            // pixel.r = parseInt(Math.round(quant_number*oldRGB.r/255) * (255/quant_number))
            // pixel.g = parseInt(Math.round(quant_number*oldRGB.g/255) * (255/quant_number))
            // pixel.b = parseInt(Math.round(quant_number*oldRGB.b/255) * (255/quant_number))

            return pixel
        }

        let errorImage = imageproc.createBuffer(inputData);

    	for (let y = 0; y < inputData.height; y++) {
            for (let x = 0; x < inputData.width; x++) {
                let inputRGB = imageproc.getPixel(inputData, x, y);
                let errorRGB = imageproc.getPixel(errorImage, x, y);
                let oldRGB = {}
                oldRGB.r = parseInt(inputRGB.r + errorRGB.r)
                oldRGB.g = parseInt(inputRGB.g + errorRGB.g)
                oldRGB.b = parseInt(inputRGB.b + errorRGB.b)
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
                	errorImage.data[ i ] = errorImage.data[i] + (errorR*7)/16;
                	errorImage.data[i+1] = errorImage.data[i+1] + (errorG*7)/16;
                	errorImage.data[i+2] = errorImage.data[i+2] + (errorB*7)/16;
                }

                if( x-1 > 0 && y+1 < inputData.height){
                	let i = ((x-1) + ((y+1) * outputData.width)) * 4;
                	errorImage.data[ i ] = errorImage.data[i] + (errorR*3)/16;
                	errorImage.data[i+1] = errorImage.data[i+1] + (errorG*3)/16;
                	errorImage.data[i+2] = errorImage.data[i+2] + (errorB*3)/16;
                }

                if( y+1 < inputData.height){
                	let i = (x + ((y+1) * outputData.width)) * 4;
                	errorImage.data[ i ] = errorImage.data[i] + (errorR*5)/16;
                	errorImage.data[i+1] = errorImage.data[i+1] + (errorG*5)/16;
                	errorImage.data[i+2] = errorImage.data[i+2] + (errorB*5)/16;
                }

                if( x+1 < inputData.width && y+1 < inputData.height){
                	let i = (x+1 + ((y+1) * outputData.width)) * 4;
                	errorImage.data[ i ] = errorImage.data[i] + (errorR*1)/16;
                	errorImage.data[i+1] = errorImage.data[i+1] + (errorG*1)/16;
                	errorImage.data[i+2] = errorImage.data[i+2] + (errorB*1)/16;
                }
                // debugger;
			}
            // if(y == inputData.height-1) debugger;
    	}

        // console.log(errorImage-outputData)
        // outputData = errorImage
        // for (let y = 0; y < errorImage.height; y++) {
        //     for (let x = 0; x < errorImage.width; x++) {
        //         let rgb = imageproc.getPixel(errorImage, x, y);
        //         let i = ( (x) + (y * outputData.width)) * 4;
        //         outputData.data[i] = rgb.r;
        //         outputData.data[i+1] = rgb.g;
        //         outputData.data[i+2] = rgb.b;
        //     }
        // }
    }
}(window.imageproc = window.imageproc || {}));


// (function(imageproc) {
//     "use strict";

//     imageproc.poster_diffusion = function(inputData, outputData, redBits=null, greenBits=null, blueBits=null){
//         function makeBitMask(bits) {
//             var mask = 0;
//             for (var i = 0; i < bits; i++) {
//                 mask >>= 1;
//                 mask |= 128;
//             }
//             return mask;
//         }

//         function find_closest_palette_color(RGB) {
//             let pixel = {}
//             let redM=makeBitMask(redBits);
//             let greenM=makeBitMask(greenBits);
//             let blueM=makeBitMask(blueBits);
//             // debugger
//             pixel.r = RGB.r & redM;
//             pixel.g = RGB.g & greenM;
//             pixel.b = RGB.b & blueM;

//             // let quant_number = $("#quant-number").val()-1
//             // let pixel = {}
//             // pixel.r = parseInt(Math.round(quant_number*RGB.r/255) * (255/quant_number))
//             // pixel.g = parseInt(Math.round(quant_number*RGB.g/255) * (255/quant_number))
//             // pixel.b = parseInt(Math.round(quant_number*RGB.b/255) * (255/quant_number))

//             return pixel
//         }

//         // Copy inputData to OutputData
//         for (let y = 0; y < inputData.height; y++) {
//             for (let x = 0; x < inputData.width; x++) {
//                 let rgb = imageproc.getPixel(inputData, x, y);
//                 let i = ( (x) + (y * outputData.width)) * 4;
//                 outputData.data[i] = rgb.r;
//                 outputData.data[i+1] = rgb.g;
//                 outputData.data[i+2] = rgb.b;
//             }
//         }

//         for (let y = 0; y < inputData.height; y++) {
//             for (let x = 0; x < inputData.width; x++) {
//                 let oldRGB = imageproc.getPixel(outputData, x, y);
//                 let inputRGB = imageproc.getPixel(inputData, x, y);
//                 let newRGB = find_closest_palette_color(oldRGB)

//                 let i = ( x + y * outputData.width) * 4;
//                 outputData.data[i] = newRGB.r;
//                 outputData.data[i+1] = newRGB.g;
//                 outputData.data[i+2] = newRGB.b;

//                 let errorR = inputRGB.r - newRGB.r
//                 let errorG = inputRGB.g - newRGB.g
//                 let errorB = inputRGB.b - newRGB.b

//                 if( (x + 1) < inputData.width){
//                     let i = ( (x+1) + (y * outputData.width)) * 4;
//                     outputData.data[i] = outputData.data[i]+(errorR*7)/16;
//                     outputData.data[i+1] = outputData.data[i+1]+(errorG*7)/16;
//                     outputData.data[i+2] = outputData.data[i+2]+(errorB*7)/16
//                 }

//                 if( x-1 > 0 && y+1 < inputData.height){
//                     let i = ((x-1) + ((y+1) * outputData.width)) * 4;
//                     outputData.data[i] = outputData.data[i]+(errorR*3)/16
//                     outputData.data[i+1] = outputData.data[i+1]+(errorG*3)/16
//                     outputData.data[i+2] = outputData.data[i+2]+(errorB*3)/16
//                 }

//                 if( y+1 < inputData.height){
//                     let i = (x + ((y+1) * outputData.width)) * 4;
//                     outputData.data[i] = outputData.data[i]+(errorR*5)/16
//                     outputData.data[i+1] = outputData.data[i+1]+(errorG*5)/16
//                     outputData.data[i+2] = outputData.data[i+2]+(errorB*5)/16
//                 }

//                 if( x+1 < inputData.width && y+1 < inputData.height){
//                     let i = (x+1 + ((y+1) * outputData.width)) * 4;
//                     outputData.data[i] = outputData.data[i]+errorR/16
//                     outputData.data[i+1] = outputData.data[i+1]+errorG/16
//                     outputData.data[i+2] = outputData.data[i+2]+errorB/16
//                 }
//             }
//         }
//     }
// }(window.imageproc = window.imageproc || {}));
