if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TitleBar_Params {
    title?: ResourceStr;
    navPageInfos?: NavPathStack;
    onBack?: () => void;
}
export class TitleBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title = new SynchedPropertyObjectOneWayPU(params.title, this, "title");
        this.__navPageInfos = this.initializeConsume("navPageInfos", "navPageInfos");
        this.onBack = () => { this.navPageInfos.pop(); };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TitleBar_Params) {
        if (params.title === undefined) {
            this.__title.set('');
        }
        if (params.onBack !== undefined) {
            this.onBack = params.onBack;
        }
    }
    updateStateVars(params: TitleBar_Params) {
        this.__title.reset(params.title);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__navPageInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__navPageInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<ResourceStr>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: ResourceStr) {
        this.__title.set(newValue);
    }
    private __navPageInfos: ObservedPropertyAbstractPU<NavPathStack>;
    get navPageInfos() {
        return this.__navPageInfos.get();
    }
    set navPageInfos(newValue: NavPathStack) {
        this.__navPageInfos.set(newValue);
    }
    private onBack: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.width('100%');
            Row.height(56);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(40);
            Column.height(40);
            Column.margin({ right: 8 });
            Column.borderRadius('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor({ "id": 125831008, "type": 10001, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" });
            Column.onClick(() => {
                this.onBack();
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125832663, "type": 40000, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" });
            SymbolGlyph.fontSize(24);
            SymbolGlyph.fontWeight(FontWeight.Normal);
        }, SymbolGlyph);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.width('100%');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
