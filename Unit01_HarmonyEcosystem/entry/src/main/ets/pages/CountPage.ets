/**
 *CountPage.ets.ets
 *简要描述：
 *作者：fly
 *日期：27/9/2025
 */
@Entry
@Component
export struct CountPage {
  // 定义状态变量
  @State message: string = 'Hello HarmonyOS NEXT'
  @State clickCount: number = 0

  build() {
    Navigation() {
      // 使用Column垂直布局容器
      Column() {
        // 欢迎标题
        Text('欢迎来到鸿蒙世界！')
          .fontSize(28)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FF007DFF')
          .margin({ bottom: 20 })

        // 动态消息显示
        Text(this.message)
          .fontSize(20)
          .fontColor('#FF333333')
          .margin({ bottom: 30 })

        // 点击计数显示
        Text(`你已经点击了 ${this.clickCount} 次`)
          .fontSize(16)
          .fontColor('#FF666666')
          .margin({ bottom: 20 })

        // 交互按钮
        Button('点击我试试')
          .fontSize(18)
          .width(200)
          .height(50)
          .backgroundColor('#FF007DFF')
          .borderRadius(25)
          .onClick(() => {
            // 更新状态，UI会自动刷新
            this.clickCount++

            // 根据点击次数显示不同消息
            if (this.clickCount === 1) {
              this.message = '太棒了！你学会了HarmonyOS开发！'
            } else if (this.clickCount === 5) {
              this.message = '你真是个勤奋的学习者！'
            } else if (this.clickCount === 10) {
              this.message = '恭喜你！已经是HarmonyOS专家了！'
            } else if (this.clickCount > 10) {
              this.message = '继续探索HarmonyOS的奥秘吧！'
            }
          })

        // 重置按钮
        if (this.clickCount > 0) {
          Button('重新开始')
            .fontSize(16)
            .width(120)
            .height(40)
            .backgroundColor('#FFFF9500')
            .borderRadius(20)
            .margin({ top: 20 })
            .onClick(() => {
              this.clickCount = 0
              this.message = 'Hello HarmonyOS NEXT'
            })
        }
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center) // 内容垂直居中
      .alignItems(HorizontalAlign.Center) // 内容水平居中
      .backgroundColor('#FFF5F5F5') // 浅灰色背景
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