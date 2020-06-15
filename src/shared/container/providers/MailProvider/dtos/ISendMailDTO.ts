import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseEmailTemplateDTO';

interface IMailContent {
  name: string;
  email: string;
}
export default interface ISendMailDTO {
  to: IMailContent;
  from?: IMailContent;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
