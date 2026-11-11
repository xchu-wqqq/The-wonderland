let cam, maskImage, result;
let front;

let video30;
let video31;
let video32;
let video33A;
let video33A1;
let video33A2;
let video33B2;

let faceScale = 0.5;
let mode = "camera";

let endingStart;
let endingFadeTime = 2500;

let pink = "#C2185B";
let darkPink = "#7A1238";
let cream = "#FFF8E7";
let darkCream = "#EEDBB8";

let continueButton = {
  text: "CONTINUE",
  x: 700,
  y: 410,
  w: 155,
  h: 38,
  size: 18
};

let choice30A = {
  text: "You’re as cute as a doll",
  x: 200,
  y: 360,
  size: 18,
  w: 260,
  h: 45
};

let choice30B = {
  text: "I wanna kiss you",
  x: 600,
  y: 360,
  size: 18,
  w: 210,
  h: 45
};

let choice31A = {
  text: "Kiss my hand to prove\nyou love me",
  x: 210,
  y: 350,
  size: 18,
  w: 330,
  h: 65
};

let choice31B = {
  text: "KISS MY HAND",
  x: 610,
  y: 350,
  size: 18,
  w: 190,
  h: 45
};

let choice32A = {
  text: "I’m so bored.\nTake me out somewhere.",
  x: 200,
  y: 350,
  size: 18,
  w: 310,
  h: 65
};

let choice32B = {
  text: "I have something important\nto tell you.",
  x: 600,
  y: 350,
  size: 18,
  w: 320,
  h: 65
};

let choice33A = {
  text: "I saved a fish\nfrom drowning",
  x: 135,
  y: 350,
  size: 15,
  w: 225,
  h: 70
};

let choice33B = {
  text: "I took his shirt off so he could breathe.",
  x: 400,
  y: 350,
  size: 14,
  w: 255,
  h: 80
};

let choice33C = {
  text: "I massage abs for charity",
  x: 665,
  y: 350,
  size: 15,
  w: 225,
  h: 70
};

async function setup() {
  createCanvas(600, 600);
  noStroke();

  maskImage = await loadImage("hello.png");
  front = await loadFont("front.ttf");

  video30 = createVideo("3.0.mp4");
  video30.hide();
  video30.onended(showChoice30);

  video31 = createVideo("3.1.mp4");
  video31.hide();
  video31.onended(showChoice31);

  video32 = createVideo("3.2.mp4");
  video32.hide();
  video32.onended(showChoice32);

  video33A = createVideo("3.3A.mp4");
  video33A.hide();
  video33A.onended(showChoice33A);

  video33A1 = createVideo("3.3A1.mp4");
  video33A1.hide();
  video33A1.onended(play33A2);

  video33A2 = createVideo("3.3A2.mp4");
  video33A2.hide();
  video33A2.onended(showEnding);

  video33B2 = createVideo("3.3B2.mp4");
  video33B2.hide();
  video33B2.onended(showEnding);

  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
}

function draw() {
  if (mode === "camera") {
    drawCamera();
  } else if (mode === "video30") {
    cursor(ARROW);
    draw30();
  } else if (mode === "choice30") {
    draw30();
    drawTwoChoices(choice30A, choice30B);
  } else if (mode === "video31") {
    cursor(ARROW);
    draw31();
  } else if (mode === "choice31") {
    draw31();
    drawTwoChoices(choice31A, choice31B);
  } else if (mode === "video32") {
    cursor(ARROW);
    draw32();
  } else if (mode === "choice32") {
    draw32();
    drawTwoChoices(choice32A, choice32B);
  } else if (mode === "video33A") {
    cursor(ARROW);
    draw33A();
  } else if (mode === "choice33A") {
    draw33A();
    drawThreeChoices(choice33A, choice33B, choice33C);
  } else if (mode === "video33A1") {
    cursor(ARROW);
    draw33A1();
  } else if (mode === "video33A2") {
    cursor(ARROW);
    draw33A2();
  } else if (mode === "video33B2") {
    cursor(ARROW);
    draw33B2();
  } else if (mode === "ending") {
    drawEnding();
  } else if (mode === "finished") {
    cursor(ARROW);
    background(0);
  }
}

