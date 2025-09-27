/**
 *CourseModel.ets.ets
 *简要描述：
 *作者：fly
 *日期：27/9/2025
 */
interface GeneratedTypeLiteralInterface_1 {
  hour: number;
  minute: number;
}

export class Course {
  name: string
  teacher: string
  time: string
  location: string
  day: WeekDay
  isFavorite: boolean = false

  constructor(name: string, teacher: string, time: string, location: string, day: WeekDay) {
    this.name = name
    this.teacher = teacher
    this.time = time
    this.location = location
    this.day = day
  }

  // 计算课程时长（分钟）
  get duration(): number {
    const GeneratedDestructArray_1 = this.time.split('-')
    const start = GeneratedDestructArray_1[0];
    const end = GeneratedDestructArray_1[1];
    const startTime = this.parseTime(start)
    const endTime = this.parseTime(end)
    return (endTime.hour - startTime.hour) * 60 + (endTime.minute - startTime.minute)
  }

  cloneWithFavorite(isFavorite: boolean): Course {
    const newCourse = new Course(
      this.name,
      this.teacher,
      this.time,
      this.location,
      this.day
    )
    newCourse.isFavorite = isFavorite
    return newCourse
  }

  private parseTime(timeStr: string): GeneratedTypeLiteralInterface_1 {
    const GeneratedDestructArray_1 = timeStr.split(':').map(Number)
    const hour = GeneratedDestructArray_1[0];
    const minute = GeneratedDestructArray_1[1];
    return { hour, minute }
  }
}

export enum WeekDay {
  MONDAY = '周一',
  TUESDAY = '周二',
  WEDNESDAY = '周三',
  THURSDAY = '周四',
  FRIDAY = '周五',
  SATURDAY = '周六',
  SUNDAY = '周日'
}