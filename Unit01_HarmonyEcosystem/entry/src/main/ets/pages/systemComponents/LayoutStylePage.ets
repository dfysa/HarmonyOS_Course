import {CoursePage} from '../CoursePage'
@Preview
@Component
export struct LayoutStylePage {
  build() {
    Tabs({ barPosition: BarPosition.Start }) {
      TabContent() {
        CoursePage()
      }
      .tabBar('我的课程表实践')

      TabContent() {
        Column(){

        }


      }
      .tabBar('tab2')

      TabContent() {

      }
      .tabBar('tab3')
    }
    .width('100%')
    .height('100%')
  }
}