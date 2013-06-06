var PictureFrame = (function () {
    "use strict";

    var getPicturesAsync = function() {
        return new WinJS.Promise(function (comp, err, prog) {
            var picturesLibrary = Windows.Storage.KnownFolders.picturesLibrary;
            picturesLibrary.getFolderAsync('BrianMedia\\Beach')
                .then(function (mediaFolder) {
                    if (!mediaFolder) {
                        throw ("no BrianMedia folder");
                    } 

                    return mediaFolder.getFilesAsync();
                })
                .then(function (files) {
                    var pictures = [];
                    files.forEach(function (imgFile, i, ar) {
                        var imgURL = URL.createObjectURL(imgFile);
                        pictures.push({ name: imgFile.name, src: imgURL });
                        //URL.revokeObjectURL(imgURL); //FIX me safe to do now or after used ? CLEANUP mem leak
                    });

                    comp(pictures);
                })
                .done(null, function (error) {
                    console.log(error.message);

                });

        });
    };

    return {
        play: function () {
            getPicturesAsync().done( function(pictures) {
                var pictureFrame = document.getElementById("pictureFrame");
                pictureFrame.src = pictures[0].src;
            });

        }
    };
})();
