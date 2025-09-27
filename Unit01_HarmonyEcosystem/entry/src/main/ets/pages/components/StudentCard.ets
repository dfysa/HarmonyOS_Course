/**
 *StudentCard.ets.ets
 *简要描述：
 *作者：fly
 *日期：27/9/2025
 */
@Preview
@Component
export struct StudentCard {
  // @Prop装饰器用于接收父组件传递的数据
  @Prop studentName: string = '默认姓名'
  @Prop score: number = 80
  // @State装饰器用于管理组件内部状态
  @State isExpanded: boolean = true

  build() {
    Column() {
      Text(`学生姓名: ${this.studentName}`)
        .fontSize(18)

      Text(`成绩: ${this.score}分`)
        .fontSize(16)
        .fontColor(this.score >= 60 ? Color.Green : Color.Red)

      if (this.isExpanded) {
        Text('更多详细信息...')
          .fontSize(14)
          .margin({ top: 10 })
      }

      Button(this.isExpanded ? '收起' : '展开')
        .onClick(() => {
          // 状态变化会自动触发UI更新
          this.isExpanded = !this.isExpanded
        })
    }
    .padding(16)
    .backgroundColor(Color.White)
    .borderRadius(8)
  }
}