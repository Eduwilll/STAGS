import { LightningElement } from 'lwc';

export default class LeadPessoaJuridico extends LightningElement {
    activeSections = ['info_pessoa','info_servicos','info_address']
    activeSectionsMessage= '';
    tratamento;
    value = '';
    name;
    sobrenome;
    cnpj;
    empresa;
    cargo;
    setor
    origemLead
    get options() {
        return [
            { label: 'Sr.', value: 'Sr.'},
            { label: 'Sra.', value: 'Sra.'},
        ]
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