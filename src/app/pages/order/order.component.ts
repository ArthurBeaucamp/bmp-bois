import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

interface TemplateParams {
  [key: string]: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  constructor(private messageService: MessageService) {}

  orderForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    addressNumberAndStreet: new FormControl('', Validators.required),
    addressCity: new FormControl('', Validators.required),
    addressPostalCode: new FormControl('', Validators.required),
    addressCountry: new FormControl('', Validators.required),
    budget: new FormControl('Moins de 1000€', Validators.required),
    message: new FormControl('', Validators.required)
  });

  budgetLevels = [
    { key: 'level1', label: 'Moins de 1000€' },
    { key: 'level2', label: 'Entre 1000€ et 5000€' },
    { key: 'level3', label: 'Plus de 5000€' }
  ];

  isLoading = false;
  isSubmitted = false;

  sendEmail() {
    this.isLoading = true;
    this.isSubmitted = true;

    if (this.orderForm.status === 'INVALID') {
      this.isLoading = false;
      this.messageService.add({
        severity: 'warn',
        summary: "Erreur d'envoi",
        detail: 'Veuillez remplir correctement tous les champs'
      });

      return;
    }

    const templateParams: TemplateParams = {
      firstName: this.orderForm.get('firstName')?.value,
      lastName: this.orderForm.get('lastName')?.value,
      mail: this.orderForm.get('email')?.value,
      addressNumberAndStreet: this.orderForm.get('addressNumberAndStreet')
        ?.value,
      addressCity: this.orderForm.get('addressCity')?.value,
      addressPostalCode: this.orderForm.get('addressPostalCode')?.value,
      addressCountry: this.orderForm.get('addressCountry')?.value,
      budget: this.orderForm.get('budget')?.value,
      message: this.orderForm.get('message')?.value
    };

    emailjs
      .send(
        environment.emailjsServiceId,
        environment.emailjsTemplateId,
        templateParams,
        environment.emailjsPublicKey
      )
      .then(
        (result: EmailJSResponseStatus) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Envoi réussi',
            detail: 'Votre mail à bien été envoyé'
          });
        },
        (error) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            summary: "Erreur d'envoi",
            detail:
              "Erreur lors de l'envoi de votre mail veuillez l'envoyer manuellement"
          });
        }
      );
  }
}
