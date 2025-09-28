if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PageVideo_Params {
    videoArray?: Array<VideoItem>;
    index?: number;
    pageShow?: boolean;
}
import type { VideoItem } from '../viewmodel/VideoItem';
import { initializeOnStartup } from "@bundle:com.example.swiperarkts/entry/ets/viewmodel/VideoViewModel";
import { PlayView } from "@bundle:com.example.swiperarkts/entry/ets/view/play/PlayView";
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
class PageVideo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__videoArray = new ObservedPropertyObjectPU(initializeOnStartup(), this, "videoArray");
        this.__index = new ObservedPropertySimplePU(0, this, "index");
        this.__pageShow = new ObservedPropertySimplePU(false, this, "pageShow");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PageVideo_Params) {
        if (params.videoArray !== undefined) {
            this.videoArray = params.videoArray;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.pageShow !== undefined) {
            this.pageShow = params.pageShow;
        }
    }
    updateStateVars(params: PageVideo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__videoArray.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__pageShow.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__videoArray.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__pageShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __videoArray: ObservedPropertyObjectPU<Array<VideoItem>>;
    get videoArray() {
        return this.__videoArray.get();
    }
    set videoArray(newValue: Array<VideoItem>) {
        this.__videoArray.set(newValue);
    }
    private __index: ObservedPropertySimplePU<number>; // video index.
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __pageShow: ObservedPropertySimplePU<boolean>;
    get pageShow() {
        return this.__pageShow.get();
    }
    set pageShow(newValue: boolean) {
        this.__pageShow.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.width(CommonConstants.FULL_WIDTH);
            Swiper.height(CommonConstants.FULL_HEIGHT);
            Swiper.indicator(false);
            Swiper.loop(false);
            Swiper.vertical(true);
            Swiper.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
            Swiper.onChange((index: number) => {
                this.index = index;
            });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number | undefined) => {
                const item = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new PlayView(this, {
                                index: this.__index,
                                pageShow: this.__pageShow,
                                item: item,
                                barPosition: index
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PageVideo.ets", line: 35, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    index: this.index,
                                    pageShow: this.pageShow,
                                    item: item,
                                    barPosition: index
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "PlayView" });
                }
            };
            this.forEachUpdateFunction(elmtId, this.videoArray, forEachItemGenFunction, (item: VideoItem) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
        Column.pop();
    }
    onPageShow(): void {
        this.pageShow = true;
    }
    onPageHide(): void {
        this.pageShow = false;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PageVideo";
    }
}
registerNamedRoute(() => new PageVideo(undefined, {}), "", { bundleName: "com.example.swiperarkts", moduleName: "entry", pagePath: "pages/PageVideo", pageFullPath: "entry/src/main/ets/pages/PageVideo", integratedHsp: "false", moduleType: "followWithHap" });
