if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MailHomePage_Params {
    crossEndPicture?: PixelMap | undefined;
    uiContext?: UIContext | undefined;
    recipient?: string;
    sender?: string;
    subject?: string;
    emailContent?: string;
    isContinuation?: string;
    appendix?: Array<AppendixBean>;
    attachments?: Object;
    context?;
}
import type { BusinessError as BusinessError } from "@ohos:base";
import AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type common from "@ohos:app.ability.common";
import fileIo from "@ohos:file.fs";
import picker from "@ohos:file.picker";
import image from "@ohos:multimedia.image";
import hilog from "@ohos:hilog";
import CommonConstants from "@bundle:com.example.distributedmail/entry/ets/common/CommonConstants";
import { imageIndex } from "@bundle:com.example.distributedmail/entry/ets/viewmodel/MailViewModel";
import type { AppendixBean } from "@bundle:com.example.distributedmail/entry/ets/viewmodel/MailViewModel";
class MailHomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__crossEndPicture = new ObservedPropertyObjectPU(undefined, this, "crossEndPicture");
        this.__uiContext = new ObservedPropertyObjectPU(AppStorage.get('uiContext'), this, "uiContext");
        this.__recipient = this.createStorageLink('recipient', '', "recipient");
        this.__sender = this.createStorageLink('sender', '', "sender");
        this.__subject = this.createStorageLink('subject', '', "subject");
        this.__emailContent = this.createStorageLink('emailContent', '', "emailContent");
        this.__isContinuation = this.createStorageLink('isContinuation', CommonConstants.NO_CONTINUATION, "isContinuation");
        this.__appendix = this.createStorageLink('appendix', [], "appendix");
        this.__attachments = this.createStorageLink('attachments', [], "attachments");
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MailHomePage_Params) {
        if (params.crossEndPicture !== undefined) {
            this.crossEndPicture = params.crossEndPicture;
        }
        if (params.uiContext !== undefined) {
            this.uiContext = params.uiContext;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: MailHomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__crossEndPicture.purgeDependencyOnElmtId(rmElmtId);
        this.__uiContext.purgeDependencyOnElmtId(rmElmtId);
        this.__recipient.purgeDependencyOnElmtId(rmElmtId);
        this.__sender.purgeDependencyOnElmtId(rmElmtId);
        this.__subject.purgeDependencyOnElmtId(rmElmtId);
        this.__emailContent.purgeDependencyOnElmtId(rmElmtId);
        this.__isContinuation.purgeDependencyOnElmtId(rmElmtId);
        this.__appendix.purgeDependencyOnElmtId(rmElmtId);
        this.__attachments.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__crossEndPicture.aboutToBeDeleted();
        this.__uiContext.aboutToBeDeleted();
        this.__recipient.aboutToBeDeleted();
        this.__sender.aboutToBeDeleted();
        this.__subject.aboutToBeDeleted();
        this.__emailContent.aboutToBeDeleted();
        this.__isContinuation.aboutToBeDeleted();
        this.__appendix.aboutToBeDeleted();
        this.__attachments.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __crossEndPicture: ObservedPropertyObjectPU<PixelMap | undefined>;
    get crossEndPicture() {
        return this.__crossEndPicture.get();
    }
    set crossEndPicture(newValue: PixelMap | undefined) {
        this.__crossEndPicture.set(newValue);
    }
    private __uiContext: ObservedPropertyObjectPU<UIContext | undefined>;
    get uiContext() {
        return this.__uiContext.get();
    }
    set uiContext(newValue: UIContext | undefined) {
        this.__uiContext.set(newValue);
    }
    private __recipient: ObservedPropertyAbstractPU<string>;
    get recipient() {
        return this.__recipient.get();
    }
    set recipient(newValue: string) {
        this.__recipient.set(newValue);
    }
    private __sender: ObservedPropertyAbstractPU<string>;
    get sender() {
        return this.__sender.get();
    }
    set sender(newValue: string) {
        this.__sender.set(newValue);
    }
    private __subject: ObservedPropertyAbstractPU<string>;
    get subject() {
        return this.__subject.get();
    }
    set subject(newValue: string) {
        this.__subject.set(newValue);
    }
    private __emailContent: ObservedPropertyAbstractPU<string>;
    get emailContent() {
        return this.__emailContent.get();
    }
    set emailContent(newValue: string) {
        this.__emailContent.set(newValue);
    }
    private __isContinuation: ObservedPropertyAbstractPU<string>;
    get isContinuation() {
        return this.__isContinuation.get();
    }
    set isContinuation(newValue: string) {
        this.__isContinuation.set(newValue);
    }
    private __appendix: ObservedPropertyAbstractPU<Array<AppendixBean>>;
    get appendix() {
        return this.__appendix.get();
    }
    set appendix(newValue: Array<AppendixBean>) {
        this.__appendix.set(newValue);
    }
    private __attachments: ObservedPropertyAbstractPU<Object>;
    get attachments() {
        return this.__attachments.get();
    }
    set attachments(newValue: Object) {
        this.__attachments.set(newValue);
    }
    private context;
    onPageShow(): void {
        this.context.setMissionContinueState(AbilityConstant.ContinueState.ACTIVE, (result) => {
            hilog.info(0x0000, 'hilog', 'setMissionContinueState ACTIVE result: ', JSON.stringify(result));
        });
    }
    onBackPress(): void {
        this.context.setMissionContinueState(AbilityConstant.ContinueState.INACTIVE, (result) => {
            hilog.info(0x0000, 'hilog', 'setMissionContinueState INACTIVE result: ', JSON.stringify(result));
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.padding({ left: 16, right: 16 });
            Column.backgroundColor('#FFF1F3F5');
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Column);
        this.NavigationTitle.bind(this)();
        this.EmailContent.bind(this)();
        Column.pop();
    }
    /**
     * Top navigation title bar.
     */
    NavigationTitle(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ alignItems: ItemAlign.Center });
            Flex.height(56);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontWeight(700);
            Text.lineHeight(27);
            Text.fontColor('rgba(0, 0, 0, 0.9)');
            Text.flexGrow(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
            Row.justifyContent(FlexAlign.Center);
            Row.width(40);
            Row.height(40);
            Row.backgroundColor('rgba(0, 0, 0, 0.05)');
            Row.borderRadius(40);
            Row.margin({ right: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125831535, "type": 40000, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            SymbolGlyph.fontSize(24);
            SymbolGlyph.fontWeight(400);
        }, SymbolGlyph);
        Row.pop();
        Flex.pop();
    }
    EmailContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.layoutWeight(1);
            Column.padding({ left: 8, right: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Recipient
            Row.create();
            // Recipient
            Row.width('100%');
            // Recipient
            Row.height(56);
            // Recipient
            Row.border({
                width: { bottom: 1 },
                color: 'rgba(0, 0, 0, 0.2)'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            Text.fontSize({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            Text.focusable(true);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.recipient });
            TextInput.type(InputType.Email);
            TextInput.width(CommonConstants.PERCENTAGE_MAX);
            TextInput.backgroundColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            TextInput.caretColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            TextInput.onChange((recipientName: string) => {
                this.recipient = recipientName;
                AppStorage.set('recipient', recipientName);
            });
        }, TextInput);
        // Recipient
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Sender
            Row.create();
            // Sender
            Row.width('100%');
            // Sender
            Row.height(56);
            // Sender
            Row.border({
                width: { bottom: 1 },
                color: 'rgba(0, 0, 0, 0.2)'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            Text.fontSize({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.sender });
            TextInput.type(InputType.Email);
            TextInput.width(CommonConstants.PERCENTAGE_MAX);
            TextInput.backgroundColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            TextInput.caretColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            TextInput.onChange((senderName: string) => {
                this.sender = senderName;
                AppStorage.set('sender', senderName);
            });
        }, TextInput);
        // Sender
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Subject
            Row.create();
            // Subject
            Row.width('100%');
            // Subject
            Row.height(56);
            // Subject
            Row.border({
                width: { bottom: 1 },
                color: 'rgba(0, 0, 0, 0.2)'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            Text.fontSize({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.subject });
            TextInput.width(CommonConstants.PERCENTAGE_MAX);
            TextInput.backgroundColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            TextInput.caretColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            TextInput.onChange((subjectInfo: string) => {
                this.subject = subjectInfo;
                AppStorage.set('subject', subjectInfo);
            });
        }, TextInput);
        // Subject
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Appendix
            if (this.appendix.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.height(56);
                        Row.border({
                            width: { bottom: 1 },
                            color: 'rgba(0, 0, 0, 0.2)'
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
                        Text.fontSize({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: CommonConstants.APPENDIX_LIST_SPACE });
                        List.listDirection(Axis.Horizontal);
                        List.alignListItem(ListItemAlign.Center);
                        List.divider({
                            strokeWidth: 1,
                            color: Color.Grey,
                            startMargin: CommonConstants.APPENDIX_LIST_START_MARGIN,
                            endMargin: CommonConstants.APPENDIX_LIST_END_MARGIN
                        });
                        List.scrollBar(BarState.Off);
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create(imageIndex[item.iconIndex].icon);
                                        Image.width({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
                                        Image.aspectRatio(1);
                                        Image.margin({ right: { "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" } });
                                    }, Image);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.fileName);
                                        Text.fontSize({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.appendix, forEachItemGenFunction, (_item: AppendixBean, index: number) => index.toString(), false, true);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                    Row.pop();
                });
            }
            // Message content area.
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Message content area.
            Row.create();
            // Message content area.
            Row.layoutWeight(1);
            // Message content area.
            Row.alignItems(VerticalAlign.Top);
            // Message content area.
            Row.width(CommonConstants.PERCENTAGE_MAX);
            // Message content area.
            Row.margin({
                top: { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" },
                bottom: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ text: this.emailContent });
            TextArea.height(CommonConstants.PERCENTAGE_MAX);
            TextArea.padding(0);
            TextArea.backgroundColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            TextArea.borderRadius(0);
            TextArea.caretColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
            TextArea.onChange((emailContent: string) => {
                this.emailContent = emailContent;
                AppStorage.set('emailContent', emailContent);
            });
        }, TextArea);
        // Message content area.
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Image display area.
            Row.create();
            // Image display area.
            Row.width(CommonConstants.PERCENTAGE_MAX);
            // Image display area.
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.crossEndPicture) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.crossEndPicture);
                        Image.height({ "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
                        Image.objectFit(ImageFit.ScaleDown);
                        Image.borderRadius({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // Image display area.
        Row.pop();
        Column.pop();
    }
    /**
     * Rendering pictures.
     *
     * @param buffer Returned image stream of cross-end photographing.
     */
    createPicture(buffer: ArrayBuffer): void {
        let imageSource = image.createImageSource(buffer);
        imageSource.createPixelMap().then((pixelMap) => {
            this.crossEndPicture = pixelMap;
        });
    }
    aboutToDisappear(): void {
        this.crossEndPicture?.release();
    }
    /**
     * Add appendix from file manager.
     *
     * @param fileType
     */
    documentSelect(fileType: number): void {
        try {
            let DocumentSelectOptions = new picker.DocumentSelectOptions();
            let documentPicker = new picker.DocumentViewPicker();
            documentPicker.select(DocumentSelectOptions).then((DocumentSelectResult: Array<string>) => {
                for (let documentSelectResultElement of DocumentSelectResult) {
                    let buf = new ArrayBuffer(CommonConstants.FILE_BUFFER_SIZE);
                    let readSize = 0;
                    let file = fileIo.openSync(documentSelectResultElement, fileIo.OpenMode.READ_ONLY);
                    let readLen = fileIo.readSync(file.fd, buf, { offset: readSize });
                    // File name is not supported chinese name.
                    let fileName = file.name;
                    if (!fileName.endsWith(imageIndex[fileType].fileType) ||
                        new RegExp("\[\\u4E00-\\u9FA5]|[\\uFE30-\\uFFA0]", "gi").test(fileName)) {
                        this.getUIContext().getPromptAction().showToast({
                            message: { "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" }
                        });
                        return;
                    }
                    let destination = fileIo.openSync(this.getUIContext().getHostContext()!
                        .filesDir + '/' + fileName, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
                    let destinationDistribute = fileIo.openSync(this.getUIContext().getHostContext()!
                        .distributedFilesDir + '/' + fileName, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
                    while (readLen > 0) {
                        readSize += readLen;
                        fileIo.writeSync(destination.fd, buf);
                        fileIo.writeSync(destinationDistribute.fd, buf);
                        readLen = fileIo.readSync(file.fd, buf, { offset: readSize });
                    }
                    fileIo.closeSync(file);
                    fileIo.closeSync(destination);
                    fileIo.closeSync(destinationDistribute);
                    this.appendix.push({ iconIndex: fileType, fileName: fileName });
                }
                hilog.info(0x0000, 'hilog', `DocumentViewPicker.select successfully, DocumentSelectResult uri: ${JSON.stringify(DocumentSelectResult)}`);
            }).catch((error: BusinessError) => {
                hilog.error(0x0000, 'MailHomePage', `have error .Code:${error.code},message: ${error.message}`);
            });
        }
        catch (error) {
            hilog.error(0x0000, 'MailHomePage', `have error .Code:${error.code},message: ${error.message}`);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MailHomePage";
    }
}
registerNamedRoute(() => new MailHomePage(undefined, {}), "", { bundleName: "com.example.distributedmail", moduleName: "entry", pagePath: "pages/MailHomePage", pageFullPath: "entry/src/main/ets/pages/MailHomePage", integratedHsp: "false", moduleType: "followWithHap" });
