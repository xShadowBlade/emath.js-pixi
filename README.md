# @emath.js/pixi

A collection of utilities for working with [PixiJS](https://www.pixijs.com/). This package is a part of the [emath.js](https://github.com/xShadowBlade/emath.js) project.

Note: This package is considered deprecated and will not be maintained. It is recommended to implement your own utilities for PixiJS or use existing libraries.

## Installation

```bash
npm install @emath.js/pixi
```

## Usage

```js
import { Application } from "pixi.js";
import { PixiGame, GameSprite } from "@emath.js/pixi";

// Create a PixiJS application
const myApp = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
});

// Create a PixiGame instance
const myGame = new PixiGame({
    // Replace with your game settings
    name: {
        title: "My Game",
        id: "my-game",
        version: "0.1.0",
    },
    pixi: {
        app: myApp,
    },
});

// Create a GameSprite instance
const mySprite = (() => {
    // Create the circle sprite
    const circle = new PIXI.Graphics();
    circle.lineStyle(2, 0xFFFFFF); // Set line color and thickness
    circle.drawCircle(0, 0, 50); // Set the radius of the circle
    circle.x = app.screen.width / 2;
    circle.y = app.screen.height / 2;

    // Add the circle to the stage
    return myGame.addSprite(circle, "Circle");
})(),

// Move the camera
myGame.pixi.camera.x = 100;
```

Check out the [documentation](https://xshadowblade.github.io/emath.js/typedoc/modules/pixiGame_PixiGame.html) for more information. (outdated)
