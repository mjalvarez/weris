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
        var save_snapshot = function() {
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

        var counter = 0;
        var isRecording = false

        var $btn = $("#start_recording")
        var record = function(){

            save_snapshot()
            console.log('COUNTER: ', counter)
            counter++;
            if(counter === 10) {
                clearInterval(recorder);
                $btn
                    .html("Start Recording")
                    .removeClass('is-danger')
                    .addClass('is-success')
                isRecording = false
                counter = 0
            }

        }
        var recorder = setInterval(record, 5000);
        var toggleRecording = function(){
            if(isRecording) {
                console.log('IS RECORDING? ', isRecording)
                stopRecording()
            } else {
                startRecording()
            }

        }

        var startRecording = function(){
            isRecording = true
            $btn
                .html("<i class=\"fa fa-circle-o-notch fa-spin\" style=\"font-size:24px\"></i>  Stop Recording")
                .removeClass('is-success')
                .addClass('is-danger')

            record()

        }

        var stopRecording = function() {
            isRecording = false
            counter = 0
            clearInterval(recorder);

            $btn
                .html("Start Recording")
                .removeClass('is-danger')
                .addClass('is-success')
        }

        // Define what the button clicks do.
        $("#save_snapshot").click(save_snapshot);
        $("#compare_image").click(compare_image);
        $("#start_recording").click(toggleRecording);

        // Initiate the camera widget on screen
        var options = {
            shutter_ogg_url: "/assets/jpeg_camera/shutter.ogg",
            shutter_mp3_url: "/assets/jpeg_camera/shutter.mp3",
            swf_url: "/assets/jpeg_camera/jpeg_camera.swf",
            quality: 1.0,
            mirror: true
        }


        camera = new JpegCamera("#camera", options).ready(function(info) {
            $("#loading_img").hide();
        });



    }

});
