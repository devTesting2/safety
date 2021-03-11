import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttachmentDTO } from '../_models/AttachmentDTO';
import { EmailDTO } from '../_models/EmailDTO';
import { v4 as uuid } from 'uuid';
import { AnonymousCredential, newPipeline, QueueClient } from '@azure/storage-queue';
import { BlobServiceClient } from '@azure/storage-blob';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Position, PositionData } from '../_models/PositionData';

@Component({
  selector: 'app-position-page',
  templateUrl: './position-page.component.html',
  styleUrls: ['./position-page.component.css']
})
export class PositionPageComponent implements OnInit {

  queueClient: QueueClient;
  attachmentArray: File[];
  applyForm: FormGroup;
  emailSent: boolean = false;
  emailFailed: boolean = false;
  emailDTO: EmailDTO = new EmailDTO();
  
  position: Position | undefined;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.applyForm = this.formBuilder.group({

      applyFullName: ['',Validators.required],
      applyMessage: ['',Validators.required],
      applyEmailAdress: ['',Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")],
      applyAttachment: ['',Validators.nullValidator]
    });
	this.queueClient = new QueueClient(
		environment.connectionString,
		environment.queueName
	);
	this.attachmentArray = [];
	this.emailSent = false;

	let positionData: PositionData;
	let localID = Number(this.route.snapshot.paramMap.get('id'));

	if(localStorage.getItem('language') === 'en')
    {
		positionData = require('../../assets/positionsdataEn.json');
    }
    else
    {
      	positionData = require('../../assets/positionsdataBh.json');
    }
	this.position = positionData.positions.find(x => x.id === localID);
  }

  public get itemFormControl(){
    return this.applyForm.controls;
  }

  async sendApplyForm(){
	try
	{
		this.emailSent = false;
    	if (!this.applyForm.valid)
		{
      		this.applyForm.markAllAsTouched();
      		return;
    	}
		if (this.attachmentArray.length != 0) {
			this.emailDTO.Attachments = [];
			this.attachmentArray.forEach(async (file: File) => {
				let attachment: AttachmentDTO = {
					name: file.name,
					fileType: file.type,
					blobName: uuid(),
					size: file.size,
				};
				this.uploadFile(file, attachment.blobName);
				this.emailDTO.Attachments.push(attachment);
			});
		}
    	this.emailDTO.Identifier = uuid();
    	this.emailDTO.From = environment.email;
    	this.emailDTO.FromName = this.applyForm.get('applyFullName')?.value;
    	this.emailDTO.To = new Array<string>();
    	this.emailDTO.To.push(environment.emailTo);
    	this.emailDTO.ReplyTo = new Array<string>();
    	this.emailDTO.ReplyTo.push(this.applyForm.get('applyEmailAdress')?.value);
    	this.emailDTO.Template = environment.templateInstance;
    	this.emailDTO.Body = this.applyForm.get('applyMessage')?.value;
    	this.emailDTO.Subject = "NASLOV";

    	var objString = JSON.stringify(this.emailDTO);
    	await this.queueClient.sendMessage(btoa(objString));
    	this.applyForm.reset();
		
		this.emailSent = true;
    	this.attachmentArray = [];
	}
	catch (error)
	{
		this.emailFailed = true;
		this.emailSent = false;
		this.attachmentArray = [];
	}
	setTimeout(()=>{
		 this.emailSent = false;
		this.emailFailed = false;
	}, 3000);
  }

  	async uploadFile(file: File, blobname: string) {
		const pipeline = newPipeline(new AnonymousCredential(), {
			retryOptions: {
				maxTries: 4
			},
			userAgentOptions: {
				userAgentPrefix: 'AdvancedSample V1.0.0'
			},
			keepAliveOptions: {
				enable: false,
			},
		});
		const blobServiceClient = new BlobServiceClient(
			environment.connectionStringAttachment,
			pipeline
		);
		const containerClient = blobServiceClient.getContainerClient(environment.attachmentContainerName);
		await containerClient.uploadBlockBlob(blobname, file, file.size);
	}

	uploadfiles(files: any) {
    
    for (let index = 0; index < files.length; index++) {
			this.attachmentArray.push(files[index]);
    	}

		console.log(this.attachmentArray.length);
	}

	deleteAttachment(index) {
		this.attachmentArray.splice(index, 1);

		console.log(this.attachmentArray.length);
	}
}