if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SwiperIndex_Params {
    index?: number;
}
import { TopBar } from "@bundle:com.example.swiperarkts/entry/ets/view/common/TopBar";
import { PageAll } from "@bundle:com.example.swiperarkts/entry/ets/view/tabcontent/PageAll";
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
import { PageLive } from "@bundle:com.example.swiperarkts/entry/ets/view/tabcontent/PageLive";
import { PageGame } from "@bundle:com.example.swiperarkts/entry/ets/view/tabcontent/PageGame";
import { PageEntertainment } from "@bundle:com.example.swiperarkts/entry/ets/view/tabcontent/PageEntertainment";
import { PageTV } from "@bundle:com.example.swiperarkts/entry/ets/view/tabcontent/PageTV";
import { PageMovie } from "@bundle:com.example.swiperarkts/entry/ets/view/tabcontent/PageMovie";
class SwiperIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__index = new ObservedPropertySimplePU(0, this, "index");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SwiperIndex_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    updateStateVars(params: SwiperIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // Double binding of index values to achieve linkage effect.
    private __index: ObservedPropertySimplePU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
            Flex.backgroundColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
        }, Flex);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { index: this.__index }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SwiperIndex.ets", line: 36, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            index: this.index
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.index(this.index);
            Swiper.indicator(false);
            Swiper.loop(false);
            Swiper.duration(CommonConstants.DURATION_PAGE);
            Swiper.onChange((index: number) => {
                this.index = index;
            });
        }, Swiper);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageAll(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SwiperIndex.ets", line: 38, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PageAll" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageMovie(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SwiperIndex.ets", line: 39, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PageMovie" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageTV(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SwiperIndex.ets", line: 40, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PageTV" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageEntertainment(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SwiperIndex.ets", line: 41, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PageEntertainment" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageLive(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SwiperIndex.ets", line: 42, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PageLive" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageGame(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SwiperIndex.ets", line: 43, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PageGame" });
        }
        Swiper.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SwiperIndex";
    }
}
registerNamedRoute(() => new SwiperIndex(undefined, {}), "", { bundleName: "com.example.swiperarkts", moduleName: "entry", pagePath: "pages/SwiperIndex", pageFullPath: "entry/src/main/ets/pages/SwiperIndex", integratedHsp: "false", moduleType: "followWithHap" });
