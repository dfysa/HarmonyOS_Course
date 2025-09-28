import type { VideoItem } from '../../viewmodel/VideoItem';
/**
 * Data of video.
 */
export const VIDEO_DATA: VideoItem[] = [
    {
        id: '1',
        src: { "id": 0, "type": 30000, params: ['video1.mp4'], "bundleName": "com.example.swiperarkts", "moduleName": "entry" },
        likesCount: 0,
        isLikes: false,
        commentCount: 102,
        shareTimes: 666
    },
    {
        id: '2',
        src: { "id": 0, "type": 30000, params: ['video2.mp4'], "bundleName": "com.example.swiperarkts", "moduleName": "entry" },
        likesCount: 8654,
        isLikes: true,
        commentCount: 0,
        shareTimes: 0
    }
];
/**
 * state of video play.
 */
export enum PlayState {
    STOP = 0,
    START = 1,
    PAUSE = 2
}
