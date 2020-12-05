let amazon, cans, coffee, email, insta, meat, babies, deads;
let myFont, myClock, myPop, myCan, myBell, myCry, myShutter, myEmail, myDrink, myChing, myCount, myThunk;
let clock;
let cat;
let song;
let pos = 0;
let titleText = 'This is what happens every 5 seconds';
let direction = 0;
let count = 0;
let tileCountX = 1;
let tileCountY = 1;
let drawMode = 1;
let time; 

function preload() {
	soundFormats('wav', 'mp3');
	myFont = loadFont('Quicksand-Regular.otf');
	myClock = loadSound('clock.wav');
	myPop = loadSound('pop.wav');
	myCan = loadSound('can.wav');
	myBell = loadSound('bell.wav');
	myCry = loadSound('crying.wav');
	myShutter = loadSound('shutter.mp3');
	myEmail = loadSound('email.wav');
	myDrink = loadSound('drinking.mp3');
	myChing = loadSound('ching.mp3');
	myCount = loadSound('counting.mp3');
	myThunk = loadSound('thunk.wav');
	cat=loadImage('cat.jpeg');
	song=loadSound('song.mp3');
	
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	//sets the font and the size and the alignment of all of the text
	textFont(myFont);
	textSize(width/20);
	textAlign(CENTER, CENTER);
	rectMode(CENTER);
	//slows down the rate of the animations
	frameRate(30);
	time = millis();
	//this sets the volume of the ticking sound and plays it in a loop
	myClock.setVolume(5);
	myClock.loop(); 
	song.setVolume(1.0);
	
	//this creates a group for each animation
	amazon= new Group();
	cans= new Group();
	coffee= new Group();
	email= new Group();
	insta= new Group();
	meat= new Group();
	babies = new Group();
	deads = new Group();
	//this loads the clock animation
	clock = loadAnimation('clock1.png', 'clock8.png');
	
	// speech recognition object (will prompt for mic access)
	// foo = new p5.SpeechRec('en-US');
	
	
	//this adds the animations into sprites and to the groups
	for (let i =0; i< 30; i++) {
		//creates a sprite for the babies
		let newBaby = createSprite(random(width/3,2*(width/3)), random(200,height/3));
		newBaby.addAnimation('dancing', 'baby1.png', 'baby4.png');
		newBaby.visible = false;
		babies.add(newBaby);
		
		//creates a sprite for the meat
		let newMeat = createSprite(random(width/3,2*(width/3)), random(200,height/3));
		//uses frame delay to delay between frames in number of draw cycles
		//the framerate of the animation would be the sketch framerate divided by 6
		newMeat.addAnimation('dancing', 'Meat1.png', 'Meat4.png').frameDelay = 6;
		newMeat.visible = false;
		newMeat.setCollider('circle');
		meat.add(newMeat);
		
		//creates a sprite for the graves
		let newGrave = createSprite(random(width/3,2*(width/3)), random(200,height/3));
		newGrave.addAnimation('dancing', 'dead1.png', 'dead6.png');
		newGrave.visible = false;
		deads.add(newGrave);
		
		//creates a sprite for the Instagram logo
		let newIns = createSprite(random(width/3,2*(width/3)), random(200,height/3));
		//the framerate of the animation would be the sketch framerate divided by 10
		newIns.addAnimation('dancing', 'Ins1.png', 'Ins5.png').frameDelay = 10;
		newIns.visible = false;
		insta.add(newIns);
		
		//creates a sprite for the coffee
		let newCoffee = createSprite(random(width/3,2*(width/3)), random(200,height/3));
		newCoffee.addAnimation('dancing', 'Coffee1.png', 'Coffee4.png');
		newCoffee.visible = false;
		coffee.add(newCoffee);
		
		//creates a sprite for the mail
		let newMail = createSprite(random(width/3,2*(width/3)), random(200,height/3));
		//the framerate of the animation would be the sketch framerate divided by 8
		newMail.addAnimation('dancing', 'Email1.png', 'Email3.png').frameDelay = 8;
		newMail.visible = false;
		email.add(newMail);
	} 
		
	for (let i =0; i< 30; i++) {
		//creates a sprite for the cans
		let newCan = createSprite(random(width/3,2*(width/3)), random(200,height/3));
		//the framerate of the animation would be the sketch framerate divided by 10
		newCan.addAnimation('dancing', 'Can1.png', 'Can3.png').frameDelay = 10;
		newCan.visible = false;
		cans.add(newCan);
	}
	
	for (let i =0; i< 100; i++) {
		//creates a sprite for Amazon
		let newAmazon = createSprite(width/12 + floor(random(6))*width/6, random(200,height/3));
		//the framerate of the animation would be the sketch framerate divided by 10
		newAmazon.addAnimation('dancing','Amazon1.png', 'Amazon4.png').frameDelay = 10;
		newAmazon.visible = false;
		amazon.add(newAmazon);
	}
		
}

