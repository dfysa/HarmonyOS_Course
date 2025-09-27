/**
 *MainPage.ets.ets
 *简要描述：
 *作者：fly
 *日期：27/9/2025
 */

@Entry
@Component
export struct MainPage {
  // @State装饰器标识这是一个状态变量，当它发生变化时UI会自动更新
  @State title: string = 'Hello HarmonyOS'

  // build方法定义UI结构
  build() {


    Navigation() {
      Column() {
        Text(this.title)
          .fontSize(24)
          .fontWeight(FontWeight.Bold)

        Button('点击我')
          .onClick(() => {
            // 当状态变量改变时，UI会自动更新
            this.title = '你好，鸿蒙！'
          })
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
    }
    .hideBackButton(false)
    .titleMode(NavigationTitleMode.Mini)
    .width('100%')
    .height('100%')
    .title('MainPage')
    .navBarWidth('100%')
    .navBarPosition(NavBarPosition.Start)


  }
}