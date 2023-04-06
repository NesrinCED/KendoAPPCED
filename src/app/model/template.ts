export class Template {
    templateId:string="";
    name:string;
    language:string;
    content:string;
    createdDate? :Date;
    modifiedDate? : Date;
    
    modifiedBy :string="";
    createdBy: string="";

    projectId : string="";
}
