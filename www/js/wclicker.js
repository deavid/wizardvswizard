"use strict";
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    Rectangle = PIXI.Rectangle,
    resources = PIXI.loader.resources,
    Text = PIXI.Text,
    Sprite = PIXI.Sprite;
var TextureCache = PIXI.utils.TextureCache;

var GAME_WIDTH = 720 / 2;
var GAME_HEIGHT = 1280 / 2;
var renderer = autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);

var EARN_SPEED = 1;
var sprites = new Object();

var frameno = 0;
var game = new Object();

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}


//PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

renderer.backgroundColor = 0x100040;

document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new Container();

var final_stage = new Container(); // To manage Zoom.

final_stage.addChild(stage);

var game_state = null;

function init_game() {
    sprites.title_text = new PIXI.Text(
      "Wizard\nClicker!\n!!!!1!1!\n\n",
      {    fontFamily : 'Arial',
    fontSize : '64px',
    fontStyle : 'italic',
    fontWeight : 'bold',
    stroke : '#EF4800',
    strokeThickness : 6,
    dropShadow : true,
    dropShadowColor : '#000000',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 10,
    align : "center",
    fill : '#F7EDCA'}
    );
    sprites.title_text.anchor.set(0.5, 0.5);
    sprites.title_text.x = GAME_WIDTH / 2;
    sprites.title_text.y = GAME_HEIGHT / 2;

    stage.addChild(sprites.title_text);

    sprites.loader_rect1 = new PIXI.Graphics();
    sprites.loader_rect1.beginFill(0x000000);
    sprites.loader_rect1.lineStyle(2, 0xFFFFFF, 1);
    sprites.loader_rect1.drawRect(48, 548, 252, 23);
    sprites.loader_rect1.endFill();

    sprites.loader_rect2 = new PIXI.Graphics();
    sprites.loader_rect2.beginFill(0x66CCFF);
    sprites.loader_rect2.lineStyle(0, 0x0000FF, 0);
    sprites.loader_rect2.drawRect(0, 0, 20, 20);
    sprites.loader_rect2.endFill();
    sprites.loader_rect2.x = 50
    sprites.loader_rect2.y = 550
    stage.addChild(sprites.loader_rect1);
    stage.addChild(sprites.loader_rect2);

    renderFrame();

    loader.reset();
    loader
      .add( [

        //"img/logo1.png",
        "img/frame1.png",
        "img/button1.png",

        "img/creatures.json",
        "img/magic_spheres.json",
        "img/background1.jpg",

        "fnt/LatoMediumBold24.fnt",
        "fnt/LatoMediumBold32.fnt",

        ""
        ]
      )
      .on("progress", loadProgressHandler)
      .load(setup);
}

function renderFrame() {
    renderer.render(final_stage);
}

function loadProgressHandler(loader, resource) {
    //Display the precentage of files currently loaded
    console.log("progress: " + parseInt(loader.progress) + "% ; " + resource.url);

    sprites.loader_rect2.width = parseInt( 20+ loader.progress * 2);
    renderFrame();
}

function setup() {
    stage.removeChild(sprites.loader_rect1);
    stage.removeChild(sprites.loader_rect2);

    sprites.title_text.interactive = true;
    sprites.title_text.onDown = title_text_clicked;
    sprites.title_text.on('mousedown', sprites.title_text.onDown);
    sprites.title_text.on('touchstart', sprites.title_text.onDown);

    renderFrame();
}