/* this displays the Baby sprites when its their time, and sets a collider so that they dont overlap
the code makes them fall by incrementing the y position and switching once they reacht the bottom.
the code also maps the y position to the rotation of the sprites */
function showBabies(group) {
	for (let i = 0; i< group.length; i++) {
		let j = group[i];
		j.visible = true;
		j.position.y += random(1,10);
		if (j.position.y == height-200) {
			j.position.y -= random(1,10);
		}
		let turn = map(j.position.y, 0,height/2, 0,360);
		j.rotation = turn;
		j.setCollider('circle',0,0,100);
	}
	//this makes the items in the group bounce against each other.
	group.bounce(group);
	myMove(group);
}

/* this displays the Email sprites when its their time, and sets a collider so that they dont overlap
the code also pushes the sprites toward the four corners of the screen with an attraction point */
function showEmails(group){
	for (let i = 0; i< group.length; i++) {
		let j = group[i];
		j.visible = true;
		// j.scale = random(0.1,1.5);
		j.scale = noise(frameCount*0.01)*2;
		if (j.position.x < width/2 && j.position.y < height/2) {
			j.position.x += 1;
			//j.attractionPoint(0.2, 0,0);
		} else if (j.position.x > width/2 && j.position.y > height/2) {
			j.position.x -= 1;
			//j.attractionPoint(0.2, width,height);
		} else if (j.position.x > width/2 &&  j.position.y < height/2) {
			j.position.x -= 1;
			//j.attractionPoint(0.2, width,0);				 
		} else {
			j.position.x += 1;
				//j.attractionPoint(0.2, 0,height);		
		}
		j.setCollider('circle',0,0,100);
	}
	group.bounce(group);
	myMove(group);
}

/* this displays the Graves when its their time, and sets a collider so that they dont overlap
the code also direction of the sprites making them rise with some friction and removing them when they reach the top.
the code also controls scale by maping it to the y position, they get smaller as they rise */
function showGraves(group) {
	for (let i = 0; i< group.length-1; i++) {
		let j = group[i];
		j.visible = true;
		j.friction = random(0.5);
		j.position.y -= random(1,5);
		//j.immovable = true;
		if (j.position.y < 100) {
			j.remove();
		}
		let shrink = map(j.position.y, 0,height,0.1,1);
		j.scale = shrink;
		//j.setSpeed(2,random(2,1));
		j.setCollider('circle',0,0,100);
	}
	group.bounce(group);
	myMove(group);
}

/* this displays the coffee sprites when its their time, and sets a collider so that they dont overlap
the code controls the position by pushing the sprites away from the middle. */
function showCoffee(group) {
	for (let i = 0; i< group.length; i++) {
		let j = group[i];
		j.visible = true;
		j.friction = random(0.5);
		if (j.position.x < width/2) {
			j.position.x -= random(1,10);
		} else {
			j.position.x += random(1,10);
		}
		j.setSpeed(2,random(2,1));
		j.setCollider('circle',0,0,100);
	}
	group.bounce(group);
	myMove(group);
}

/* this displays the Instagram sprites when its their time, and sets a collider so that they dont overlap
the code also sets an attraction point to the mouse position and randomly changes the scale. */
function showInstagram(group) {
	for (let i = 0; i< 10; i++) {
		let j = group[i];
		j.visible = true;
		//this slows down the force acting on it.
		j.friction = random(0.1);
		//this makes the text move around in the center of the screen
		j.attractionPoint(3, mouseX,mouseY);
		j.scale = random(0.9, 1);
		j.maxSpeed = 5;
		//j.setSpeed(2,random(2,1));
		j.setCollider('circle',0,0,100);
	}
	group.bounce(group);
	myMove(group);
}

/* this displays the Amazon signs when its their time, and sets a collider so that they dont overlap
the code also controls the position of the sprites so they dont stack too high or too wide */
function showAmazon(group) {
	for (let i = 0; i< 100; i++) {
		let j = group[i];
		j.visible = true;
		j.position.y += random(1,10);
		//b.setSpeed(2,0);
		if (j.position.y >= height-50) {
			j.position.y -= random(1,40);
			//j.setSpeed(2,0);
		}
		if (j.position.x > width-50){
			j.position.x -= random(1,3);
		} else if (j.position.x < 50){
			j.position.x += random(1,3);
		}
		j.setCollider('circle',width/2,height/2,5);
	}
	group.bounce(group);
	myMove(group);
}

