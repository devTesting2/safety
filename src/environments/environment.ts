// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
  language: 'en',

  connectionString :'BlobEndpoint=https://prodcommunicationsa.blob.core.windows.net/;QueueEndpoint=https://prodcommunicationsa.queue.core.windows.net/;FileEndpoint=https://prodcommunicationsa.file.core.windows.net/;TableEndpoint=https://prodcommunicationsa.table.core.windows.net/;SharedAccessSignature=sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2022-12-31T14:39:02Z&st=2021-03-01T06:39:02Z&spr=https,http&sig=PcKafK2m5ttPz%2FL5WpEFpqyp%2FjAG2aaUPb%2B93Av6ENI%3D',
  connectionStringAttachment : 'https://prodcommunicationsa.blob.core.windows.net/?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2022-12-31T14:39:02Z&st=2021-03-01T06:39:02Z&spr=https,http&sig=PcKafK2m5ttPz%2FL5WpEFpqyp%2FjAG2aaUPb%2B93Av6ENI%3D',

  queueName: 'emailqueue',
  attachmentContainerName: 'attachments',
  from:'',
  fromName:'',
  templateInstance: 0,
  email:'info@devoted.ba',
  emailTo:'almir.tihak.devoted@outlook.com',

  productionUrl:'https://prosafety-dev-company-wapp.azurewebsites.net/position/'      
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
