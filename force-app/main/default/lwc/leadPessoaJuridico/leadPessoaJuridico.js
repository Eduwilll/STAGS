import { LightningElement, wire, api } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import LEAD_OBJECT from "@salesforce/schema/Lead";
import LEAD_ORIGIN_SOURCE from "@salesforce/schema/Lead.LeadSource";
import LEAD_INDUSTRY from "@salesforce/schema/Lead.Industry";
import { options, validateCNPJ } from "c/leadUtils";
import createLeadPessoaJuridicaRecord from "@salesforce/apex/LeadController.createLeadPessoaJuridicaRecord";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from 'lightning/navigation';


export default class LeadPessoaJuridico extends NavigationMixin(LightningElement) {
  @api recordId 
  activeSections = ["info_pessoa", "info_servicos", "info_address"];
  activeSectionsMessage = "";
  tratamento;
  value = "";
  name;
  sobrenome;
  email;
  cnpj;
  empresa;
  cargo;
  setor;
  origemLead;
  phone;
  selectedLead = "";
  optionsLead;
  objectInfoData;
  defaultRecordTypeId;

  optionsSetor;
  isChecked = false;
  website = "";
  // pickList para Tratamento
  options = options();
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

  @api selectedRecordTypeId;
  connectedCallback() {
   console.log('LeadPessoaJuridica:',this.selectedRecordTypeId) 
  }

  // Wire service para pegar o recordTypeId ser usado to get picklist Origem do Lead (Lead Source) e Setor (Industry)
  @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
  wireObjectInfoLeadSource({ error, data }) {
    if (data) {
      this.objectInfoData = data;
      this.defaultRecordTypeId = data.defaultRecordTypeId;
    } else if (error) {
      this.error = error;
      this.defaultRecordTypeId = undefined;
      console.log("error" + error);
    }
  }

  @wire(getPicklistValues, {
    recordTypeId: "$defaultRecordTypeId",
    fieldApiName: LEAD_ORIGIN_SOURCE,
  })
  // get picklist Lead Source
  pickListLeadSourceValues({ error, data }) {
    if (data) {
      this.optionsLead = data.values.map((plValue) => {
        return {
          label: plValue.label,
          value: plValue.value,
        };
      });
    } else if (error) {
      console.log(error);
    }
  }

  // get picklist Industry
  @wire(getPicklistValues, {
    recordTypeId: "$defaultRecordTypeId",
    fieldApiName: LEAD_INDUSTRY,
  })
  pickListIndustryValues({ error, data }) {
    if (data) {
      this.optionsSetor = data.values.map((inValue) => {
        return {
          label: inValue.label,
          value: inValue.value,
        };
      });
    } else if (error) {
      console.log(error);
    }
  }

  // atribui o valor para o a variavel com base no evento name;
  handleChange(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    const field = event.target.name;
    if (field) {
      this[field] = event.target.value;
    }
  }
  //handleChild Componente servicos
  handleChildInfoServicos(event) {
    //child servicos
    this.servico = event.detail.key10;
    this.equipamento = event.detail.key11;

    // console.log("servicos:", this.servico);
    // console.log("equipamento", this.equipamento);
  }
  //handleChild Componente endereco
  handleChildInfoEndereco(event) {
    //child endereco
    this.cep = event.detail.key1;
    this.bairro = event.detail.key2;
    this.rua = event.detail.key3;
    this.cidade = event.detail.key4;
    this.estado = event.detail.key5;
    this.complemento = event.detail.key6;
    this.numero = event.detail.key7;
    this.pais = event.detail.key8;

    // console.log("cep", this.cep);
    // console.log("bairro:", this.bairro);
    // console.log("rua", this.rua);
    // console.log("cidade:", this.cidade);
    // console.log("estado", this.estado);
    // console.log("complemento:", this.complemento);
    // console.log("numero", this.numero);
    // console.log("pais:", this.pais);
  }
  //aciona os accordion
  handleToggleSection(event) {
    const openSections = event.detail.openSections;

    if (openSections.length == 0) {
      this.activeSectionsMessage = "All sections are closed";
    } else {
      this.acativeSectionMessage = "Open sections: " + openSections;
    }
  }
  // cheack se o checkbox 'Não chamar' ativado.
  handleChangeCheck(event) {
    this.isChecked = event.target.checked;
    console.log("não chamar", this.isChecked);
  }
 

