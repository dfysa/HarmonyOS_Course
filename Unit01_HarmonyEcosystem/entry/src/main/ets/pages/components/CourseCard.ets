/**
 *CourseCard.ets.ets
 *简要描述：
 *作者：fly
 *日期：27/9/2025
 */
@Preview
@Component
export struct CourseCard {
  @Prop courseName: string = '鸿蒙开发'
  @Prop teacher: string = 'mqxu'
  @Prop time: string = '2025-09-22 10:00'
  @Prop location: string = '教四319'
  @State isLiked: boolean = true

  build() {
    Column({ space: 8 }) {
      // 课程标题区域
      Row() {
        Text(this.courseName)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .flexGrow(1)

        // 点赞按钮
        Image(this.isLiked ? $r('app.media.heart_filled') : $r('app.media.heart_outline'))
          .width(24)
          .height(24)
          .onClick(() => {
            this.isLiked = !this.isLiked
          })
      }
      .backgroundColor('#ffdddada')
      .width('100%')
      .padding(20)

      // 课程信息区域
      Column({ space: 4 }) {
        InfoRow({ label: '上课教师', value: this.teacher })
        InfoRow({ label: '上课时间', value: this.time })
        InfoRow({ label: '上课地点', value: this.location })
      }
      .alignItems(HorizontalAlign.Start)
    }
    .padding(16)
  }
}

@Component
struct InfoRow {
  @Prop label: string
  @Prop value: string

  build() {
    Row() {
      Text(`${this.label}：`)
        .fontSize(16)
        .fontColor('#666666')

      Text(this.value)
        .fontSize(14)
        .fontColor('#333333')
    }
  }
}