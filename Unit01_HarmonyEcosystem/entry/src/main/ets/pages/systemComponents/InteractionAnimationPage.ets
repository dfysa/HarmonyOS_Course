import router from '@ohos.router';

interface GeneratedTypeLiteralInterface_2 {
  name: string;
  url: string;
}
@Preview
@Component
export struct InteractionAnimationPage {
  // 定义页面列表数据
  private pageList: Array<GeneratedTypeLiteralInterface_2> = [
    { name: '项目1', url: 'pages/ExplictAnimationPage' },
    // { name: '抽卡动画页面', url: 'pages/TodoCardPage' },
    // { name: '关键帧动画', url: 'pages/KeyframeAnimationPage' },
    // { name: '入场动画', url: 'pages/ProductList' },
    // { name: '堆栈布局页面', url: 'pages/StackLayoutPage' }
  ];

  build() {
    List({ space: 10 }) {
      ForEach(this.pageList, (item : GeneratedTypeLiteralInterface_2) => {
        ListItem() {
          Row() {
            Text(item.name)
              .fontSize(18)
              .fontColor('#000')

            Image($r('app.media.bird8'))
              .width(20)
              .height(20)
              .margin({ left: 10 })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .padding(15)
        }
        .onClick(() => {
          router.pushUrl({ url: item.url });
        })
        .borderRadius(8)
        .backgroundColor('#FFF')
        .shadow({ radius: 4, color: '#888', offsetX: 1, offsetY: 1 })
      })
    }
    .width('100%')
    .height('100%')
    .padding(10)
    .backgroundColor('#F5F5F5')
  }
}