  validateEmail(email) {
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  validatePhone(phone) {
    // Validate phone format
    const phoneRegex = /^[0-9]{10,}$/; // You may need to adjust the regex based on your phone number format
    return phoneRegex.test(phone);
  }
  validateCEP(cep) {
    // Validate CEP format
    const cepRegex =/^\d{8}$/; // /^[0-9]{5}-[0-9]{3}$/;
    return cepRegex.test(cep);
  }

  handleInvokeChildMethodEndereco() {
    // Obter uma referência para o componente filho
    const childComponent = this.template.querySelector('c-novo-lead-endereco');
    // Invocar o método inputValidade no componente filho
    if (childComponent) {
        childComponent.inputValidade();
    }
  }
  handleInvokeChildMethodServico() {
    // Obter uma referência para o componente filho
    const childComponent = this.template.querySelector('c-novo-lead-servicos');
    console.log(childComponent)
    console.log(typeof(childComponent))
    // Invocar o método inputValidade no componente filho
    if (childComponent) {
        childComponent.inputValidade();
    }
  }

  // metodo botão que ao acionado faz a validacao e o envidos dos dados para o lead controller.
  async handleOkay() {
    
    // chega se os campos estão preenchidos
    if (
      !this.name ||
      !this.sobrenome ||
      !this.cnpj ||
      !this.email ||
      !this.empresa||
      !this.cargo||
      !this.setor||
      !this.origemLead||
      !this.email ||
      !this.phone ||
      !this.servico ||
      !this.equipamento ||
      !this.cep 

    ) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Erro",
          message: "Preencha todos os campos obrigatórios.",
          variant: "error",
        })
      );
      
      // Checa se os campos com required estão preenchidos e enviar uma mensagem custom.
      let fieldErrorMsg = "Por favor insira o";
      this.template.querySelectorAll('[data-element="required"]').forEach((item) => {
        let fieldValue = item.value;
        let fieldLabel = item.label;
        

        
        if (!fieldValue) {
          item.setCustomValidity(fieldErrorMsg + " " + fieldLabel);
        } else {
          item.setCustomValidity("");
        }
        item.reportValidity();
      });

       // Invocar o método inputValidade no componente filho
       this.handleInvokeChildMethodEndereco();
       this.handleInvokeChildMethodServico();
      return;
    }
  
    if (!validateCNPJ(this.cnpj)) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Erro",
          message: "Formato de CNPJ inválido. Por favor, digite um CNPJ válido.",
          variant: "error",
        })
      );
      return;
    }
    
    //validação regex
    if (!this.validateEmail(this.email)) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Erro",
          message: "Formato de e-mail inválido. Por favor, digite um e-mail válido.",
          variant: "error",
        })
      );
      return;
    }
  
    if (!this.validatePhone(this.phone)) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Erro",
          message: "Formato de número de telefone inválido. Por favor, digite um número de telefone válido.",
          variant: "error",
        })
      );
      return;
    }
  
    if (!this.validateCEP(this.cep)) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Erro",
          message: "Formato de CEP inválido. Por favor, digite um CEP válido.",
          variant: "error",
        })
      );
      return;
    }
  
    try {
      
      //insert the lead pessoa juridica
      const result =  await createLeadPessoaJuridicaRecord({
        leadSalutation: this.tratamento,
        leadFirstName: this.name,
        leadLastName: this.sobrenome,
        leadEmail: this.email,
        leadCnpj: this.cnpj,
        leadEmpresa: this.empresa,
        leadSetor: this.setor,
        leadCargo: this.cargo,
        leadPhone: this.phone,
        leadOrigem: this.origemLead,
        leadDoNotCall: this.isChecked,
        leadWebsite: this.website,
        leadCep: this.cep,
        leadRua: this.rua,
        leadNumero: this.numero,
        leadComplemento: this.complemento,
        leadBairro: this.bairro,
        leadCidade: this.cidade,
        leadEstado: this.estado,
        leadPais: this.pais,
        leadServico: this.servico,
        leadEquipamento: this.equipamento,
        leadRecordTypeId: this.selectedRecordTypeId,
      })

      this.recordId = result; // recebendo o id do record lead criado

      this.navigateToRecordPage();// redirecionar para o lead record criado
      
      //console.log('Result: ' + result);
    
    } catch (error) {
      console.error('Error creating lead:', error);
    
      let menssageErrorDuplicate = '';
      // Error message handling
      if (error.body.message.includes('DUPLICATES_DETECTED')) {
        menssageErrorDuplicate = 'Valores Duplicados';
      }
    
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Erro",
          // Use the correct variable name 'error.message' instead of just 'error'
          message: "Ocorreu um erro ao criar a avaliação." + menssageErrorDuplicate,
          variant: "error",
        })
      );
    } finally {
      // Move this block outside the catch block to ensure it always executes
      this.closeModal();
    }
  }

  // metodo para redirecionar para o record Page
  navigateToRecordPage() {
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: this.recordId,
            objectApiName: 'Lead',
            actionName: 'view',
        },
    });
  }
  closeModal() {
    const event = new CustomEvent("closemodal");
    this.dispatchEvent(event);
  }
}
