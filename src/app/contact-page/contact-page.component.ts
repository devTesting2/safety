import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from '../_services/communication.service';
import { QueueClient } from '@azure/storage-queue';
import { environment } from 'src/environments/environment';
import { EmailDTO } from '../_models/EmailDTO';
import { v4 as uuid } from 'uuid';
import { AnonymousCredential, BlobServiceClient, newPipeline, } from '@azure/storage-blob';

@Component({
	selector: 'app-contact-page',
	templateUrl: './contact-page.component.html',
	styleUrls: ['./contact-page.component.css'],
})

export class ContactPageComponent {
	client: QueueClient = new QueueClient(environment.connectionString);
	title: string;
	emailSent: boolean = false;
	emailFailed: boolean = false;

	attachmentArray: File[];
	contactForm: FormGroup;
	emailDTO: EmailDTO = new EmailDTO();

	constructor(private fb: FormBuilder)
	{
		this.attachmentArray = [];
	}

	ngOnInit() {
		this.contactForm = this.fb.group({
			spanTitle: ['', Validators.required],
			spanFullName: ['', Validators.required],
			spanEmail: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
			spanMessage: ['', Validators.required],
		});
		this.client = new QueueClient(
			environment.connectionString,
			environment.queueName
    );
		this.attachmentArray = [];
		this.emailSent = false;
	}

	get registerFormControl() {
		return this.contactForm.controls;
	}

	async onSubmit() {

	try
	{
		this.emailSent = false;
    	if (!this.contactForm.valid)
		{
      		this.contactForm.markAllAsTouched();
      		return;
    	}
    	this.emailDTO.Identifier = uuid();
    	this.emailDTO.From = environment.email;
    	this.emailDTO.FromName = this.contactForm.get('spanFullName')?.value;
    	this.emailDTO.To = new Array<string>();
    	this.emailDTO.To.push(environment.emailTo);
    	this.emailDTO.ReplyTo = new Array<string>();
    	this.emailDTO.ReplyTo.push(this.contactForm.get('spanEmail')?.value);
    	this.emailDTO.Template = environment.templateInstance;
    	this.emailDTO.Body = this.contactForm.get('spanMessage')?.value;
    	this.emailDTO.Subject = this.contactForm.get('spanTitle')?.value;

    	var objString = JSON.stringify(this.emailDTO);
    	await this.client.sendMessage(btoa(objString));
    	this.contactForm.reset();
		
		this.emailSent = true;
    	this.attachmentArray = [];
	}
	catch (error)
	{
		this.emailFailed = true;
		this.emailSent = false;
	}
	setTimeout(()=>{
		 this.emailSent = false;
		this.emailFailed = false;
	}, 3000);
 }

}
