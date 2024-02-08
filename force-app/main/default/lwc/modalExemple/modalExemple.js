// ModalPopupLWC.js
import { LightningElement } from 'lwc';
import NovoLead from 'c/novoLead';

export default class ModalPopupLWC extends LightningElement {
    isModalOpen = false;
    async openModal() {
        this.isModalOpen = false;

        const result = await NovoLead.open({
            // `label` is not included here in this example.
            // it is set on lightning-modal-header instead
            size: 'small',
            description: 'Accesando new leads',
            content: 'Passed into content api',
        });
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'
        this.isModalOpen = false;

        console.log(result);
    }
    // openModal() {
    //     this.isModalOpen = true;
    // }

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
