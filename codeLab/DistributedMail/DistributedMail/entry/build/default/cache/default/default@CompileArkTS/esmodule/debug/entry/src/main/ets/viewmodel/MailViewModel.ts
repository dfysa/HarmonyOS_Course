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
export interface AppendixBean {
    /**
     * Icon index.
     */
    iconIndex: number;
    /**
     * File name.
     */
    fileName: string;
}
export interface AppendixFile {
    /**
     * Index.
     */
    index: number;
    /**
     * File type.
     */
    fileType: string;
    /**
     * File type icon.
     */
    icon: Resource;
}
export enum FileType {
    /**
     * Txt file.
     */
    TXT = 0,
    /**
     * Doc file.
     */
    DOC = 1,
    /**
     * Pdf file.
     */
    PDF = 2
}
export const imageIndex: Array<AppendixFile> = [
    { index: FileType.TXT, fileType: 'txt', icon: { "id": 16777257, "type": 20000, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" } },
    { index: FileType.DOC, fileType: 'doc', icon: { "id": 16777256, "type": 20000, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" } },
    { index: FileType.PDF, fileType: 'pdf', icon: { "id": 16777259, "type": 20000, params: [], "bundleName": "com.example.distributedmail", "moduleName": "entry" } }
];
