import { LightningElement, api ,wire} from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import LEAD_OBJECT  from "@salesforce/schema/Lead";
import LEAD_ORIGIN_SOURCE from '@salesforce/schema/Lead.LeadSource';
//import LightningModal from 'lightning/modal';

export default class LeadPessoaFisica extends LightningElement /*LightningModal*/  {
    @api content;
    activeSections = ['info_pessoa','info_servicos','info_address']
    activeSectionsMessage= '';
    valueLead = '';
    tratamento = '';
    name = '';
    sobrenome = '';
    cpf = '';
    origemLead;
    email;
    phone = '';
    isChecked = false;
    optionsLead;
    defaultRecordTypeId;
    objectInfoData;
    // pickList para Tratamento
    get options() {
        return [
            { label: 'Sr.', value: 'Sr.'},
            { label: 'Sra.', value: 'Sra.'},
        ]
    }

    @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
    wireObjectInfo({ error, data }){
        if(data){
            this.objectInfoData = data; // if you still need it
            this.defaultRecordTypeId = data.defaultRecordTypeId;
        } else if (error) {
            this.error = error;
            this.defaultRecordTypeId = undefined;
            console.log('error' + error);
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$defaultRecordTypeId',
        fieldApiName: LEAD_ORIGIN_SOURCE
    })
    pickValues({ error, data }) {
        if (data) {
            this.optionsLead = data.values.map(plValue => {
                return {
                    label: plValue.label,
                    value: plValue.value
                };
            });

        } else if (error) {
            console.log(error);
        }
    }

    // atribui o valor para o a variavel com base no evento name;
    handleChange(event) {
        console.log(event.target.name);
        console.log(event.target.value);
        const field = event.target.name;
        if (field) {
            this[field] = event.target.value;
        }
    }
    //aciona os accordion
    handleToggleSection(event){
        const openSections = event.detail.openSections;

        if (openSections.length == 0) {
            this.activeSectionsMessage = 'All sections are closed'
        } else {
            this.acativeSectionMessage =
            'Open sections: ' + openSections;
        }
    }
    // cheack se o checkbox 'Não chamar' ativado.
    handleChangeCheck(event) {
        this.isChecked = event.target.checked;
    }
    //aciona o botão
    handleOkay() {
        this.close('okay');
    }
}