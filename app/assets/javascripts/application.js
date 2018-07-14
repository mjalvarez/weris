// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require_tree ./jpeg_camera


$(document).ready(function() {
    if (window.JpegCamera) {

        var camera; // placeholder

        // Add the photo taken to the current Rekognition collection for later comparison
        var add_to_collection = function() {
            var snapshot = camera.capture();
            var api_url = "/snapshots";
            $("#loading_img").show();
            snapshot.upload({api_url: api_url}).done(function(response) {
                $("#upload_result").html(response);
                $("#loading_img").hide();
                this.discard();
            }).fail(function(status_code, error_message, response) {
                $("#upload_status").html("Upload failed with status " + status_code + " (" + error_message + ")");
                $("#upload_result").html(response);
                $("#loading_img").hide();
            });
        };


        // Compare the photographed image to the current Rekognition collection
        var compare_image = function() {
            var snapshot = camera.capture();
            var api_url = "/compare";
            $("#loading_img").show();
            snapshot.upload({api_url: api_url}).done(function(response) {
                var data = JSON.parse(response);
                if (data.id !== undefined) {
                    $("#upload_result").html(data.message + ": " + data.id + ", Confidence: " + data.confidence);
                    // create speech response
                    $.post("/speech", {tosay: "Good " + greetingTime(moment()) + " " + data.id}, function(response) {
                        $("#audio_speech").attr("src", "data:audio/mpeg;base64," + response);
                        $("#audio_speech")[0].play();
                    });
                } else {
                    $("#upload_result").html(data.message);
                }
                $("#loading_img").hide();
                this.discard();
            }).fail(function(status_code, error_message, response) {
                $("#upload_status").html("Upload failed with status " + status_code + " (" + error_message + ")");
                $("#upload_result").html(response);
                $("#loading_img").hide();
            });
        };

        var greetingTime = function(moment) {
            var greet = null;

            if(!moment || !moment.isValid()) { return; } //if we can't find a valid or filled moment, we return.
            var split_afternoon = 12 //24hr time to split the afternoon
            var split_evening = 17 //24hr time to split the evening
            var currentHour = parseFloat(moment.format("HH"));

            if(currentHour >= split_afternoon && currentHour <= split_evening) {
                greet = "afternoon";
            } else if(currentHour >= split_evening) {
                greet = "evening";
            } else {
                greet = "morning";
            }
            return greet;
        }

        var startRecording = function(){
            var counter = 0;
            var i = setInterval(function(){
                add_to_collection()

                counter++;
                if(counter === 10) {
                    clearInterval(i);
                }
            }, 5000);

        }

        // Define what the button clicks do.
        $("#add_to_collection").click(add_to_collection);
        $("#compare_image").click(compare_image);
        $("#start_recording").click(startRecording);

        // Initiate the camera widget on screen
        var options = {
            shutter_ogg_url: "js/jpeg_camera/shutter.ogg",
            shutter_mp3_url: "js/jpeg_camera/shutter.mp3",
            swf_url: "js/jpeg_camera/jpeg_camera.swf"
        }


        camera = new JpegCamera("#camera", options).ready(function(info) {
            $("#loading_img").hide();
        });



    }

});
