/*
 *  Copyright (c) 2025 Huawei Device Co., Ltd.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { BusinessError } from '@kit.BasicServicesKit';
import { AbilityConstant, common } from '@kit.AbilityKit';
import { fileIo, picker } from '@kit.CoreFileKit';
import { image } from '@kit.ImageKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import CommonConstants from '../common/CommonConstants';
import { AppendixBean, imageIndex } from '../viewmodel/MailViewModel';

@Entry
@Component
struct MailHomePage {
  @State crossEndPicture: PixelMap | undefined = undefined;
  @State uiContext: UIContext | undefined = AppStorage.get('uiContext');
  @StorageLink('recipient') recipient: string = '';
  @StorageLink('sender') sender: string = '';
  @StorageLink('subject') subject: string = '';
  @StorageLink('emailContent') emailContent: string = '';
  @StorageLink('isContinuation') isContinuation: string = CommonConstants.NO_CONTINUATION;
  @StorageLink('appendix') appendix: Array<AppendixBean> = [];
  @StorageLink('attachments') attachments: Object = [];
  private context = this.getUIContext().getHostContext() as common.UIAbilityContext;

  onPageShow(): void {
    this.context.setMissionContinueState(AbilityConstant.ContinueState.ACTIVE, (result) => {
      hilog.info(0x0000, 'hilog', 'setMissionContinueState ACTIVE result: ', JSON.stringify(result));
    });
  }

  onBackPress(): void {
    this.context.setMissionContinueState(AbilityConstant.ContinueState.INACTIVE, (result) => {
      hilog.info(0x0000, 'hilog', 'setMissionContinueState INACTIVE result: ', JSON.stringify(result));
    });
  }

  build() {
    Column() {
      this.NavigationTitle();
      this.EmailContent();
    }
    .width('100%')
    .height('100%')
    .padding({ left: 16, right: 16 })
    .backgroundColor('#FFF1F3F5')
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }

  /**
   * Top navigation title bar.
   */
  @Builder
  NavigationTitle() {
    Flex({ alignItems: ItemAlign.Center }) {

      Text($r('app.string.new_email_text'))
        .fontSize(20)
        .fontWeight(700)
        .lineHeight(27)
        .fontColor('rgba(0, 0, 0, 0.9)')
        .flexGrow(1)

      Row() {
        SymbolGlyph($r('sys.symbol.paperplane'))
          .fontSize(24)
          .fontWeight(400)
      }
      .alignItems(VerticalAlign.Center)
      .justifyContent(FlexAlign.Center)
      .width(40)
      .height(40)
      .backgroundColor('rgba(0, 0, 0, 0.05)')
      .borderRadius(40)
      .margin({ right: 8 })

    }
    .height(56)
  }

  @Builder
  EmailContent() {
    Column() {
      // Recipient
      Row() {
        Text($r('app.string.recipient_text'))
          .fontColor($r('app.color.content_text_color'))
          .fontSize($r('app.float.text_font_size'))
          .focusable(true)
        TextInput({ text: this.recipient })
          .type(InputType.Email)
          .width(CommonConstants.PERCENTAGE_MAX)
          .backgroundColor($r('app.color.input_textarea_background'))
          .caretColor($r('app.color.text_cursor_color'))
          .onChange((recipientName: string) => {
            this.recipient = recipientName;
            AppStorage.set('recipient', recipientName);
          })
      }
      .width('100%')
      .height(56)
      .border({
        width: { bottom: 1 },
        color: 'rgba(0, 0, 0, 0.2)'
      })

      // Sender
      Row() {
        Text($r('app.string.sender_text'))
          .fontColor($r('app.color.content_text_color'))
          .fontSize($r('app.float.text_font_size'))
        TextInput({ text: this.sender })
          .type(InputType.Email)
          .width(CommonConstants.PERCENTAGE_MAX)
          .backgroundColor($r('app.color.input_textarea_background'))
          .caretColor($r('app.color.text_cursor_color'))
          .onChange((senderName: string) => {
            this.sender = senderName;
            AppStorage.set('sender', senderName);
          })
      }
      .width('100%')
      .height(56)
      .border({
        width: { bottom: 1 },
        color: 'rgba(0, 0, 0, 0.2)'
      })

      // Subject
      Row() {
        Text($r('app.string.subject_text'))
          .fontColor($r('app.color.content_text_color'))
          .fontSize($r('app.float.text_font_size'))
        TextInput({ text: this.subject })
          .width(CommonConstants.PERCENTAGE_MAX)
          .backgroundColor($r('app.color.input_textarea_background'))
          .caretColor($r('app.color.text_cursor_color'))
          .onChange((subjectInfo: string) => {
            this.subject = subjectInfo;
            AppStorage.set('subject', subjectInfo);
          })
      }
      .width('100%')
      .height(56)
      .border({
        width: { bottom: 1 },
        color: 'rgba(0, 0, 0, 0.2)'
      })

      // Appendix
      if (this.appendix.length > 0) {
        Row() {
          Text($r('app.string.appendix_text'))
            .fontColor($r('app.color.content_text_color'))
            .fontSize($r('app.float.text_font_size'))
          List({ space: CommonConstants.APPENDIX_LIST_SPACE }) {
            ForEach(this.appendix, (item: AppendixBean) => {
              ListItem() {
                Row() {
                  Image(imageIndex[item.iconIndex].icon)
                    .width($r('app.float.appendix_list_item_width'))
                    .aspectRatio(1)
                    .margin({ right: $r('app.float.appendix_list_item_margin_right') })
                  Text(item.fileName)
                    .fontSize($r('app.float.appendix_file_name_font_size'))
                }
              }
            }, (_item: AppendixBean, index: number) => index.toString())
          }
          .listDirection(Axis.Horizontal)
          .alignListItem(ListItemAlign.Center)
          .divider({
            strokeWidth: 1,
            color: Color.Grey,
            startMargin: CommonConstants.APPENDIX_LIST_START_MARGIN,
            endMargin: CommonConstants.APPENDIX_LIST_END_MARGIN
          })
          .scrollBar(BarState.Off)
        }
        .width('100%')
        .height(56)
        .border({
          width: { bottom: 1 },
          color: 'rgba(0, 0, 0, 0.2)'
        })
      }

      // Message content area.
      Row() {
        TextArea({ text: this.emailContent })
          .height(CommonConstants.PERCENTAGE_MAX)
          .padding(0)
          .backgroundColor($r('app.color.input_textarea_background'))
          .borderRadius(0)
          .caretColor($r('app.color.text_cursor_color'))
          .onChange((emailContent: string) => {
            this.emailContent = emailContent;
            AppStorage.set('emailContent', emailContent);
          })
      }
      .layoutWeight(1)
      .alignItems(VerticalAlign.Top)
      .width(CommonConstants.PERCENTAGE_MAX)
      .margin({
        top: $r('app.float.text_image_margin'),
        bottom: $r('app.float.navigation_height')
      })

      // Image display area.
      Row() {
        if (this.crossEndPicture) {
          Image(this.crossEndPicture)
            .height($r('app.float.photo_picture_height'))
            .objectFit(ImageFit.ScaleDown)
            .borderRadius($r('app.float.photo_picture_radius'))
        }
      }
      .width(CommonConstants.PERCENTAGE_MAX)
      .justifyContent(FlexAlign.Start)
    }
    .width('100%')
    .layoutWeight(1)
    .padding({ left: 8, right: 8 })
  }

  /**
   * Rendering pictures.
   *
   * @param buffer Returned image stream of cross-end photographing.
   */
  createPicture(buffer: ArrayBuffer): void {
    let imageSource = image.createImageSource(buffer);
    imageSource.createPixelMap().then((pixelMap) => {
      this.crossEndPicture = pixelMap;
    });
  }

  aboutToDisappear(): void {
    this.crossEndPicture?.release();
  }

  /**
   * Add appendix from file manager.
   *
   * @param fileType
   */
  documentSelect(fileType: number): void {
    try {
      let DocumentSelectOptions = new picker.DocumentSelectOptions();
      let documentPicker = new picker.DocumentViewPicker();
      documentPicker.select(DocumentSelectOptions).then((DocumentSelectResult: Array<string>) => {
        for (let documentSelectResultElement of DocumentSelectResult) {
          let buf = new ArrayBuffer(CommonConstants.FILE_BUFFER_SIZE);
          let readSize = 0;
          let file = fileIo.openSync(documentSelectResultElement, fileIo.OpenMode.READ_ONLY);
          let readLen = fileIo.readSync(file.fd, buf, { offset: readSize });
          // File name is not supported chinese name.
          let fileName = file.name;
          if (!fileName.endsWith(imageIndex[fileType].fileType) ||
          new RegExp("\[\\u4E00-\\u9FA5]|[\\uFE30-\\uFFA0]", "gi").test(fileName)) {
            this.getUIContext().getPromptAction().showToast({
              message: $r('app.string.alert_message_chinese')
            });
            return;
          }
          let destination = fileIo.openSync(this.getUIContext().getHostContext()!
            .filesDir + '/' + fileName, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
          let destinationDistribute = fileIo.openSync(this.getUIContext().getHostContext()!
            .distributedFilesDir + '/' + fileName, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
          while (readLen > 0) {
            readSize += readLen;
            fileIo.writeSync(destination.fd, buf);
            fileIo.writeSync(destinationDistribute.fd, buf);
            readLen = fileIo.readSync(file.fd, buf, { offset: readSize });
          }
          fileIo.closeSync(file);
          fileIo.closeSync(destination);
          fileIo.closeSync(destinationDistribute);
          this.appendix.push({ iconIndex: fileType, fileName: fileName });
        }
        hilog.info(0x0000, 'hilog',
          `DocumentViewPicker.select successfully, DocumentSelectResult uri: ${JSON.stringify(DocumentSelectResult)}`);
      }).catch((error: BusinessError) => {
        hilog.error(0x0000, 'MailHomePage', `have error .Code:${error.code},message: ${error.message}`);
      });
    } catch (error) {
      hilog.error(0x0000, 'MailHomePage', `have error .Code:${error.code},message: ${error.message}`);
    }
  }
}