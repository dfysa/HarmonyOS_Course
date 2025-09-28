import { TopBarItem } from "@bundle:com.example.swiperarkts/entry/ets/viewmodel/TopBarItem";
import { TOP_BAR_DATA } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/TopBarConstants";
/**
 * Init topBar data.
 */
export function initializeOnStartup(): Array<TopBarItem> {
    let tabDataArray: Array<TopBarItem> = [];
    TOP_BAR_DATA.forEach((item: TopBarItem) => {
        tabDataArray.push(new TopBarItem(item.id, item.name));
    });
    return tabDataArray;
}
