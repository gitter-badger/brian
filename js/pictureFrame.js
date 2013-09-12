var PictureFrame = (function () {
    "use strict";

    var picturesList = new WinJS.Binding.List();

    var getPicturesAsync = function() {
        return new WinJS.Promise(function (complete, error, progress) {
            var picturesLibrary = Windows.Storage.KnownFolders.picturesLibrary;
            picturesLibrary.getFolderAsync('BrianMedia')
                .then(function (mediaFolder) {
                    if (!mediaFolder) {
                        throw ("no BrianMedia folder");
                    } 

                    return mediaFolder.getFilesAsync();
                })
                .then(function (files) {
                    files.forEach(function (imgFile, i, ar) {
                        var imgURL = URL.createObjectURL(imgFile);
                        picturesList.push({ title: imgFile.name, picture: imgURL });
                        //URL.revokeObjectURL(imgURL); //FIXME safe to do now or after used ? CLEANUP mem leak
                    });

                    complete();
                })
                .done(null, function (error) {
                    console.log(error.message);
                });

        });
    };

    WinJS.Namespace.define("PicturesModel", {
        getPicturesAsync: getPicturesAsync,
        picturesList: picturesList
        });
 })();
