import hilog from "@ohos:hilog";
const TAG = 'commonUtils';
export function getResourceString(resource: Resource, context: Context): string {
    let result: string = '';
    try {
        result = context.resourceManager.getStringSync(resource.id);
    }
    catch (e) {
        hilog.error(0x0000, TAG, `[getResourceString]getStringSync failed, error:${JSON.stringify(e)}.`);
    }
    return result;
}
