// CoursePage.ets
import { Course, WeekDay } from "../model/CourseModel"
import { CaCourseCard } from "./components/CaCourseCard"

@Entry
@Component
export struct CoursePage {
  @State currentDay: WeekDay = WeekDay.MONDAY
  @State courses: Course[] = [
    new Course('高等数学', '张教授', '08:00-09:40', '教学楼A201', WeekDay.MONDAY),
    new Course('大学英语', '李老师', '10:00-11:40', '外语楼305', WeekDay.MONDAY),
    new Course('计算机基础', '王教授', '14:00-15:40', '计算机中心101', WeekDay.TUESDAY),
    new Course('体育', '赵教练', '08:00-09:40', '体育场', WeekDay.WEDNESDAY),
    new Course('数据结构', '刘教授', '10:00-11:40', '计算机中心203', WeekDay.THURSDAY),
    new Course('算法设计', '陈教授', '14:00-15:40', '计算机中心205', WeekDay.FRIDAY),
  ]

  // 获取当天课程总时长（复用Course类的duration属性）
  private getTodayTotalDuration(): number {
    return this.courses
      .filter(course => course.day === this.currentDay)
      .reduce((total, course) => total + course.duration, 0)
  }

  // 格式化时长为"X小时Y分钟"
  private formatDuration(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return hours > 0 ? `${hours}小时${minutes}分钟` : `${minutes}分钟`
  }

  // 获取当天收藏课程数量
  private getTodayFavoriteCount(): number {
    return this.courses.filter(course =>
    course.day === this.currentDay && course.isFavorite
    ).length
  }

  build() {
    Column() {
      // 标题行
      Row() {
        Text('我的课程表')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)
          .layoutWeight(1)
          .textAlign(TextAlign.Start)

        Text(this.currentDay.toString())
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .textAlign(TextAlign.End)
          .fontColor(Color.White)
      }
      .padding(16)
      .width('100%')
      .backgroundColor('#007DFF')
      .justifyContent(FlexAlign.SpaceBetween)

      // 星期选择行
      List({ space: 8, initialIndex: 0 }) {
        ForEach(Object.values(WeekDay), (day: WeekDay) => {
          ListItem() {
            Button(day.toString(), {
              type: ButtonType.Normal,
              stateEffect: this.currentDay === day
            })
              .borderRadius(20)
              .backgroundColor(this.currentDay === day ? '#007DFF' : Color.White)
              .fontColor(this.currentDay === day ? Color.White : Color.Black)
              .fontSize(14)
              .width(72) // 建议宽度
              .height(36) // 建议高度
              .onClick(() => {
                this.currentDay = day
              })
          }
          .width(80) // ListItem需要明确宽度
        })
      }
      .listDirection(Axis.Horizontal) // 设置为横向滚动
      .width('100%')
      .height(56) // 列表总高度
      .padding(8)
      .margin({ bottom: 12 })
      .backgroundColor(Color.White)

      // 统计信息行
      Row() {
        // 今日课程数量
        Column() {
          Text(this.courses.filter(c => c.day === this.currentDay).length.toString())
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#007DFF')
          Text('今日课程').fontSize(12).fontColor('#666666')
        }
        .padding(8).flexGrow(1).alignItems(HorizontalAlign.Center)

        // 当天收藏课程数量
        Column() {
          Text(this.getTodayFavoriteCount().toString())
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FF9500')
          Text('收藏课程').fontSize(12).fontColor('#666666')
        }
        .padding(8).flexGrow(1).alignItems(HorizontalAlign.Center)

        // 当天课程总时长
        Column() {
          Text(this.formatDuration(this.getTodayTotalDuration()))
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#34C759')
          Text('总时长').fontSize(12).fontColor('#666666')
        }
        .padding(8).flexGrow(1).alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .padding(8)
      .backgroundColor(Color.White)
      .margin({ bottom: 12 })

      // 课程列表
      Scroll() {
        Column() {
          ForEach(this.courses.filter(course => course.day === this.currentDay),
            (course: Course) => {
              // 使用课程ID或唯一标识代替索引
              CaCourseCard({
                courseName: course.name,
                teacher: course.teacher,
                time: course.time,
                location: course.location,
                isLiked: course.isFavorite,
                onLikedChange: (isLiked: boolean) => {
                  this.courses = this.courses.map(c =>
                  c === course ? c.cloneWithFavorite(isLiked) : c
                  )
                }
              })
            }
          )
        }
        .padding(16)
        .width('100%')
      }
    }
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
}