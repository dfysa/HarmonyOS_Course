/**
 *CourseCardPage.ets.ets
 *简要描述：
 *作者：fly
 *日期：27/9/2025
 */
import {CourseCard} from '../pages/components/CourseCard'
@Entry
@Component
export struct CourseCardPage{
  build() {

    Navigation() {
      Row()
      {
        CourseCard()
      }
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