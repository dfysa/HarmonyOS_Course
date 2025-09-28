if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LongTakeTransition_Params {
    showDetailView?: boolean;
    selectedCard?: Card | null;
}
interface CardView_Params {
    card?: Card;
    onCardClick?: (card: Card) => void;
}
import util from "@ohos:util";
import { TitleBar } from "@bundle:com.huawei.transitionanimation/entry/ets/views/TitleBar";
import { LongTakeDetail } from "@bundle:com.huawei.transitionanimation/entry/ets/pages/longtaketransition/LongTakeDetail";
export interface Card {
    id: string;
    image: Resource;
    content: ResourceStr;
}
;
export class CardView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__card = new SynchedPropertyObjectOneWayPU(params.card, this, "card");
        this.onCardClick = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CardView_Params) {
        if (params.onCardClick !== undefined) {
            this.onCardClick = params.onCardClick;
        }
    }
    updateStateVars(params: CardView_Params) {
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
    private onCardClick: (card: Card) => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor(Color.White);
            Column.size({ width: '100%' });
            Column.onClick(() => {
                this.onCardClick(ObservedObject.GetRawObject(this.card));
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.card.image);
            Image.width('100%');
            Image.objectFit(ImageFit.Auto);
            Image.draggable(false);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.card.content);
            Text.fontColor('rgba(0, 0, 0, 0.6)');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
const cardList = Array.from({ length: 20 }, (_: undefined, index) => {
    return {
        id: util.generateRandomUUID(),
        image: { "id": -1, "type": -1, params: [`app.media.img_${(index % 6)}`], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" },
        content: { "id": 16777224, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" }
    } as Card;
});
export class LongTakeTransition extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__showDetailView = new ObservedPropertySimplePU(false, this, "showDetailView");
        this.__selectedCard = new ObservedPropertyObjectPU(null, this, "selectedCard");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LongTakeTransition_Params) {
        if (params.showDetailView !== undefined) {
            this.showDetailView = params.showDetailView;
        }
        if (params.selectedCard !== undefined) {
            this.selectedCard = params.selectedCard;
        }
    }
    updateStateVars(params: LongTakeTransition_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__showDetailView.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCard.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__showDetailView.aboutToBeDeleted();
        this.__selectedCard.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __showDetailView: ObservedPropertySimplePU<boolean>;
    get showDetailView() {
        return this.__showDetailView.get();
    }
    set showDetailView(newValue: boolean) {
        this.__showDetailView.set(newValue);
    }
    private __selectedCard: ObservedPropertyObjectPU<Card | null>;
    get selectedCard() {
        return this.__selectedCard.get();
    }
    set selectedCard(newValue: Card | null) {
        this.__selectedCard.set(newValue);
    }
    onCardClick(card: Card) {
        this.selectedCard = card;
        this.getUIContext().animateTo({ duration: 600 }, () => {
            this.showDetailView = true;
        });
    }
    onDetailViewBack() {
        this.getUIContext().animateTo({ duration: 600 }, () => {
            this.showDetailView = false;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create();
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('100%');
                    Column.padding({
                        left: 16,
                        right: 16
                    });
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TitleBar(this, { title: { "id": 16777231, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/longtaketransition/LongTakeTransition.ets", line: 83, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: { "id": 16777231, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                title: { "id": 16777231, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" }
                            });
                        }
                    }, { name: "TitleBar" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    WaterFlow.create();
                    WaterFlow.columnsTemplate('1fr 1fr');
                    WaterFlow.columnsGap(10);
                    WaterFlow.rowsGap(10);
                }, WaterFlow);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const card = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            FlowItem.create();
                            FlowItem.width('100%');
                            FlowItem.borderRadius(10);
                            FlowItem.clip(true);
                            FlowItem.geometryTransition(card.id);
                        }, FlowItem);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new CardView(this, {
                                        card,
                                        onCardClick: card => { this.onCardClick(card); }
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/longtaketransition/LongTakeTransition.ets", line: 87, col: 17 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            card,
                                            onCardClick: card => { this.onCardClick(card); }
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        card
                                    });
                                }
                            }, { name: "CardView" });
                        }
                        FlowItem.pop();
                    };
                    this.forEachUpdateFunction(elmtId, cardList, forEachItemGenFunction, (card: Card) => card.id, false, false);
                }, ForEach);
                ForEach.pop();
                WaterFlow.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.showDetailView) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new LongTakeDetail(this, {
                                            card: this.selectedCard!,
                                            onBack: () => { this.onDetailViewBack(); }
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/longtaketransition/LongTakeTransition.ets", line: 109, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                card: this.selectedCard!,
                                                onBack: () => { this.onDetailViewBack(); }
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            card: this.selectedCard!
                                        });
                                    }
                                }, { name: "LongTakeDetail" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/longtaketransition/LongTakeTransition" });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor('#F1F3F5');
            NavDestination.onBackPressed(() => {
                if (!this.showDetailView) {
                    return false;
                }
                this.onDetailViewBack();
                return true;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