/*window.onpopstate = function(event) {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    stage.removeChildren();
    init_game();

};*/

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function title_text_clicked() {
    if (isMobile) {
        launchIntoFullscreen(document.getElementsByTagName("canvas")[0]);
    }
    stage.removeChildren();
    //history.pushState({page: "game"}, "Wizard Clicker - Game", "#game");

    game.mana0 = 0;
    game.mana1 = 0;
    game.mana2 = 0;
    game.mage_power_mana0 = 5;
    game.mage_power_mana1 = 0;
    game.mage_power_mana2 = 0;

    sprites.player = getCreatureSprite("mage", mage_clicked);
    stage.addChild(sprites.player);
    sprites.player.x = 50 + 30;
    sprites.player.y = 70 + 30;

    var sphere_separation = GAME_WIDTH * 0.17;
    sprites.sphere0 = getSphereSprite("grey");
    sprites.sphere0.x = GAME_WIDTH * 0.85 - sphere_separation * 0;
    sprites.sphere0.y = GAME_HEIGHT * 0.1;

    sprites.sphere0text = new PIXI.extras.BitmapText("Lvl\n0.00", {font: "32px LatoMediumBold32", align: "center"});
    sprites.sphere0text.anchor.set(0.5, 0.5);
    sprites.sphere0text.scale.set(0.5, 0.5);
    sprites.sphere0text.x = 0;
    sprites.sphere0text.y = 0;

    sprites.sphere0.addChild(sprites.sphere0text);

    sprites.sphere1 = getSphereSprite("red");
    sprites.sphere1.x = GAME_WIDTH * 0.85 - sphere_separation * 1;
    sprites.sphere1.y = GAME_HEIGHT * 0.1;

    sprites.sphere1text = new PIXI.extras.BitmapText("Lvl\n0.00", {font: "32px LatoMediumBold32", align: "center"});
    sprites.sphere1text.anchor.set(0.5, 0.5);
    sprites.sphere1text.scale.set(0.5, 0.5);
    sprites.sphere1text.x = 0;
    sprites.sphere1text.y = 0;

    sprites.sphere1.addChild(sprites.sphere1text);

    sprites.sphere2 = getSphereSprite("blue");
    sprites.sphere2.x = GAME_WIDTH * 0.85 - sphere_separation * 2;
    sprites.sphere2.y = GAME_HEIGHT * 0.1;

    sprites.sphere2text = new PIXI.extras.BitmapText("Lvl\n0.00", {font: "32px LatoMediumBold32", align: "center"});
    sprites.sphere2text.anchor.set(0.5, 0.5);
    sprites.sphere2text.scale.set(0.5, 0.5);
    sprites.sphere2text.x = 0;
    sprites.sphere2text.y = 0;

    sprites.sphere2.addChild(sprites.sphere2text);


    update_mana_levels();

    stage.addChild(sprites.sphere0);
    stage.addChild(sprites.sphere1);
    stage.addChild(sprites.sphere2);

    sprites.cmd1 = getSphereSprite("empty");
    sprites.cmd1.x = GAME_WIDTH * 0.15;
    sprites.cmd1.y = GAME_HEIGHT * 0.9;
    stage.addChild(sprites.cmd1);

    sprites.cmd1_a1 = getSphereSprite("small_grey");
    sprites.cmd1_a1.position.set(23,25);
    sprites.cmd1_a1.scale.set(1.2,1.2);
    sprites.cmd1.addChild(sprites.cmd1_a1);

    sprites.cmd1_b1 = getSphereSprite("small_red");
    sprites.cmd1_b1.position.set(23-14,25);
    sprites.cmd1_b1.scale.set(1.2,1.2);
    sprites.cmd1.addChild(sprites.cmd1_b1);

    sprites.cmd1_b1t = new PIXI.extras.BitmapText("1",
            {font: "24px LatoMediumBold24", align: "center"});
    sprites.cmd1_b1t.anchor.set(0.5, 0.5);
    sprites.cmd1_b1t.scale.set(0.5,0.5);
    sprites.cmd1_b1t.x = 2;
    sprites.cmd1_b1t.y = -1;
    sprites.cmd1_b1t.alpha = 0.7;
    //sprites.cmd1_b1.addChild(sprites.cmd1_b1t);

    sprites.cmd1_a1t = new PIXI.extras.BitmapText("3",
            {font: "24px LatoMediumBold24", align: "center"});
    sprites.cmd1_a1t.anchor.set(0.5, 0.5);
    sprites.cmd1_a1t.scale.set(0.5,0.5);
    sprites.cmd1_a1t.x = 2;
    sprites.cmd1_a1t.y = -1;
    sprites.cmd1_a1t.alpha = 0.7;
    sprites.cmd1_a1.addChild(sprites.cmd1_a1t);

    sprites.cmd1t = new PIXI.extras.BitmapText("Goblin",
            {font: "32px LatoMediumBold32", align: "center"});
    sprites.cmd1t.anchor.set(0.5, 0.5);
    sprites.cmd1t.scale.set(0.5,0.5);
    sprites.cmd1t.x = 1;
    sprites.cmd1t.y = 0;
    sprites.cmd1.addChild(sprites.cmd1t);

    game_state = play_game;
    gameLoop();
}

