import { LightningElement } from 'lwc';
import LightningModal from 'lightning/modal';
import { NavigationMixin } from 'lightning/navigation';

export default class NovoLead extends LightningModal {
    selectedRecordType = 'PessoaFisica';
    selectRecordFisico = false;
    selectRecordJuridico = false;
    selectRecord = true;
    recordTypeOptions = [
        { label: 'Pessoa Física', value: 'PessoaFisica' },
        { label: 'Pessoa Jurídica', value: 'PessoaJuridica' }
    ];
    
    handleRecordTypeChange(event) {
        this.selectedRecordType = event.detail.value;   
    }


    navigateToLead() {
        // Conditionally set the boolean variables based on the selected record type
        if (this.selectedRecordType === 'PessoaFisica') {
            this.selectRecordFisico = true;
            this.selectRecordJuridico = false;
            this.selectRecord = false;
        } else if (this.selectedRecordType === 'PessoaJuridica') {
            this.selectRecord = false;
            this.selectRecordFisico = false;
            this.selectRecordJuridico = true;
        }

        // Dispatch an event to inform the parent component about the selected record type
        const event = new CustomEvent('selectrecordtype', {
            detail: { recordType: this.selectedRecordType }
        });
        this.dispatchEvent(event);
    }

  
    closeModal() {
        this.close('okay');
    }
    
}
