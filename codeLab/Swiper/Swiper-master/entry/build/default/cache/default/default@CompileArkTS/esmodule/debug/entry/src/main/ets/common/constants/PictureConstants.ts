import type { PictureItem } from '../../viewmodel/PictureItem';
/**
 * Pictures of banner.
 */
export const PICTURE_BANNER: PictureItem[] = [
    { id: '1', name: '怒海', description: '怒海波涛', image: { "id": 16777250, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '2', name: '大山深处', description: '大山深处感人的亲情之歌', image: { "id": 16777251, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '3', name: '荒漠', description: '荒漠的亲情之歌', image: { "id": 16777252, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } }
];
/**
 * pictures of recently play.
 */
export const PICTURE_RECENTLY: PictureItem[] = [
    { id: '1', name: '背影', description: '感人的亲情之歌', image: { "id": 16777264, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '2', name: '废墟之上', description: '勇闯无人之境', image: { "id": 16777265, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '3', name: '无根之人', description: '悬疑国产力作', image: { "id": 16777266, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '4', name: '摩天轮', description: '每个人心中都有一个童话', image: { "id": 16777267, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } }
];
/**
 * pictures of photo.
 */
export const PICTURE_PHOTO: PictureItem[] = [
    { id: '1', name: '蓝·静', description: '用放大镜看世界', image: { "id": 16777262, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '2', name: '花', description: '每个人心中都有一个童话', image: { "id": 16777263, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '3', name: '无根之人', description: '悬疑国产力作', image: { "id": 16777266, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '4', name: '摩天轮', description: '每个人心中都有一个童话', image: { "id": 16777267, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } }
];
/**
 * pictures of newest.
 */
export const PICTURE_LATEST: PictureItem[] = [
    { id: '1', name: '潮·设计大会', description: '国际设计大师分...', image: { "id": 16777253, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '2', name: '食客', description: '味蕾爆炸', image: { "id": 16777254, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '3', name: '绿野仙踪', description: '热带雨林的故事', image: { "id": 16777252, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '4', name: '塔', description: '2021最期待的电...', image: { "id": 16777256, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '5', name: '微缩世界', description: '用放大镜看世界', image: { "id": 16777257, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '6', name: '非常规接触', description: '少年的奇妙之旅', image: { "id": 16777258, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '7', name: '绿野仙踪', description: '热带雨林的故事', image: { "id": 16777259, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '8', name: '塔', description: '用放大镜看世界', image: { "id": 16777260, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } },
    { id: '9', name: '食客', description: '热带雨林的故事', image: { "id": 16777261, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" } }
];
/**
 * type of pictures.
 */
export enum PictureType {
    RECENTLY = "recently",
    PHOTO = "photo",
    LATEST = "latest",
    BANNER = "banner"
}
