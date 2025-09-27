
@Entry
@Component
export struct LayoutStylePage {
  build() {
    Tabs({ barPosition: BarPosition.Start }) {
      TabContent() {

      }
      .tabBar('tab1')

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