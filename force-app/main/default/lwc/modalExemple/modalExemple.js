// ModalPopupLWC.js
import { LightningElement, track } from 'lwc';
import NovoLead from 'c/novoLead';

export default class ModalPopupLWC extends LightningElement {
    @track isModalOpen = false;

    openModal() {
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }

    handleCancelModal() {
        this.isModalOpen = false;
    }

    handleSelectRecordType(event) {
        const selectedRecordType = event.detail.recordType;
        // You can handle the selected record type as needed
        console.log('Selected Record Type:', selectedRecordType);
    }
}
