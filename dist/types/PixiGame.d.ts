/**
 * @file Declares the main pixi game class, which includes PIXI-specific methods and properties.
 */
import { GameSprite, CollisionShapeType } from "./Sprite";
import { Game, gameDefaultConfig, ConfigManager } from "emath.js/game";
import type { GameConfigOptions } from "emath.js/game";
import type { Graphics, Sprite } from "pixi.js";
import type { Application } from "pixi.js";
/** The configuration options for the game. */
interface PixiGameConfig extends GameConfigOptions {
    /** The PIXI-specific config */
    pixi: {
        /** The PIXI app to use for the game. */
        app: Application | null;
    };
}
/** The default configuration for the game. */
declare const pixiGameDefaultConfig: PixiGameConfig & typeof gameDefaultConfig;
/**
 * Represents a game instance with PIXI-specific methods and properties.
 * Uses PIXI.js time-based game loop.
 * @deprecated This class is outside the scope of eMath.js and will be moved to a separate package in the future.
 */
declare class PixiGame extends Game {
    protected static configManager: ConfigManager<PixiGameConfig & import("emath.js/game").RequiredDeep<GameConfigOptions>>;
    /** The configuration for the game. */
    config: typeof pixiGameDefaultConfig;
    /** The PIXI-specific properties for the game. */
    PIXI: {
        /** The PIXI app to use for the game. */
        app: Application;
        /** The camera position. */
        camera: {
            /** The x position of the camera. */
            x: number;
            /** The y position of the camera. */
            y: number;
        };
    };
    /**
     * Creates a new instance of the pixiGame class.
     * @param config - The configuration for the game.
     */
    constructor(config?: PixiGameConfig);
    /**
     * Adds a sprite to the game.
     * @param spriteToAdd - The sprite to add.
     * @param collisionShape - The collision shape to use for the sprite.
     * @returns The sprite object.
     */
    addSprite(spriteToAdd: Graphics | Sprite, collisionShape?: CollisionShapeType): GameSprite;
}
export { PixiGame, PixiGameConfig, pixiGameDefaultConfig };
