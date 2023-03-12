import kaboom, { KaboomCtx } from 'kaboom'
import { CapacitorConsts } from './constants/capacitor.consts';
import CapacitorComp from './components/capacitor.comp';
import AdmobComp from './components/admob.comp';
import * as dotenv from 'dotenv';

export class Main {

    private kaboom: KaboomCtx;

    private _capacitorComp: CapacitorComp;
    private _admobComp: AdmobComp;
    private _platform; string;

    constructor() {
        //new classes
        this._capacitorComp = new CapacitorComp(); //if name ends init.ts I can run the init of class and can attach then
        this._admobComp = new AdmobComp();

        //init all class operations
        this.init();
    }

    public init() {
        dotenv.config();

        this._projectInit();
    }

    //kaboom and if requires other generic init operations
    private _projectInit() {
        this._capacitorComp.init().then((platform: string) => 
        {
            this._platform = platform;
            if(this._platform === CapacitorConsts.PLAFORM.WEB) this._kaboomInit();
            else this._lazyKaboomInit();
        }).then(() => {
            this._admobComp.init(this._platform).then(() => {
                this._admobComp.showBanner();
            });

            this._loadGameAssets();
        })
    }

    //till hide status and navbar we made a dummy waiting
    private _lazyKaboomInit(): void {
        setTimeout(() => {
            this._kaboomInit();
        }, 3000)
    }

    private _kaboomInit(): void{
        this.kaboom = kaboom();
        console.log(`${process.env.PROJECT_NAME} initialization finished.`);
    }

    private async _loadGameAssets(): Promise<void> {
        this.kaboom.loadRoot('./assets/')
        this.kaboom.loadSprite('pipe', 'sprites/pipe.png');
        this.kaboom.loadSprite('bg', 'sprites/bg.png');
        this.kaboom.loadSprite('birdy', 'sprites/birdy.png');
        this.kaboom.loadSound('wooosh', 'sounds/wooosh.mp3');
    }
}