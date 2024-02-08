import { LightningElement, track } from 'lwc';
import LightningModal from 'lightning/modal';
import { NavigationMixin } from 'lightning/navigation';

export default class NovoLead extends LightningModal {
    @track selectedRecordType = '';
    @track selectRecordFisico = false;
    @track selectRecordJuridico = false;
    selectRecord = true;
    @track recordTypeOptions = [
        { label: 'Pessoa Fisica', value: 'PessoaFisica' },
        { label: 'Pessoa Juridica', value: 'PessoaJuridica' }
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
        // Dispatch an event to inform the parent component to close the modal
        const event = new CustomEvent('closemodal');
        this.dispatchEvent(event);
    }

    handleCancelModal() {
        // Dispatch an event to inform the parent component to cancel and close the modal
        const event = new CustomEvent('cancelmodal');
        this.dispatchEvent(event);
    }
}
