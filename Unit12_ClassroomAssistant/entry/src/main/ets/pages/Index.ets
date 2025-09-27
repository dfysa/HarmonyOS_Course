import { TabBar, TabItem } from './systemComponents/TabBar'
import { BasicComponentsPage } from './systemComponents/BasicComponentsPage'
import { LayoutStylePage } from './systemComponents/LayoutStylePage'
import { InteractionAnimationPage } from './systemComponents/InteractionAnimationPage'

@Entry
@Component
struct Index {
  @State currentIndex: number = 0
  private tabItems: TabItem[] = [
    {
      title: '基础学习',
      icon: $r('app.media.tab_index_normal'),
      selectedIcon: $r('app.media.tab_index_selected'),
      width: '30%',
      iconSize: {
        width: 25,
        height: 25
      }
    },
    {
      title: '实践',
      icon: $r('app.media.tab_practise_normal'),
      selectedIcon: $r('app.media.tab_practise_selected'),
      width: '40%',
      height: 70,
      iconSize: {
        width: 25,
        height: 25
      }
    },
    {
      title: '更多',
      icon: $r('app.media.tab_more_normal'),
      selectedIcon: $r('app.media.tab_more_selected'),
      width: '30%',  // Custom width for this tab
      iconSize: {
        width: 25,
        height: 25
      }
    }
  ]
  @Builder
  getPageContent() {
    if (this.currentIndex === 0) {
      BasicComponentsPage()
    } else if (this.currentIndex === 1) {
      LayoutStylePage()
    } else if (this.currentIndex === 2) {
      InteractionAnimationPage()
    } else {
      BasicComponentsPage()
    }
  }

  build() {
    Column() {
      // 内容区域
      Column() {
        this.getPageContent()
      }
      .layoutWeight(1)

      // 底部导航栏
      TabBar({
        tabItems: this.tabItems,
        selectedIndex: this.currentIndex,
        onTabClick: (index: number) => {
          this.currentIndex = index
        }
      })
    }
    .height('100%')
    .backgroundColor('#F2F2F7')
  }
}
