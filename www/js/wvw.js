var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;
var GAME_WIDTH = 896;
var GAME_HEIGHT = 512;
var renderer = autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT); // aspect: 7/4
var logo;

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
//renderer.autoResize = true;
//renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new Container();

var loader_rect1 = new PIXI.Graphics();
loader_rect1.beginFill(0x000060);
loader_rect1.lineStyle(2, 0xFFFFFF, 1);
loader_rect1.drawRect(50, 50, 800, 20);
loader_rect1.endFill();

var loader_rect2 = new PIXI.Graphics();
loader_rect2.beginFill(0x66CCFF);
loader_rect2.lineStyle(0, 0x0000FF, 0);
loader_rect2.drawRect(50, 50, 0, 20);
loader_rect2.endFill();
stage.addChild(loader_rect1);
stage.addChild(loader_rect2);

renderer.render(stage);

function loadProgressHandler(loader, resource) {

    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //Display the precentage of files currently loaded
    console.log("progress: " + loader.progress + "%");

    loader_rect2.width = loader.progress * 8;
    renderer.render(stage);
}


loader
  .add( [
    "img/logo1.jpg"
    ]
  )
  .on("progress", loadProgressHandler)
  .load(setup);

function setup() {
    logo = new Sprite(
        loader.resources["img/logo1.jpg"].texture
    );
    //logo.scale.set(0.5, 0.5);
    logo.anchor.set(0.5, 0.5);
    logo.x = GAME_WIDTH / 2;
    logo.y = GAME_HEIGHT / 2;
    //Add the cat to the stage
    stage.addChild(logo);
    stage.removeChild(loader_rect1);
    stage.removeChild(loader_rect2);
    //Render the stage
    renderer.render(stage);

    //Start the game loop
    gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Move the cat 1 pixel per frame
  logo.rotation += 1.0/60.0;

  //Render the stage
  renderer.render(stage);
}