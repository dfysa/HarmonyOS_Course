import type { PictureItem } from './PictureItem';
import { PICTURE_RECENTLY, PICTURE_PHOTO, PICTURE_LATEST, PICTURE_BANNER } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/PictureConstants";
import { PictureType } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/PictureConstants";
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
/**
 * Initialize picture data according to type.
 *
 * @param initType Init type.
 */
export function initializePictures(initType: string): Array<PictureItem> {
    let imageDataArray: Array<PictureItem> = [];
    switch (initType) {
        case PictureType.BANNER:
            PICTURE_BANNER.forEach((item: PictureItem) => {
                imageDataArray.push(item);
            });
            break;
        case PictureType.RECENTLY:
            PICTURE_RECENTLY.forEach((item: PictureItem) => {
                imageDataArray.push(item);
            });
            break;
        case PictureType.PHOTO:
            PICTURE_PHOTO.forEach((item: PictureItem) => {
                imageDataArray.push(item);
            });
            break;
        case PictureType.LATEST:
            PICTURE_LATEST.forEach((item: PictureItem) => {
                imageDataArray.push(item);
            });
            break;
        default:
            break;
    }
    return imageDataArray;
}
let timerIds: number[] = [];
/**
 * start scheduled task.
 *
 * @param swiperController Controller.
 */
export function startPlay(swiperController: SwiperController): void {
    let timerId = setInterval(() => {
        swiperController.showNext();
    }, CommonConstants.SWIPER_TIME);
    timerIds.push(timerId);
}
/**
 * stop scheduled task.
 */
export function stopPlay(): void {
    timerIds.forEach((item: number) => {
        clearTimeout(item);
    });
}
