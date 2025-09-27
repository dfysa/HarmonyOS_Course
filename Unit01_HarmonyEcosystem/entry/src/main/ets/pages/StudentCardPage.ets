/**
 *StudentCardPage.ets.ets
 *简要描述：
 *作者：fly
 *日期：27/9/2025
 */
import {StudentCard} from '../pages/components/StudentCard'
@Entry
@Component
export struct StudentCardPage{
build() {


  Navigation() {
    Column()  {


      Row()
      {
        StudentCard()
      }
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