status="";
objects=[]

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture();
    video.hide()
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status !=""){
        objectDetector.detect(video, gotResult);
        for (i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status : object detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are:"+objects.results;
            fill("pink");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("yellow");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("model Loaded")
    status = true;
}

function gotresult(error, results){
if(error) {
    console.error(error);
}
else{
    console.log(results)
    objects = results;
}
}