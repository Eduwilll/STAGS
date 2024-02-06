import { LightningElement } from 'lwc';
//import LightningModal from 'lightning/modal';

export default class NovoLead extends LightningElement /*LightningModal*/  {
    value = '';

    get options() {
        return [
            { label: 'Pessoa Jurídica', value: 'Pessoa Jurídica'},
            { label: 'Pessoa Física', value: 'Pessoa Física'},
        ]
    }
    handleChange(event){
        console.log(event.target.name);
        console.log(event.target.value);
        const field = event.target.name;
        if(field) {
            this[field] = event.target.value;
        }
    }
}