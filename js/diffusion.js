(function(imageproc) {
    "use strict";

var palette = [
        [254, 251, 198],
        [255, 247, 149],
        [255, 240,   1],
        [189, 223, 198],
        [120, 201, 195],
        [  0, 166, 192],
        [190, 219, 152],
        [128, 197, 152],
        [  0, 163, 154],
        [251, 194, 174],
        [244, 148, 150],
        [234,  31, 112],
        [253, 193, 133],
        [246, 146, 120],
        [235,  38,  91],
        [184, 229, 250],
        [109, 207, 246],
        [  0, 173, 239],
        [249, 200, 221],
        [244, 149, 189],
        [233,   3, 137],
        [183, 179, 216],
        [122, 162, 213],
        [  0, 140, 209],
        [184, 137, 189],
        [132, 127, 185],
        [  0, 111, 182],
        [183,  42, 138],
        [143,  50, 141],
        [ 56,  58, 141],
        [187, 176, 174],
        [132, 160, 172],
        [  0, 137, 169],
        [188, 135, 151],
        [139, 126, 152],
        [  1, 110, 151],
        [198, 216,  54],
        [138, 192,  68],
        [  0, 160,  84],
        [190, 175, 136],
        [135, 159, 137],
        [  0, 137, 139],
        [189, 136, 120],
        [140, 126, 123],
        [  0, 110, 125],
        [255, 189,  33],
        [247, 145,  44],
        [236,  42,  50],
        [186,  45, 114],
        [144,  52, 115],
        [ 59,  59, 121],
        [194, 171,  57],
        [142, 156,  68],
        [  0, 135,  79],
        [189,  50,  55],
        [147,  56,  62],
        [ 61,  60,  65],
        [188,  48,  93],
        [145,  54,  97],
        [ 61,  60, 102],
        [191, 134,  57],
        [145, 125,  66],
        [  0, 108,  72],
        [  0,   0,   0],
        [255, 255, 255],
    ];







imageproc.diffusion = function(inputData, outputData){


	function checkValid(val, newVal){
		let temp = val+newVal;
		if(temp<0) return 0;
		if (temp>255) return 255;
		return parseInt(temp);
	}

	for (var y = 0; y < inputData.height; y++) {
        for (var x = 0; x < inputData.width; x++) {
        	var rgb = imageproc.getPixel(inputData, x, y);
        	let i = ( (x) + (y * outputData.width)) * 4;

        	outputData.data[i] = rgb.r;
        	outputData.data[i+1] = rgb.g;
        	outputData.data[i+2] = rgb.b;

        }
    }


	for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {

            var rgb = imageproc.getPixel(inputData, x, y);

           	var index,min=Infinity,temp,errorR,errorG,errorB;
            for(let  i=0; i<palette.length;i++){
                temp=parseInt(Math.hypot(rgb.r-palette[i][0],rgb.g-palette[i][1],rgb.b-palette[i][2]));
                if (temp<min){
                    index=i;
                    min=temp;}
            }

            errorR = rgb.r - palette[index][0];
            errorG = rgb.g-palette[index][1];
            errorB = rgb.b-palette[index][2];



            if( x +1 <inputData.width){
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
