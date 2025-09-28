import type { VideoItem } from './VideoItem';
import { VIDEO_DATA } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/VideoConstants";
/**
 * Init video data.
 */
export function initializeOnStartup(): Array<VideoItem> {
    let videoDataArray: Array<VideoItem> = [];
    VIDEO_DATA.forEach((item: VideoItem) => {
        videoDataArray.push(item);
    });
    return videoDataArray;
}
