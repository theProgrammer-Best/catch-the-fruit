namespace SpriteKind {
    export const Healthy = SpriteKind.create()
    export const Unhealthy = SpriteKind.create()
    export const StatusBar = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.score() > 2) {
        info.changeScoreBy(-3)
        info.changeLifeBy(1)
    } else {
        textSprite.setText("Not enough points")
        pause(1000)
        textSprite.setText("")
    }
})
sprites.onOverlap(SpriteKind.Unhealthy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy()
    num += 1
    if (num > 1) {
        num = 0
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Unhealthy, function (sprite, otherSprite) {
    otherSprite.ay = 0
    otherSprite.vy = 0
    info.changeLifeBy(-1)
    pause(100)
    otherSprite.destroy()
})
info.onLifeZero(function () {
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Healthy, function (sprite, otherSprite) {
    otherSprite.ay = 0
    otherSprite.vy = 0
    info.changeScoreBy(1)
    pause(100)
    otherSprite.destroy()
    pause(10)
    if (info.score() > info.highScore()) {
        game.over(true)
    }
})
sprites.onOverlap(SpriteKind.Healthy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeLifeBy(-1)
})
let Foods: Sprite = null
let item = 0
let num = 0
let textSprite: TextSprite = null
game.setGameOverEffect(false, effects.dissolve)
let mySprite = sprites.create(img`
    eee.......................eee
    eee.......................eee
    4ee.......................eee
    e4ee.....................ee4e
    .e4e.....................e4e.
    .ee4e...................e4ee.
    ..ee4e.................eeee..
    ..eeeee...............eeeee..
    ...eeeee.............e4eee...
    ....eeeeee.........ee4eee....
    .....44444eeeeeeeeee4eee.....
    .......eee44444eeee4ee.......
    .........eeeeee4444e.........
    `, SpriteKind.Player)
let floor = sprites.create(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `, SpriteKind.Projectile)
game.splash("Press B to convert points", "to lives")
game.splash("use the left/right buttons", "to move")
game.splash("dodge the candy, and", "collect the fruit")
controller.moveSprite(mySprite, 125, 0)
textSprite = textsprite.create("")
textSprite.setPosition(35, 10)
mySprite.setStayInScreen(true)
mySprite.y = 110
floor.y = 161
forever(function () {
    item = randint(0, 5)
    if (item < 1) {
        Foods = sprites.create(img`
            7 2 2 2 f 2 2 2 2 2 2 f 2 2 2 2 2 2 7 
            7 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 7 
            7 2 f 2 2 2 2 f 2 2 2 2 2 f 2 2 2 2 7 
            7 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 7 
            . 7 2 2 2 2 2 2 2 2 2 2 2 2 2 f 2 7 . 
            . 7 2 2 2 f 2 2 2 f 2 2 2 2 2 2 2 7 . 
            . . 7 2 2 2 2 2 2 2 2 2 2 2 2 2 7 . . 
            . . . 7 7 2 2 2 2 2 2 2 2 2 7 7 . . . 
            . . . . . 7 7 7 7 7 7 7 7 7 . . . . . 
            `, SpriteKind.Healthy)
    } else if (item == 1) {
        Foods = sprites.create(img`
            . . . . . . . 7 . . . . . . . 
            . . . . . . 7 7 7 . . . . . . 
            . . . . 4 4 4 4 4 4 4 . . . . 
            . . 4 4 4 4 4 4 4 4 4 4 4 . . 
            . 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
            . 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
            . 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
            . 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
            . . 4 4 4 4 4 4 4 4 4 4 4 . . 
            . . . . 4 4 4 4 4 4 4 . . . . 
            . . . . . . e e e . . . . . . 
            `, SpriteKind.Healthy)
    } else if (item == 2) {
        Foods = sprites.create(img`
            .....................
            .....................
            .............e.......
            ............ee.......
            ............55.......
            ...........5555......
            ...........5555......
            ..........55555......
            .........555555......
            .........555555......
            ........5555555......
            ........5555555......
            .......5555555.......
            .....55555555........
            ..5555555555.........
            5555555555...........
            ..555................
            .....................
            .....................
            .....................
            .....................
            `, SpriteKind.Healthy)
    } else if (item == 3) {
        Foods = sprites.create(img`
            . 1 . . . . 1 1 1 1 1 1 1 . . . . 1 
            . 1 1 . . 1 1 2 2 2 2 2 1 1 . . 1 1 
            . . 1 1 . 1 2 2 2 2 2 2 2 1 . 1 1 . 
            . . . 1 1 1 2 2 2 2 2 2 2 1 1 1 . . 
            . . . 1 1 1 2 2 2 2 2 2 2 1 1 1 . . 
            . . 1 1 . 1 2 2 2 2 2 2 2 1 . 1 1 . 
            . 1 1 . . 1 2 2 2 2 2 2 2 1 . . 1 1 
            . 1 . . . 1 1 2 2 2 2 2 1 1 . . . 1 
            . . . . . . 1 1 1 1 1 1 1 . . . . . 
            `, SpriteKind.Unhealthy)
    } else if (item == 4) {
        Foods = sprites.create(img`
            . 1 . . . . 1 1 1 1 1 1 1 . . . . 1 
            . 1 1 . . 1 1 7 7 7 7 7 1 1 . . 1 1 
            . . 1 1 . 1 7 7 7 7 7 7 7 1 . 1 1 . 
            . . . 1 1 1 7 7 7 7 7 7 7 1 1 1 . . 
            . . . 1 1 1 7 7 7 7 7 7 7 1 1 1 . . 
            . . 1 1 . 1 7 7 7 7 7 7 7 1 . 1 1 . 
            . 1 1 . . 1 7 7 7 7 7 7 7 1 . . 1 1 
            . 1 . . . 1 1 7 7 7 7 7 1 1 . . . 1 
            . . . . . . 1 1 1 1 1 1 1 . . . . . 
            `, SpriteKind.Unhealthy)
    } else {
        Foods = sprites.create(img`
            ...88888888...
            ..8888888888..
            .888888888888.
            88888888888888
            88888888888888
            88888888888888
            88888888888888
            88888888888888
            88888888888888
            88888888888888
            .888888888888.
            ..8888888888..
            ...88888888...
            .....1111.....
            .....1111.....
            .....1111.....
            .....1111.....
            .....1111.....
            .....1111.....
            .....1111.....
            .....1111.....
            .....1111.....
            `, SpriteKind.Unhealthy)
    }
    Foods.setPosition(randint(10, 150), 11)
    Foods.ay = 125
    pause(randint(1000, 2500))
})
