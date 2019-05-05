(function(imageproc) {
    "use strict";

    /*
     * Apply sobel edge to the input data
     */
    imageproc.sobelEdge = function(inputData, outputData, threshold) {
        /* Initialize the two edge kernel Gx and Gy */
        var Gx = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        var Gy = [
            [-1,-2,-1],
            [ 0, 0, 0],
            [ 1, 2, 1]
        ];

        /**
         * TODO: You need to write the code to apply
         * the two edge kernels appropriately
         */
        
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var xR,xG,xB;
                var yR,yG,yB;


                xR=imageproc.getPixel(inputData, x-1, y-1).r*Gx[0][0]+imageproc.getPixel(inputData, x+1, y-1).r*Gx[0][2]+
                    imageproc.getPixel(inputData, x-1, y).r*Gx[1][0]+imageproc.getPixel(inputData, x+1, y).r*Gx[1][2]+
                    imageproc.getPixel(inputData, x-1, y+1).r*Gx[2][0]+imageproc.getPixel(inputData, x+1, y+1).r*Gx[2][2];
                xG=imageproc.getPixel(inputData, x-1, y-1).g*Gx[0][0]+imageproc.getPixel(inputData, x+1, y-1).g*Gx[0][2]+
                    imageproc.getPixel(inputData, x-1, y).g*Gx[1][0]+imageproc.getPixel(inputData, x+1, y).g*Gx[1][2]+
                    imageproc.getPixel(inputData, x-1, y+1).g*Gx[2][0]+imageproc.getPixel(inputData, x+1, y+1).g*Gx[2][2];
                xB=imageproc.getPixel(inputData, x-1, y-1).b*Gx[0][0]+imageproc.getPixel(inputData, x+1, y-1).b*Gx[0][2]+
                    imageproc.getPixel(inputData, x-1, y).b*Gx[1][0]+imageproc.getPixel(inputData, x+1, y).b*Gx[1][2]+
                    imageproc.getPixel(inputData, x-1, y+1).b*Gx[2][0]+imageproc.getPixel(inputData, x+1, y+1).b*Gx[2][2];


                yR=imageproc.getPixel(inputData, x-1, y-1).r*Gy[0][0]+imageproc.getPixel(inputData, x+1, y+1).r*Gy[2][0]+
                    imageproc.getPixel(inputData, x, y-1).r*Gy[0][1]+imageproc.getPixel(inputData, x, y+1).r*Gy[2][1]+
                    imageproc.getPixel(inputData, x+1, y-1).r*Gy[0][2]+imageproc.getPixel(inputData, x-1, y+1).r*Gy[2][2];
                yG=imageproc.getPixel(inputData, x-1, y-1).g*Gy[0][0]+imageproc.getPixel(inputData, x+1, y+1).g*Gy[2][0]+
                    imageproc.getPixel(inputData, x, y-1).g*Gy[0][1]+imageproc.getPixel(inputData, x, y+1).g*Gy[2][1]+
                    imageproc.getPixel(inputData, x+1, y-1).g*Gy[0][2]+imageproc.getPixel(inputData, x-1, y+1).g*Gy[2][2];
                yB=imageproc.getPixel(inputData, x-1, y-1).b*Gy[0][0]+imageproc.getPixel(inputData, x+1, y+1).b*Gy[2][0]+
                    imageproc.getPixel(inputData, x, y-1).b*Gy[0][1]+imageproc.getPixel(inputData, x, y+1).b*Gy[2][1]+
                    imageproc.getPixel(inputData, x+1, y-1).b*Gy[0][2]+imageproc.getPixel(inputData, x-1, y+1).b*Gy[2][2];


                var i = (x + y * outputData.width) * 4;

                if ($("#sobel-flip").prop("checked")){
                    outputData.data[i]     = (parseInt(Math.hypot(xR,yR)) > threshold)? 0:255;
                    outputData.data[i + 1] = (parseInt(Math.hypot(xG,yG)) > threshold)? 0:255;
                    outputData.data[i + 2] = (parseInt(Math.hypot(xB,yB)) > threshold)? 0:255;
                }else
                {   outputData.data[i]     = (parseInt(Math.hypot(xR,yR)) > threshold)? 255:0;
                    outputData.data[i + 1] = (parseInt(Math.hypot(xG,yG)) > threshold)? 255:0;
                    outputData.data[i + 2] = (parseInt(Math.hypot(xB,yB)) > threshold)? 255:0;
                            }
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
