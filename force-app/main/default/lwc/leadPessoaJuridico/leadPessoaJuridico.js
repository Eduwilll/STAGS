import { LightningElement, wire, api } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import LEAD_OBJECT  from "@salesforce/schema/Lead";
import LEAD_ORIGIN_SOURCE from "@salesforce/schema/Lead.LeadSource";
import LEAD_INDUSTRY from "@salesforce/schema/Lead.Industry";
import { options } from 'c/leadUtils';
//import createLeadPessoaJuridicaRecord from '@salesforce/apex/LeadController.createLeadPessoaJuridicaRecord';

export default class LeadPessoaJuridico extends LightningElement {
    activeSections = ['info_pessoa','info_servicos','info_address']
    activeSectionsMessage= '';
    tratamento;
    value = '';
    name;
    sobrenome;
    email
    cnpj;
    empresa;
    cargo;
    setor;
    origemLead;
    selectedLead = 'None';
    optionsLead;
    objectInfoData;
    defaultRecordTypeId;
    
    optionsSetor;
    isChecked = false;
    website = '';
    // pickList para Tratamento
    options = options()
    

    // LeadSource
    @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
    wireObjectInfoLeadSource({ error, data }){
        if(data){
            this.objectInfoData = data;
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
    

    //Industry/setor
    objectInfoData;
    defaultRecordTypeId;
    @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
    wireObjectInfoIndustry({ error, data }){
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
        fieldApiName: LEAD_INDUSTRY
    })
    pickValues2({ error, data }) {
        if (data) {
            this.optionsSetor = data.values.map(inValue => {
                return {
                    label: inValue.label,
                    value: inValue.value
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
    //handleChild Componente servicos
    handleChildInfoServicos(event){
        //child servicos
        const servico = event.detail.key1;
        const equipamento = event.detail.key2;

        console.log('servicos:',servico);
        console.log('equipamento',equipamento);
  
    }
    //handleChild Componente endereco
    handleChildInfoEndereco (event){
        //child endereco
        const cep = event.detail.key1;
        const bairro = event.detail.key2;
        const rua = event.detail.key3;
        const cidade = event.detail.key4;
        const estado = event.detail.key5;
        const complemento = event.detail.key6;
        const numero = event.detail.key7;
        const pais = event.detail.key8;

        console.log('cep',cep);
        console.log('bairro:',bairro);
        console.log('rua',rua);
        console.log('cidade:',cidade);
        console.log('estado',estado);
        console.log('complemento:',complemento);
        console.log('numero',numero);
        console.log('pais:',pais);
 
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
        console.log('não chamar',this.isChecked);
    }
    //aciona o botão
    handleOkay() {
    //     console.log('Acionou botão');
    //     createLeadPessoaJuridicaRecord({
    //                                     leadFirstName :this.name,
    //                                     leadLastName:this.sobrenome,
    //                                     leadEmail: this.email,
    //                                     leadCnpj:this.cnpj,
    //                                     leadEmpresa:this.empresa,
    //                                     leadSetor:this.setor,
    //                                     leadCargo: this.cargo,
    //                                     leadOrigem: this.origemLead,
    //                                     leadDoNotCall:this.isChecked,
    //                                     leadWebsite: this.website,
    //                                     leadCep:this.cep,
    //                                     leadRua: this.rua,
    //                                     leadNumero:this.numero,
    //                                     leadComplemento:this.complemento,
    //                                     leadBairro:this.bairro,
    //                                     leadCidade:this.cidade,
    //                                     leadEstado:this.estado,
    //                                     leadPais:this.pais,
    //                                     leadServico:this.servicos,
    //                                     leadEquipamento: this.equipamento
    //                                     })
    }
}