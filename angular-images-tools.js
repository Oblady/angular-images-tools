angular.module('angular-images-tools', []).service('imageTools', [function() {
    "use strict";

    return {

        /**
         *
         * @param DOMImage image
         * @param float angle in radian ie: 90° => Math.PI/2
         * @param callback cb(DOMImage);
         */
        rotate: function(img, angle cb) {

            var resultImg = new Image();

            img.onload = function() {

                x = img.width;
                y = img.height;

                var canvas = document.createElement('canvas');
                canvas.width = y;
                canvas.height = x;

                var ctx = canvas.getContext('2d');

                ctx.save();
                    ctx.translate(canvas.width/2, canvas.height/2);
                    ctx.rotate(angle);
                    ctx.drawImage(img, -x/2, -y/2 ,x, y);
                ctx.restore();

                resultImg.src = canvas.toDataURL();

                cb(resultImg);
            };
        }


    };


}]);
