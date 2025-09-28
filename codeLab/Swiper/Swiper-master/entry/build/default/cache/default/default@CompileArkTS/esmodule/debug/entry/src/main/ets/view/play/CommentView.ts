if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CommentView_Params {
    item?: VideoItem;
}
import type { VideoItem } from '../../viewmodel/VideoItem';
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
/**
 * text style.
 * @param fontSize Font size.
 * @param fonWeight Font weight.
 */
function __Text__textStyle(fontSize: number, fonWeight: number): void {
    Text.fontSize(fontSize);
    Text.fontWeight(fonWeight);
    Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
    Text.textAlign(TextAlign.Center);
}
export class CommentView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__item = new SynchedPropertyNesedObjectPU(params.item, this, "item");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CommentView_Params) {
        this.__item.set(params.item);
    }
    updateStateVars(params: CommentView_Params) {
        this.__item.set(params.item);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__item.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__item.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __item: SynchedPropertyNesedObjectPU<VideoItem>;
    get item() {
        return this.__item.get();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.offset({ x: CommonConstants.OFFSET_COMMENT_X, y: CommonConstants.OFFSET_COMMENT_Y });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            Image.width(CommonConstants.WIDTH_HEAD);
            Image.height(CommonConstants.HEIGHT_HEAD);
            Image.margin({ top: CommonConstants.TOP_HEAD });
            Image.objectFit(ImageFit.Contain);
            Image.border({
                width: CommonConstants.WIDTH_HEAD_BORDER,
                color: Color.White,
                radius: CommonConstants.RADIUS_HEAD
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.item.isLikes ? { "id": 16777270, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } : { "id": 16777269, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            Image.width(CommonConstants.WIDTH_VOTE);
            Image.height(CommonConstants.HEIGHT_COMMENT);
            Image.onClick(() => {
                if (this.item.isLikes) {
                    this.item.likesCount--;
                }
                else {
                    this.item.likesCount++;
                }
                this.item.isLikes = !this.item.isLikes;
            });
            Image.margin({ top: CommonConstants.TOP_IMAGE_VOTE });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.likesCount === 0 ? { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } : (this.item.likesCount.toString()));
            __Text__textStyle(CommonConstants.FONT_SIZE_DESCRIPTION, CommonConstants.FONT_WEIGHT_LIGHT);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777246, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            Image.width(CommonConstants.WIDTH_VOTE);
            Image.height(CommonConstants.HEIGHT_COMMENT);
            Image.margin({ top: CommonConstants.TOP_IMAGE_VOTE });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.commentCount === 0 ? { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } : (this.item.commentCount.toString()));
            __Text__textStyle(CommonConstants.FONT_SIZE_DESCRIPTION, CommonConstants.FONT_WEIGHT_LIGHT);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777268, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            Image.width(CommonConstants.WIDTH_VOTE);
            Image.height(CommonConstants.HEIGHT_COMMENT);
            Image.margin({ top: CommonConstants.TOP_IMAGE_VOTE });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.shareTimes === 0 ? { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } : (this.item.shareTimes.toString()));
            __Text__textStyle(CommonConstants.FONT_SIZE_DESCRIPTION, CommonConstants.FONT_WEIGHT_LIGHT);
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
