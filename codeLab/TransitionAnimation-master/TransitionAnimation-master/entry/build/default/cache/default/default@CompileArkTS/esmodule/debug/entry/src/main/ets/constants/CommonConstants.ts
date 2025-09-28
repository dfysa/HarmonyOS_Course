/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface Route {
    title: ResourceStr;
    to: string;
}
;
export const ROUTES: Route[] = [
    {
        title: { "id": 16777233, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" },
        to: 'NavigationTransition'
    },
    {
        title: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" },
        to: 'CustomNavigationTransition'
    },
    {
        title: { "id": 16777228, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" },
        to: 'ComponentTransition'
    },
    {
        title: { "id": 16777232, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" },
        to: 'ModalTransition'
    },
    {
        title: { "id": 16777234, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" },
        to: 'GeometryTransition'
    },
    {
        title: { "id": 16777231, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" },
        to: 'LongTakeTransition'
    }
];
/**
 * Share transition id.
 */
export const GEOMETRY_TRANSITION_ID: string = 'shareId';
