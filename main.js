img = "";
status1=""
objects=[]
function preload() {
    img =loadImage("dog_cat.jpg")
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function modelLoaded(){
    console.log("cocossd model Loaded...");
    status1=true;
    
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide()
    od=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects in the Picture Below";
}


function draw() {
    image(video,0,0,380,380);
    console.log("status=",status1)
    if (status1 != "") {
        r=random(255);
        g=random(255);
        b=random(255);
        od.detect(video,gotResult)
        for(i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="Status:  Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are "+objects.length;
            fill(r,g,b);
            p=floor(objects[i].confidence*100);
            text(objects[i].label+" "+p+"%",objects[i].x,objects[i].y);
            noFill()
            stroke(r,g,b)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
    
}
