import kaboom, { GameObj, KaboomCtx } from 'kaboom'
import { CapacitorConsts } from './constants/capacitor.consts'
import CapacitorComp from './components/capacitor.comp'
import AdmobComp from './components/admob.comp'
import * as dotenv from 'dotenv'
import GameComp from './components/game.comp'

export class Main {

    private kaboom: KaboomCtx

    private _capacitorComp: CapacitorComp
    private _admobComp: AdmobComp
    private _gameComp: GameComp

    private _platform: string

    constructor() {
        //new classes
        this._capacitorComp = new CapacitorComp() //if name ends init.ts I can run the init of class and can attach then
        this._admobComp = new AdmobComp()
        this._gameComp = new GameComp()

        //init all class operations
        this.init()
    }

    public init() {
        dotenv.config()

        this._projectInit()
    }

    //kaboom and if requires other generic init operations
    private _projectInit() {
        this._capacitorComp.init().then((platform: string) => 
        {
            this._platform = platform
            if(this._platform === CapacitorConsts.PLAFORM.WEB) this._kaboomInit()
            else this._lazyKaboomInit()
        }).then(() => {
            this._admobComp.init(this._platform).then(() => {
                this._admobComp.showBanner()
            })
        })
    }

    //till hide status and navbar we made a dummy waiting
    private _lazyKaboomInit(): void {
        setTimeout(() => {
            this._kaboomInit()
        }, 3000)
    }

    private _kaboomInit(): void{
        this.kaboom = kaboom()
        console.log(`${process.env.PROJECT_NAME} initialization finished.`)
        this._afterKaboomInit()
    }

    private async _loadGameAssets(): Promise<void> {
        loadRoot('./assets/')
        loadSprite('pipe', 'sprites/pipe.png')
        loadSprite('bg', 'sprites/bg.png')
        loadSprite('birdy', 'sprites/birdy.png')
        loadSound('wooosh', 'sounds/wooosh.mp3')
    }

    private _afterKaboomInit(): void{
        this._loadGameAssets();
        this._gameComp.game(this.kaboom);
    }
}