function update_mana_levels() {
    function f(x,q) {
        x /= 10.0;
        var l = Math.log(x+1);
        var n = 0;
        if (l >= q) n = l - q + 1;
        else n = x / Math.exp(q);
        return Math.max(n,0).toFixed(2);
    }
    function f(x,q) {
        var p1 = Math.pow(20 * q + x, 1.0/q) - Math.pow(20 * q, 1.0/q) ;
        var p2 =  q * 5 * p1 / Math.pow(Math.log(x + 10),2) + 10+ q;
        return (Math.min(p1,p2)).toFixed(2);
    }
    //console.log(game.mana0 + " " + Math.log(game.mana0+1).toFixed(2));
    var prev1 = game.lvmana0 + ";" + game.lvmana1 + ";" + game.lvmana2 + ";";
    game.lvmana0 = f(game.mana0, 3);
    game.lvmana1 = f(game.mana1, 4);
    game.lvmana2 = f(game.mana2, 5);
    var new1 = game.lvmana0 + ";" + game.lvmana1 + ";" + game.lvmana2 + ";";

    if (prev1 != new1) {
        sprites.sphere0text.text = "Lvl\n" + game.lvmana0;
        sprites.sphere1text.text = "Lvl\n" + game.lvmana1;
        sprites.sphere2text.text = "Lvl\n" + game.lvmana2;
    }
}

function getCreatureSprite(spritename, onDown) {
    var texture = TextureCache[spritename + ".png"];
    var cntsprite = new Container();
    var frame = new Sprite(loader.resources["img/frame1.png"].texture);
    var sprite = new Sprite(texture);
    frame.scale.set(0.4, 0.4);
    frame.anchor.set(0.5, 0.5);
    sprite.scale.set(1.0, 1.0)
    sprite.anchor.set(0.5, 0.9);
    sprite.x = 0;
    sprite.y = 20;
    cntsprite.addChild(frame);
    cntsprite.addChild(sprite);
    cntsprite._frame = frame
    cntsprite._sprite = sprite

    if(onDown) {
        frame.interactive = true;
        cntsprite.onDown = onDown;
        frame.on('mousedown', cntsprite.onDown);
        frame.on('touchstart', cntsprite.onDown);

    }
    return cntsprite;
}

function getSphereSprite(spritename) {
    var texture = TextureCache[spritename + "sphere.png"];
    var cnt = new Container();
    var sprite = new Sprite(texture);
    sprite.scale.set(0.5, 0.5)
    sprite.anchor.set(0.5, 0.5);
    cnt.addChild(sprite);
    cnt.shpere = sprite;
    return cnt;
}

function mage_clicked() {
    var i;
    for (i=0; i < EARN_SPEED; i++) {
        game.mana0 += game.mage_power_mana0 ;
        game.mana1 += game.mage_power_mana1 + parseFloat(game.lvmana0 / 50) ;
        game.mana2 += game.mage_power_mana2 + parseFloat(game.lvmana1 / 15) ;
    }
    update_mana_levels();

}

function play_game() {
    var i;
    for (i=0; i < EARN_SPEED; i++) {
        game.mana0 += parseFloat(game.lvmana0) / 100.0;
        game.mana1 += parseFloat(game.lvmana1) / 100.0;
        game.mana2 += parseFloat(game.lvmana2) / 100.0;
    }
    update_mana_levels();

}


function gameLoop(){
    frameno +=1;
    //Loop this function 60 times per second
    requestAnimationFrame(gameLoop);
    if (frameno % 3 != 0) return;
    if (game_state) {
        game_state();
    }

    //Render the stage
    renderFrame();
}

init_game();


