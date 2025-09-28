if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PlayView_Params {
    isShow?: boolean;
    index?: number;
    pageShow?: boolean;
    item?: VideoItem;
    barPosition?: number;
    playState?: number;
    videoController?: VideoController;
}
import { VideoItem } from "@bundle:com.example.swiperarkts/entry/ets/viewmodel/VideoItem";
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
import { PlayState } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/VideoConstants";
import { NavigationView } from "@bundle:com.example.swiperarkts/entry/ets/view/play/NavigationView";
import { CommentView } from "@bundle:com.example.swiperarkts/entry/ets/view/play/CommentView";
import { DescriptionView } from "@bundle:com.example.swiperarkts/entry/ets/view/play/DescriptionView";
export class PlayView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.isShow = false;
        this.__index = new SynchedPropertySimpleTwoWayPU(params.index, this, "index");
        this.__pageShow = new SynchedPropertySimpleTwoWayPU(params.pageShow, this, "pageShow");
        this.__item = new ObservedPropertyObjectPU(new VideoItem(), this, "item");
        this.barPosition = 0;
        this.__playState = new ObservedPropertySimplePU(PlayState.STOP, this, "playState");
        this.videoController = new VideoController();
        this.setInitiallyProvidedValue(params);
        this.declareWatch("index", this.needPageShow);
        this.declareWatch("pageShow", this.needPageShow);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PlayView_Params) {
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
        if (params.item !== undefined) {
            this.item = params.item;
        }
        if (params.barPosition !== undefined) {
            this.barPosition = params.barPosition;
        }
        if (params.playState !== undefined) {
            this.playState = params.playState;
        }
        if (params.videoController !== undefined) {
            this.videoController = params.videoController;
        }
    }
    updateStateVars(params: PlayView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__pageShow.purgeDependencyOnElmtId(rmElmtId);
        this.__item.purgeDependencyOnElmtId(rmElmtId);
        this.__playState.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        this.__pageShow.aboutToBeDeleted();
        this.__item.aboutToBeDeleted();
        this.__playState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private isShow: boolean;
    // Change the video playing state according to the index and pageShow changes.
    private __index: SynchedPropertySimpleTwoWayPU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __pageShow: SynchedPropertySimpleTwoWayPU<boolean>;
    get pageShow() {
        return this.__pageShow.get();
    }
    set pageShow(newValue: boolean) {
        this.__pageShow.set(newValue);
    }
    private __item: ObservedPropertyObjectPU<VideoItem>;
    get item() {
        return this.__item.get();
    }
    set item(newValue: VideoItem) {
        this.__item.set(newValue);
    }
    private barPosition: number;
    private __playState: ObservedPropertySimplePU<number>;
    get playState() {
        return this.__playState.get();
    }
    set playState(newValue: number) {
        this.__playState.set(newValue);
    }
    private videoController: VideoController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.End });
            Stack.backgroundColor(Color.Black);
            Stack.width(CommonConstants.FULL_WIDTH);
            Stack.height(CommonConstants.FULL_HEIGHT);
            Stack.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Video.create({
                src: this.item.src,
                controller: this.videoController
            });
            Video.controls(false);
            Video.autoPlay(this.playState === PlayState.START ? true : false);
            Video.objectFit(ImageFit.Fill);
            Video.loop(true);
            Video.height(CommonConstants.WIDTH_VIDEO);
            Video.width(CommonConstants.FULL_WIDTH);
            Video.onClick(() => {
                if (this.playState === PlayState.START) {
                    this.playState = PlayState.PAUSE;
                    this.videoController.pause();
                }
                else if (this.playState === PlayState.PAUSE) {
                    this.playState = PlayState.START;
                    this.videoController.start();
                }
            });
        }, Video);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new NavigationView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/play/PlayView.ets", line: 59, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "NavigationView" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CommentView(this, { item: this.item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/play/PlayView.ets", line: 60, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            item: this.item
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        item: this.item
                    });
                }
            }, { name: "CommentView" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DescriptionView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/play/PlayView.ets", line: 61, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "DescriptionView" });
        }
        Stack.pop();
    }
    onPageSwiperShow(): void {
        if (this.playState != PlayState.START) {
            this.playState = PlayState.START;
            this.videoController.start();
        }
    }
    onPageSwiperHide(): void {
        if (this.playState != PlayState.STOP) {
            this.playState = PlayState.STOP;
            this.videoController.stop();
        }
    }
    needPageShow(): void {
        if (this.pageShow === true) {
            if (this.barPosition === this.index) { // Judge whether the index is the same as the current location.
                this.isShow = true;
                this.onPageSwiperShow();
            }
            else {
                if (this.isShow ===
                    true) { // The already visible status is changed to invisible, and the invisible method callback is triggered.
                    this.isShow = false;
                    this.onPageSwiperHide();
                }
            }
        }
        else { // Stop when the page goes back to the background.
            this.isShow = false;
            this.onPageSwiperHide();
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
