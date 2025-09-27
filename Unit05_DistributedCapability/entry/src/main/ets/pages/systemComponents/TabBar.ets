/**
 * TabBar.ets.ets
 ★简要描述：
 *作者：fly
 *日期：10/9/2025
 */
interface GeneratedTypeLiteralInterface_1 {
  width?: number | string;
  height?: number | string;
}

export interface TabItem {
  title: string
  icon: Resource
  selectedIcon: Resource
  width?: number | string    // Add optional width
  height?: number | string   // Add optional height
  iconSize?: GeneratedTypeLiteralInterface_1
}
@Component
export struct TabBar {
  @Prop selectedIndex: number = 0
  private tabItems: TabItem[] = []
  private onTabClick?: (index: number) => void

  build() {
    Row() {
      ForEach(this.tabItems, (item: TabItem, index: number) => {
        Column() {
          Image(this.selectedIndex === index ? item.selectedIcon : item.icon)
            .width(item.iconSize?.width ?? 22)  // Use custom icon width or default
            .height(item.iconSize?.height ?? 22) // Use custom icon height or default

          Text(item.title)
            .fontSize(10)
            .fontColor(this.selectedIndex === index ? '#007AFF' : '#8E8E93')
            .margin({ top: 5 })
            .fontWeight(this.selectedIndex === index ? FontWeight.Medium : FontWeight.Normal)
        }
        .width(item.width ?? '100%')  // Use custom width or default
        .height(item.height ?? 60)    // Use custom height or default
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
        .padding({ top: 8, bottom: 8 })
        .onClick(() => {
          this.onTabClick?.(index)
        })
      })
    }
    .width('100%')
    .height(60)
    .backgroundColor('#FFFFFF')
    .border({
      width: { top: 0.5 },
      color: '#E5E5EA'
    })
  }
}