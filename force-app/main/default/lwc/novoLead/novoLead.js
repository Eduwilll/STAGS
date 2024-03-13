import { api } from "lwc";

import LightningModal from 'lightning/modal';
import getLeadRecordTypeIdByName from '@salesforce/apex/LeadController.getLeadRecordTypeIdByName';
export default class NovoLead extends LightningModal {
    selectedRecordType = 'Pessoa Física';
    selectedRecordTypeId;
    selectRecordFisico = false;
    selectRecordJuridico = false;
    selectRecord = true;
    recordTypeOptions = [
        { label: 'Pessoa Física', value: 'Pessoa Física' },
        { label: 'Pessoa Jurídica', value: 'Pessoa Juridica' }
    ];
    
    handleRecordTypeChange(event) {
        this.selectedRecordType = event.detail.value;   
       

    }

    navigateToLead() {
        // Conditionally set the boolean variables based on the selected record type
        if (this.selectedRecordType === 'Pessoa Física') {
            this.selectRecordFisico = true;
            this.selectRecordJuridico = false;
            this.selectRecord = false;

        } else if (this.selectedRecordType === 'Pessoa Juridica') {
            this.selectRecord = false;
            this.selectRecordFisico = false;
            this.selectRecordJuridico = true;

        }
        getLeadRecordTypeIdByName({ recordTypeName: this.selectedRecordType })
        .then((result) => {
            console.log(`thenCatchApproach result => ${result}.`);
            this.selectedRecordTypeId = result;
          })
          .catch((error) => {
            console.log(`thenCatchApproach error => ${error}.`);
          })
          .finally(() => {
            console.log('thenCatchApproach done.');
          })
    }

  
    closeModal() {
        this.close('okay');
    }
    
}
