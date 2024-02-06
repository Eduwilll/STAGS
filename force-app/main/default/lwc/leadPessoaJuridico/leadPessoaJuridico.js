import { LightningElement, wire, api } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import LEAD_OBJECT  from "@salesforce/schema/Lead";
import LEAD_ORIGIN_SOURCE from "@salesforce/schema/Lead.LeadSource";
import LEAD_INDUSTRY from "@salesforce/schema/Lead.Industry";
import { options } from 'c/leadUtils';
import createLeadPessoaJuridicaRecord from '@salesforce/apex/LeadController.createLeadPessoaJuridicaRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

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
    phone;
    selectedLead = 'None';
    optionsLead;
    objectInfoData;
    defaultRecordTypeId;
    
    optionsSetor;
    isChecked = false;
    website = '';
    // pickList para Tratamento
    options = options()
    //variaveis do tipo serviços
    servico;
    equipamento;
    
    //variaveis do endereco;
    cep;
    bairro;
    rua;
    cidade;
    estado;
    complemento;
    numero;
    pais;
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
        this.servico = event.detail.key10;
        this.equipamento = event.detail.key11;
    
        console.log('servicos:', this.servico);
        console.log('equipamento', this.equipamento);
    }
    //handleChild Componente endereco
    handleChildInfoEndereco (event){
        //child endereco
        this.cep = event.detail.key1;
        this.bairro = event.detail.key2;
        this.rua = event.detail.key3;
        this.cidade = event.detail.key4;
        this.estado = event.detail.key5;
        this.complemento = event.detail.key6;
        this.numero = event.detail.key7;
        this.pais = event.detail.key8;

        console.log('cep', this.cep);
        console.log('bairro:', this.bairro);
        console.log('rua', this.rua);
        console.log('cidade:', this.cidade);
        console.log('estado', this.estado);
        console.log('complemento:', this.complemento);
        console.log('numero', this.numero);
        console.log('pais:', this.pais);
 
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
        console.log('Acionou botão');
        try {
            const result =  createLeadPessoaJuridicaRecord({
                leadSalutation: this.tratamento,
                leadFirstName :this.name,
                leadLastName:this.sobrenome,
                leadEmail: this.email,
                leadCnpj:this.cnpj,
                leadEmpresa:this.empresa,
                leadSetor:this.setor,
                leadCargo: this.cargo,
                leadPhone: this.phone,
                leadOrigem: this.origemLead,
                leadDoNotCall:this.isChecked,
                leadWebsite: this.website,
                leadCep:this.cep,
                leadRua: this.rua,
                leadNumero:this.numero,
                leadComplemento:this.complemento,
                leadBairro:this.bairro,
                leadCidade:this.cidade,
                leadEstado:this.estado,
                leadPais:this.pais,
                leadServico:this.servico,
                leadEquipamento: this.equipamento
                })
            // Exibir uma mensagem de sucesso
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Sucesso',
                    message: 'Avaliação criada com sucesso!',
                    variant: 'success'
                })
            );
        } catch (error) {
            console.error(error);
            // Extrair a mensagem de erro da exceção
            let errorMessage = 'Ocorreu um erro ao criar a avaliação.';
            if (error.body && error.body.message) {
                errorMessage = error.body.message;
            }
            // Exibir uma mensagem de erro
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Erro',
                    message: 'Ocorreu um erro ao criar a avaliação.'+errorMessage,
                    variant: 'error'
                })
            );
        }
        
    }
}