function drawCamera() {
  background("#75B9BE");

  if (cam.loadedmetadata) {
    image(getFace(), 0, 0, 600, 600);
  }

  fill("#8B1717");
  textFont(front);

  textSize(32);
  textAlign(CENTER, TOP);
  text("Click on the bottom to get started", 300, 20);

  textSize(24);
  textAlign(RIGHT, BOTTOM);
  text("CAMERA", 570, 575);

  if (mouseX > 450 && mouseY > 530) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function getFace() {
  let cameraImage = cam.get(80, 0, 480, 480);
  let picture = createGraphics(600, 600);
  picture.translate(600, 0);
  picture.scale(-1, 1);
  picture.image(cameraImage, 0, 0, 600, 600);

  let mask = createGraphics(600, 600);
  let size = 600 * faceScale;
  let position = (600 - size) / 2;
  mask.clear();
  mask.image(maskImage, position, position, size, size);

  let face = picture.get();
  face.mask(mask.get());
  picture.remove();
  mask.remove();

  return face;
}

function takePhoto() {
  if (!cam.loadedmetadata) return;

  result = getFace();

  resizeCanvas(800, 450);

  playVideo(video30, "video30");
}

function draw30() {
  drawVideo(video30);
  drawTimedFace(video30, 0, 3.85, 395, 230, 320);
  drawTimedFace(video30, 6.6, 3, 395, 230, 320);
}

function showChoice30() {
  mode = "choice30";
}

function draw31() {
  drawVideo(video31);

  // 3.1结尾的人脸
  let duration = video31.duration();

  if (!duration) return;

  drawTimedFace(
    video31,duration - 1.4,3,395, 230, 320);
}

function showChoice31() {
  mode = "choice31";
}

function draw32() {
  drawVideo(video32);

  drawTimedFace(video32, 3.7, 2, 395, 230, 320);
}

function showChoice32() {
  mode = "choice32";
}

function draw33A() {
  drawVideo(video33A);
}

function showChoice33A() {
  mode = "choice33A";
}

function draw33A1() {
  drawVideo(video33A1);

  drawTimedFace(video33A1, 0.2, 4, 180, 130, 125);
}

function play33A2() {
  playVideo(video33A2, "video33A2");
}

function draw33A2() {
  drawVideo(video33A2);

  drawTimedFace(video33A2, 7.25, 3, 408, 115, 110);
  drawTimedFace(video33A2, 10.25, 5.635, 436, 210, 140);
  drawTimedFace(video33A2, 15.885, 1, 517, 207.5, 140);
  drawTimedFace(video33A2, 16.885, 1.64, 330, 290, 320);
}

function draw33B2() {
  drawVideo(video33B2);
  drawTimedFace(video33B2, 0, 5, 400, 98, 180);
}

function drawVideo(video) {
  background(0);
  image(video, 0, 0, width, height);
}

function playVideo(video, nextMode) {
  mode = nextMode;
  video.time(0);
  video.play();
}

function drawTimedFace(video, start, duration, x, y, size) {
  let currentTime = video.time();
  let endTime = start + duration;

  if (currentTime < start || currentTime >= endTime) {
    return;
  }

  let sourceSize = 600 * faceScale;
  let sourcePosition = (600 - sourceSize) / 2;
  push();

  imageMode(CENTER);
  image(result, x, y, size, size,sourcePosition, sourcePosition, sourceSize, sourceSize);

  pop();
}

function drawTwoChoices(choiceA, choiceB) {
  let hoverA = insideButton(choiceA);
  let hoverB = insideButton(choiceB);
  drawButton(choiceA, hoverA);
  drawButton(choiceB, hoverB);

  if (hoverA || hoverB) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function drawThreeChoices(choiceA, choiceB, choiceC) {
  let hoverA = insideButton(choiceA);
  let hoverB = insideButton(choiceB);
  let hoverC = insideButton(choiceC);

  drawButton(choiceA, hoverA);
  drawButton(choiceB, hoverB);
  drawButton(choiceC, hoverC);

  if (hoverA || hoverB || hoverC) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function drawButton(button, hover) {
  push();

  rectMode(CENTER);
  noStroke();

  drawingContext.shadowColor = "rgba(80, 45, 30, 0.28)";
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 3;

  if (hover) {
    fill(darkCream);
  } else {
    fill(cream);
  }

  rect(button.x, button.y, button.w, button.h, button.h / 2);
  drawingContext.shadowColor = "rgba(0, 0, 0, 0)";
  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;
  textFont(front);
  textSize(button.size);
  textLeading(button.size * 1.2);
  textAlign(CENTER, CENTER);

  if (hover) {
    fill(darkPink);
  } else {
    fill(pink);
  }

  text(button.text, button.x, button.y);

  pop();
}

function insideButton(button) {
  return (
    mouseX > button.x - button.w / 2 &&
    mouseX < button.x + button.w / 2 &&
    mouseY > button.y - button.h / 2 &&
    mouseY < button.y + button.h / 2
  );
}

function showEnding() {
  mode = "ending";
  endingStart = millis();
}

function drawEnding() {
  background(0);

  let elapsed = millis() - endingStart;

  let fadeAmount = map(elapsed, 0, endingFadeTime, 0, 255, true);
  fadeAmount = constrain(fadeAmount, 0, 255);

  let endingColor = color(pink);
  endingColor.setAlpha(fadeAmount);

  textFont(front);
  textSize(38);
  textAlign(CENTER, CENTER);
  fill(endingColor);

  text("“I’m here to see him”", width / 2, height / 2);

  if (elapsed >= endingFadeTime) {
    drawContinueButton();
  } else {
    cursor(ARROW);
  }
}

function drawContinueButton() {
  let hover = insideButton(continueButton);

  drawButton(continueButton, hover);

  if (hover) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  if (mode === "camera" && mouseX > 450 && mouseY > 530) {
    takePhoto();
    return;
  }

  if (
    mode === "choice30" &&
    (insideButton(choice30A) || insideButton(choice30B))
  ) {
    playVideo(video31, "video31");
    return;
  }

  if (
    mode === "choice31" &&
    (insideButton(choice31A) || insideButton(choice31B))
  ) {
    playVideo(video32, "video32");
    return;
  }

  if (mode === "choice32" && insideButton(choice32A)) {
    playVideo(video33A1, "video33A1");
    return;
  }

  if (mode === "choice32" && insideButton(choice32B)) {
    playVideo(video33A, "video33A");
    return;
  }

  if (
    mode === "choice33A" &&
    (
      insideButton(choice33A) ||
      insideButton(choice33B) ||
      insideButton(choice33C)
    )
  ) {
    playVideo(video33B2, "video33B2");
    return;
  }

  if (
    mode === "ending" &&
    millis() - endingStart >= endingFadeTime &&
    insideButton(continueButton)
  ) {
    mode = "finished";
  }
}