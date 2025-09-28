import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import AbilityConstant from "@ohos:app.ability.AbilityConstant";
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import type { BusinessError as BusinessError } from "@ohos:base";
import type commonType from "@ohos:data.commonType";
import distributedDataObject from "@ohos:data.distributedDataObject";
import type window from "@ohos:window";
import type { AppendixBean } from '../viewmodel/MailViewModel';
import fileIo from "@ohos:file.fs";
import fileUri from "@ohos:file.fileuri";
import JSON from "@ohos:util.json";
import hilog from "@ohos:hilog";
import { MailInfoManager } from "@bundle:com.example.distributedmail/entry/ets/utils/MailInfoManager";
import CommonConstants from "@bundle:com.example.distributedmail/entry/ets/common/CommonConstants";
const DOMAIN = 0x0000;
let uiContext: UIContext | undefined = undefined;
export default class EntryAbility extends UIAbility {
    private distributedObject: distributedDataObject.DataObject | undefined = undefined;
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        this.permissions();
        try {
            this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
            hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onCreate');
            this.restoreDistributedObject(want, launchParam);
        }
        catch (error) {
            hilog.error(0x0000, 'EntryAbility', `have error .Code:${error.code},message: ${error.message}`);
            return error.code;
        }
    }
    onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        this.permissions();
        hilog.info(0x0000, 'hilog', `Ability onNewWant`);
        this.restoreDistributedObject(want, launchParam);
    }
    /**
     * The peer device receives data.
     * @param want
     * @param launchParam
     * @returns
     */
    async restoreDistributedObject(want: Want, launchParam: AbilityConstant.LaunchParam): Promise<void> {
        this.context.setMissionContinueState(AbilityConstant.ContinueState.INACTIVE, (result) => {
            hilog.info(0x0000, 'hilog', `setMissionContinueState: ${JSON.stringify(result)}`);
        });
        if (launchParam.launchReason !== AbilityConstant.LaunchReason.CONTINUATION) {
            return;
        }
        AppStorage.setOrCreate<string>('isContinuation', CommonConstants.CAN_CONTINUATION);
        AppStorage.setOrCreate<Array<AppendixBean>>('appendix', JSON.parse(want.parameters?.appendix as string) as Array<AppendixBean>);
        // Obtain the session ID of a distributed data object.
        let mailInfoManager: MailInfoManager = new MailInfoManager(undefined, undefined, undefined, undefined, undefined);
        this.distributedObject = distributedDataObject.create(this.context, mailInfoManager);
        // Add a data restored listener.
        try {
            this.distributedObject.on('status', (sessionId: string, networkId: string, status: 'online' | 'offline' | 'restored') => {
                hilog.info(0x0000, 'hilog', 'EntryAbility', 'status changed ' + sessionId + ' ' + status + ' ' + networkId);
                if (status === 'restored') {
                    if (!this.distributedObject) {
                        return;
                    }
                    AppStorage.setOrCreate('recipient', this.distributedObject['recipient']);
                    AppStorage.setOrCreate('sender', this.distributedObject['sender']);
                    AppStorage.setOrCreate('subject', this.distributedObject['subject']);
                    AppStorage.setOrCreate('emailContent', this.distributedObject['emailContent']);
                    AppStorage.setOrCreate('attachments', this.distributedObject['attachments']);
                    let attachments = this.distributedObject['attachments'] as commonType.Assets;
                    hilog.info(0x0000, 'hilog', 'this.distributedObject[attachments] ' + JSON.stringify(this.distributedObject['attachments']));
                    for (const attachment of attachments) {
                        this.fileCopy(attachment);
                    }
                }
            });
            let sessionId: string = want.parameters?.distributedSessionId as string;
            hilog.info(0x0000, 'hilog', 'sessionId' + sessionId);
            this.distributedObject.setSessionId(sessionId);
            this.context.restoreWindowStage(new LocalStorage());
        }
        catch (error) {
            hilog.error(0x0000, 'EntryAbility', `have error .Code:${error.code},message: ${error.message}`);
        }
    }
    onWindowStageRestore(windowStage: window.WindowStage): void {
        hilog.info(0x0000, 'hilog', 'EntryAbility', 'Ability onWindowStageRestore');
        windowStage.loadContent('pages/MailHomePage', (err, data) => {
            if (err.code) {
                hilog.error(0x0000, 'EntryAbility', 'Failed to load the content, ', `Catch err: ${err.code},msg:${err.message}`);
                return;
            }
            hilog.info(0x0000, 'EntryAbility', 'Succeeded in loading the content, ', `Data: ${data}`);
        });
    }
    async onContinue(wantParam: Record<string, Object | undefined>): Promise<AbilityConstant.OnContinueResult> {
        wantParam.appendix = JSON.stringify(AppStorage.get<Array<AppendixBean>>('appendix'));
        try {
            // Generate the session ID of the distributed data object.
            let sessionId: string = distributedDataObject.genSessionId();
            wantParam.distributedSessionId = sessionId;
            let appendix = AppStorage.get<Array<AppendixBean>>('appendix');
            let assets: commonType.Assets = [];
            if (appendix) {
                for (let i = 0; i < appendix.length; i++) {
                    let append = appendix[i];
                    let attachment: commonType.Asset = this.getAssetInfo(append)!;
                    assets.push(attachment);
                }
            }
            let mailInfoManager: MailInfoManager = new MailInfoManager(AppStorage.get('recipient'), AppStorage.get('sender'), AppStorage.get('subject'), AppStorage.get('emailContent'), assets);
            let source = mailInfoManager.flatAssets();
            this.distributedObject = distributedDataObject.create(this.context, source);
            this.distributedObject.setSessionId(sessionId);
            await this.distributedObject.save(wantParam.targetDevice as string).then(() => {
                hilog.info(0x0000, 'hilog', 'onContinue distributedObject save success');
            }).catch((err: BusinessError) => {
                hilog.error(0x0000, 'hilog', `Failed to save. Code:${err.code},message:${err.message}`);
            });
        }
        catch (error) {
            hilog.error(0x0000, 'hilog', 'distributedDataObject failed', `code ${(error as BusinessError).code}`);
        }
        return AbilityConstant.OnContinueResult.AGREE;
    }
    /**
     * Copy distributed files.
     * @param attachmentRecord
     * @param key
     */
    private fileCopy(attachment: commonType.Asset) {
        let filePath: string = this.context.distributedFilesDir + '/' + attachment.name;
        let savePath: string = this.context.filesDir + '/' + attachment.name;
        try {
            if (fileIo.accessSync(filePath)) {
                let saveFile = fileIo.openSync(savePath, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
                let file = fileIo.openSync(filePath, fileIo.OpenMode.READ_WRITE);
                let buf: ArrayBuffer = new ArrayBuffer(CommonConstants.FILE_BUFFER_SIZE);
                let readSize = 0;
                let readLen = fileIo.readSync(file.fd, buf, {
                    offset: readSize
                });
                while (readLen > 0) {
                    readSize += readLen;
                    fileIo.writeSync(saveFile.fd, buf);
                    readLen = fileIo.readSync(file.fd, buf, {
                        offset: readSize
                    });
                }
                fileIo.closeSync(file);
                fileIo.closeSync(saveFile);
                hilog.info(0x0000, 'EntryAbility', attachment.name + 'synchronized successfully.');
            }
        }
        catch (error) {
            hilog.error(0x0000, 'EntryAbility', `have error .Code:${error.code},message: ${error.message}`);
        }
    }
    /**
     * Obtain distributed file asset information.
     * @param append
     * @returns
     */
    private getAssetInfo(append: AppendixBean) {
        try {
            let filePath = uiContext!.getHostContext()!.distributedFilesDir + '/' + append.fileName;
            fileIo.statSync(filePath);
            let uri: string = fileUri.getUriFromPath(filePath);
            let stat = fileIo.statSync(filePath);
            let attachment: commonType.Asset = {
                name: append.fileName,
                uri: uri,
                path: filePath,
                createTime: stat.ctime.toString(),
                modifyTime: stat.ctime.toString(),
                size: stat.size.toString()
            };
            return attachment;
        }
        catch (error) {
            hilog.error(0x0000, 'statSync', `statSync error: ${error.code}  msg:${error.message}`);
            return null;
        }
    }
    onWindowStageCreate(windowStage: window.WindowStage) {
        // Main window is created, set main page for this ability.
        hilog.info(0x0000, 'EntryAbility', 'Ability onWindowStageCreate');
        windowStage.loadContent('pages/MailHomePage', (err, data) => {
            if (err.code) {
                hilog.error(0x0000, 'EntryAbility', 'Failed to load the content, ', `Catch err: ${err}`);
                return;
            }
            hilog.info(0x0000, 'EntryAbility', 'Succeeded in loading the content, ', `Data: ${data}`);
            uiContext = windowStage.getMainWindowSync().getUIContext();
        });
    }
    onWindowStageDestroy() {
        hilog.info(DOMAIN, 'EntryAbility', 'Ability onWindowStageDestroy');
    }
    onForeground() {
        hilog.info(DOMAIN, 'EntryAbility', 'Ability onForeground');
    }
    onBackground() {
        hilog.info(DOMAIN, 'EntryAbility', 'Ability onBackground');
    }
    onDestroy() {
        hilog.info(DOMAIN, 'EntryAbility', 'Ability onDestroy');
    }
    /**
     * Apply for the permission to exchange data between different devices.
     */
    permissions(): void {
        let atManager = abilityAccessCtrl.createAtManager();
        try {
            atManager.requestPermissionsFromUser(this.context, ['ohos.permission.DISTRIBUTED_DATASYNC']).then((data) => {
                hilog.info(0x0000, 'hilog', `Data permissions:${data.permissions}`);
            });
        }
        catch (err) {
            hilog.info(0x0000, 'hilog', `Catch err: ${err}`);
        }
    }
}
