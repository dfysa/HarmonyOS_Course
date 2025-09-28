import type commonType from "@ohos:data.commonType";
export class MailInfoManager {
    private recipient: string | undefined;
    private sender: string | undefined;
    private subject: string | undefined;
    private emailContent: string | undefined;
    private attachments: commonType.Assets | undefined;
    constructor(recipient: string | undefined, sender: string | undefined, subject: string | undefined, emailContent: string | undefined, attachments: commonType.Assets | undefined) {
        this.recipient = recipient;
        this.sender = sender;
        this.subject = subject;
        this.emailContent = emailContent;
        this.attachments = attachments;
    }
    flatAssets(): object {
        let obj: object = this;
        if (!this.attachments) {
            return obj;
        }
        for (let i = 0; i < this.attachments.length; i++) {
            obj[`attachments${i}`] = this.attachments[i];
        }
        return obj;
    }
    getRecipient(): string | undefined {
        return this.recipient;
    }
    setRecipient(value: string | undefined) {
        this.recipient = value;
    }
    getSender(): string | undefined {
        return this.sender;
    }
    setSender(value: string | undefined) {
        this.sender = value;
    }
    getSubject(): string | undefined {
        return this.subject;
    }
    setSubject(value: string | undefined) {
        this.subject = value;
    }
    getEmailContent(): string | undefined {
        return this.emailContent;
    }
    setEmailContent(value: string | undefined) {
        this.emailContent = value;
    }
    getAttachments(): commonType.Assets | undefined {
        return this.attachments;
    }
    setAttachments(value: commonType.Assets) {
        this.attachments = value;
    }
}
