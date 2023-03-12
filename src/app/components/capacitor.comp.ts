import { Capacitor } from '@capacitor/core';
import { Animation, StatusBar } from '@capacitor/status-bar';
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar';
import { CapacitorConsts } from '../constants/capacitor.consts';

export default class CapacitorComp {

    public async init(): Promise<string>{
        switch(Capacitor.getPlatform()) {
            case CapacitorConsts.PLAFORM.ANDROID: {
                await this._androidInit();
                return CapacitorConsts.PLAFORM.ANDROID;
            }
            case CapacitorConsts.PLAFORM.IOS: {
                await this._iosInit();
                return CapacitorConsts.PLAFORM.IOS;
            }
            case CapacitorConsts.PLAFORM.WEB: {
                await this._webInit();
                return CapacitorConsts.PLAFORM.WEB;
            }
            default: return CapacitorConsts.PLAFORM.WEB;
        }
    }

    private async _androidInit(): Promise<void> {
        await this.hideStatusAndNavBar();
    }

    private async _iosInit(): Promise<void> {
        await this.hideStatusAndNavBar();
    }

    private async _webInit(): Promise<void> {

    }

    private async hideStatusAndNavBar(): Promise<void> {
        await StatusBar.hide({ animation: Animation.None }); //hides top status bar of device
        await NavigationBar.hide(); //hides bottom navigation bar of device
    }
}