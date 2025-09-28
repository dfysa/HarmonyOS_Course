if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LongTakeDetail_Params {
    card?: Card;
    onBack?: () => void;
}
import { TitleBar } from "@bundle:com.huawei.transitionanimation/entry/ets/views/TitleBar";
import type { Card } from './LongTakeTransition';
export class LongTakeDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__card = new SynchedPropertyObjectOneWayPU(params.card, this, "card");
        this.onBack = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LongTakeDetail_Params) {
        if (params.onBack !== undefined) {
            this.onBack = params.onBack;
        }
    }
    updateStateVars(params: LongTakeDetail_Params) {
        this.__card.reset(params.card);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__card.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__card.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __card: SynchedPropertySimpleOneWayPU<Card>;
    get card() {
        return this.__card.get();
    }
    set card(newValue: Card) {
        this.__card.set(newValue);
    }
    private onBack: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.borderRadius(10);
            Column.backgroundColor('#F1F3F5');
            Column.geometryTransition(this.card.id);
            Column.transition(TransitionEffect.OPACITY);
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.padding({
                bottom: 12,
                left: 16,
                right: 16
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TitleBar(this, {
                        title: { "id": 16777230, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" },
                        onBack: () => this.onBack()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/longtaketransition/LongTakeDetail.ets", line: 25, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777230, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" },
                            onBack: () => this.onBack()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777230, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" }
                    });
                }
            }, { name: "TitleBar" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.card.image);
            Image.width('100%');
            Image.objectFit(ImageFit.Auto);
        }, Image);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
