angular.module('angular-images-tools', []).service('imageTools', ['$q', function($q) {
    "use strict";

    return {

        /**
         *
         * @param DOMImage image
         * @param float angle in radian ie: 90° => Math.PI/2
         * @param callback cb(DOMImage);
         */
        rotate: function(img, angle) {

            var def = $q.defer();

            var resultImg = new Image();

            img.onerror = function(e) {
                def.reject(e);
            };

            img.onload = function() {

                var x = img.width;
                var y = img.height;

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

                def.resolve(resultImg);
            };
    
            return def.promise;
        },

        fitImage: function(img, width, height, background) {
            var def = $q.defer();


            
            var resultImg = new Image();

            img.onerror = function(e) {
                def.reject(e);
            };

            img.onload = function() {

                var canvas = document.createElement('canvas');

                canvas.width = width;
                canvas.height = height;

                var ctx = canvas.getContext('2d');

                if(background) {
                    ctx.fillStyle=background;
                    ctx.fillRect(0,0,canvas.width, canvas.height);
                }

                var max = (img.width>img.height)?'width':'height';

                var ratio;
                ctx.save();
                if(max=='width') {
                    ratio=width/img.width;
                    ctx.translate(0, height/2);
                    ctx.drawImage(img, 0, -img.height*ratio/2, img.width*ratio, img.height*ratio);
                } else {
                    ratio=height/img.height;
                    ctx.translate(width/2, 0);
                    ctx.drawImage(img, -img.width*ratio/2, 0, img.width*ratio, img.height*ratio);
                }
                
                ctx.restore();

                resultImg.src=canvas.toDataURL();
                def.resolve(resultImg);
            };
            

            return def.promise;
        }


    };


}]);
