import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { CapacitorConsts } from '../constants/capacitor.consts';

export default class CapacitorComp {

    private _platform: string;

    public async init(platform: string): Promise<void>{
        this._platform = platform;

        const { status } = await AdMob.trackingAuthorizationStatus();

        console.log(`Admob status :${status}`);

        AdMob.initialize({
            requestTrackingAuthorization: true,
            testingDevices: [ process.env.TEST_DEVICE_ID_1 ?? "" , process.env.TEST_DEVICE_ID_2 ?? "" ],
            initializeForTesting: true
        });
    }

    public async showBanner(): Promise<void> {
        let adId = "";

        if(this._platform == CapacitorConsts.PLAFORM.ANDROID) {
            adId = process.env.ADMOB_BANNER_ANDROID_ID ?? "";
        } else if (this._platform == CapacitorConsts.PLAFORM.IOS) {
            adId = process.env.ADMOB_BANNER_IOS_ID ?? "";
        }

        const options: BannerAdOptions = {
            adId,
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.TOP_CENTER,
            margin: 0,
            isTesting: true
        }

        await AdMob.showBanner(options);
    }
}