import { GameObj, KaboomCtx } from "kaboom"
import { PIPE_GAP } from "../constants/game.consts"

export default class GameComp {
    public game(kaboom: KaboomCtx): void {
        scene('game', () => {
            add([
                sprite('bg', {width: width(), height: height()})
            ])

            const player = add([
                sprite('birdy'),
                scale(2),
                pos(80,40),
                area(),
                body()
            ])

            onKeyPress("space", () => {
                playerJump()
            })

            onTouchStart((id, pos) => {
                playerJump()
            })

            onUpdate('pipe', (pipe: GameObj) => {
                pipe.move(-160, 0)

                if(pipe.passed === false && pipe.pos.x < player.pos.x) {
                    pipe.passed = true
                    score += 1
                    scoreText.text = score.toString()
                }
            })

            const producePipes = () => {
                const offset = rand(-70,70)

                add([
                    sprite('pipe'),
                    pos(width(), height()/2 + offset + PIPE_GAP/2),
                    'pipe',
                    scale(2),
                    area(),
                    {passed: false}
                ])

                add([
                    sprite('pipe', { flipY: true }),
                    pos(width(), height()/2 + offset - PIPE_GAP/2),
                    kaboom.origin('botleft'),
                    'pipe',
                    scale(2),
                    area()
                ])
            }

            loop(1.5, () => {
                producePipes()
            })

            function playerJump() {
                play('wooosh')
                player.jump(400)
            }

            let score = 0
            const scoreText = add([
                text(score.toString(), {size: 50})
            ])

            player.collides("pipe", () => {
                go("gameover", score)
            })

            player.onUpdate(() => {
                if (player.pos.y > height() + 30 || player.pos.y < -30) {
                    go("gameover", score)
                }
            })
        })

        let highScore = 0
        scene('gameover', (score) => {
            if(score > highScore) {
                highScore = score
            }
            
            add([
                text(
                    "gameover! \n"
                    + "score: " + score.toString()
                    + "\nhigh score: " + highScore,
                    {size: 36}
                )
            ])

            onKeyPress('space', () => {
                go('game')
            })

            onTouchStart((id, pos) => {
                go('game')
            })
        })

        go('game')
    }
}