/* this displays the meat when its their time, and sets a collider so that they dont overlap
the code also controls the rotation by mapping it to its y positon, it also maps the scale so the cans get bigger at the bottom */
function showMeat(group) {
	for (let i = 0; i< group.length; i++) {
		let j = group[i];
		j.visible = true; 
		j.position.y +=5;
		let turn = map(j.position.y, 0,height/2, 0,360);
		j.rotation = turn;
		let grow = map(j.position.y, 0,height,0.5,1);
		j.scale = grow;
		//this changes the direction of the meat path.
		if (j.position.y > height-300) {
				j.position.y -= random(1,10);
			}
			j.setCollider('circle',0,0,100);
	}
	group.bounce(group);
	myMove(group);
}

/* this displays the burgers when its their time, and sets a collider so that they dont overlap
the code also controls the downward movement */
function showCans(group) {
	for (let i = 0; i< 25; i++) {
		let j = group[i];
		j.visible = true;
		j.position.y += random(1, 3);
		j.setCollider('circle',0,0,100);
	}
	//this makes the items in the group bounce against each other.
	group.bounce(group);
	myMove(group);
}

//this hides the groups once their time is up
function unseen(group) {
	for (let i = 0; i< group.length; i++) {
		let j = group[i];
		j.visible = false;
	}
	//sound.stop();
}

//this makes on of the animations in the group follow the mouse position.
function myMove(group) {
	let c = group[group.length-1];
	c.position.x = mouseX;
	c.position.y = mouseY;
}


function homescreen() {
	clear();
  noFill();
  count = mouseX / 10 + 10;
  let para = mouseY / height;
  let tileWidth = width / tileCountX;
  let tileHeight = height / tileCountY;
	
  for (let gridY = 0; gridY <= tileCountY; gridY++) {
    for (let gridX = 0; gridX <= tileCountX; gridX++) {

      let posX = tileWidth * gridX + tileWidth / 2;
      let posY = tileHeight * gridY + tileHeight / 2;
      push();
      translate(posX, posY);
      // switch between modules
      switch (drawMode) {
      case 1:
        stroke(0);
        for (let i = 0; i < count; i++) {
          rect(0, 0, tileWidth, tileHeight);
          scale(1 - 3 / count);
          rotate(para * 0.1);
        }
        break;
      case 2:
        noStroke();
        for (let i = 0; i < count; i++) {
          let gradient = lerpColor(color(0, 0), color(166, 141, 5), i / count);
          fill(gradient, i / count * 200);
          rotate(QUARTER_PI);
          rect(0, 0, tileWidth, tileHeight);
          scale(1 - 3 / count);
          rotate(para * 1.5);
        }
        break;
      case 3:
        noStroke();
        for (let i = 0; i < count; i++) {
          let gradient = lerpColor(color(0, 130, 164), color(255), i / count);
          fill(gradient, 170);

          push();
          translate(4 * i, 0);
          ellipse(0, 0, tileWidth / 4, tileHeight / 4);
          pop();

          push();
          translate(-4 * i, 0);
          ellipse(0, 0, tileWidth / 4, tileHeight / 4);
          pop();

          scale(1 - 1.5 / count);
          rotate(para * 1.5);
        }
        break;
      }
      pop();
    }
  }
}

