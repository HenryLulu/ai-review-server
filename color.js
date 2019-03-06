const gm = require('gm');

gm('./img/img_0258.jpg')
    .modulate(100, 500)
    // .whiteThreshold('60%', '0', '0')
    // .blackThreshold('100%', '100%', '100%')
    .channel('Red')

    .write('./img/img_02582.jpg', e => {
        console.log(e);
    })
// var Jimp = require('jimp');

// Jimp.read('./img/img_0258.jpg')
//   .then(lenna => {
//     return lenna
//       .greyscale() // set greyscale
//       .write('./img/img_02582.jpg'); // save
//   })
//   .catch(err => {
//     console.error(err);
//   });