function draw(){
	background(255);
	//this is the code for the home screen or default part of the experience.
	homescreen();
	
	//the first 5 seconds show the ticking clock animation and the text
	if (time < 5000) {
		animation(clock,width/2,height/3);
		fill(0);
		textSize(width/20);
		if(pos< 500) {
			text('This is what happens every 5 seconds',width/2,500+pos);
			let m = map(mouseY,height/2,0,0,height,0);
			pos = m;
			//pos+= sin(frameCount/2);
		} else {
			pos= 0-pos;
		}
		//text('This is what happens every 5 seconds',width/2,500);
		stroke(0);
		//this time conditions control the pace in which the facts are shown i.e. every second
	} else if (time <10000) {
		background(255);
		//makes the baby animation play and displays the fact
		showBabies(babies);
		fill(0);
		textSize(width/20);
		text('21 babies are born',width/2,500);
	} else if (time < 15000) {
		background(255);
		//hides the previous group
		unseen(babies);
		//makes the meat animation play and displays the fact
		fill(0);
		textSize(width/20);
		//seen(meat);
		showMeat(meat);
		//myMeat.play();
		text('Supermarkets throw away 4.5 tons of edible foods',width/2,500);
	} else if (time < 20000) {
		background(255);
		//hides the previous group
		//myMeat.stop();
		unseen(meat);
		//makes the coffee animation play and displays the fact
		showCoffee(coffee);
		fill(0);
		textSize(width/20);
		text('254 cups of coffee are drunk',width/2,500);
	} else if (time < 25000) {
		background(255);
		//hides the previous group
		unseen(coffee);
		//makes the cans animation play and displays the fact
		showCans(cans);
		fill(0);
		textSize(width/20);
		text('20,000 cans are open',width/2,500);
	} else if (time < 30000) {
		background(255);
		//hides the previous group
		unseen(cans);
		//makes the grave animation play and displays the fact
		showGraves(deads);
		fill(0);
		textSize(width/20);
		text('9 people die',width/2,500);
	} else if (time < 35000) {
		background(255);
		//hides the previous group
		unseen(deads);
		//makes the instagram animation play and displays the fact
		showInstagram(insta);
		fill(0);
		textSize(width/20);
		text('3,200 pictures are posted on Instagram',width/2,500);
	} else if (time < 40000) {
		background(255);
		//hides the previous group
		unseen(insta);
		//makes the mail animation play and displays the fact
		showEmails(email);
		fill(0);
		textSize(width/20);
		text('17,000,000 emails are sent',width/2,500);
	} else if (time < 45000) {
		background(255);
		//hides the previous group
		unseen(email)
		//makes the amazon animation play and displays the fact
		showAmazon(amazon);
		fill(0);
		textSize(width/20);
		text('Amazon sells $7,000 worth of product',width/2,500);
	
	} else {
		background(255);
		//hides the previous group
		unseen(amazon);
		fill(0);
		textSize(width/20);
		text('You watched all of this',width/2,height/3);
		if (time > 50000) {
			image(cat, width/3, height/2,500,300);
		} 
	}
	time = millis();
	
/* this part of the code ensures that all the sprites bounce at the screen edges */
	for(let i=0; i<allSprites.length; i++) {
    let d = allSprites[i];
		//accesses all sprites checks if the x position is less than zero
    if(d.position.x<0) {
      d.position.x = 1;
      d.velocity.x = abs(d.velocity.x);
    }

    if(d.position.x>width) {
      d.position.x = width-1;
      d.velocity.x = -abs(d.velocity.x);
    }

    if(d.position.y<0) {
      d.position.y = 1;
      d.velocity.y = abs(d.velocity.y);
    }

    if(d.position.y>height) {
      d.position.y = height-1;
      d.velocity.y = -abs(d.velocity.y);
    }
	}
	drawSprites();
}

function showError(){
	console.log('There is an error');
	text('There is an error', windowWidth/2, windowHeight/2);
}

function mousePressed() {
	//this part allows the sounds to be controlled with the mouse clicks at the appropriate times. 
	//I also set the volume to 2 when its their turn.
	if (time<5000){
		if (!song.isPlaying()) {
			song.loop();
		}
	} else if (time < 10000) {
		song.stop();
		myClock.setVolume(1.0);
		myCry.setVolume(2);
		myCry.play();
	} else if (time < 15000) {
		myCry.stop();
		myThunk.setVolume(2);
		myThunk.play()
	} else if (time < 20000) {
		myThunk.stop();
		myDrink.setVolume(2);
		myDrink.play();
	} else if (time < 25000) {
		myDrink.stop();
		myCan.setVolume(2);
		myCan.play();
	} else if (time < 30000) {
		myCan.stop();
		myBell.setVolume(2);
		myBell.play();
	} else if (time < 35000) {
		myBell.stop();
		myShutter.setVolume(2);
		myShutter.play();
	} else if (time < 40000) {
		myShutter.stop();
		myEmail.setVolume(2);
		myEmail.play();
	} else if (time < 45000) {
		myEmail.stop();
		myCount.setVolume(2);
		myChing.setVolume(2);
		myCount.play();
		myChing.play();
	} else if (time < 50000) {
		myCount.stop();
		myChing.stop();
		myPop.setVolume(2);
		//song.setVolume(2);
		myPop.play();
	} else {
		if (time >55000) {
			myPop.play()
		}
		myPop.stop();
	}
}