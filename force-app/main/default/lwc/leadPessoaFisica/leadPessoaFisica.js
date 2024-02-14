import { LightningElement, api, wire } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import LEAD_OBJECT from "@salesforce/schema/Lead";
import LEAD_ORIGIN_SOURCE from "@salesforce/schema/Lead.LeadSource";
import { options } from "c/leadUtils";
import createLeadPessoaFisicaRecord from "@salesforce/apex/LeadController.createLeadPessoaFisicaRecord";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getRecord } from 'lightning/uiRecordApi';

//import LightningModal from 'lightning/modal';

export default class LeadPessoaFisica extends LightningElement /*LightningModal*/ {
  @api content;
  activeSections = ["info_pessoa", "info_servicos", "info_address"];
  activeSectionsMessage = "";
  valueLead = "";
  tratamento = "";
  name = "";
  sobrenome = "";
  cpf = "";
  origemLead;
  email;
  phone = "";
  isChecked = false;
  optionsLead;
  defaultRecordTypeId;
  objectInfoData;
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
  company = "Teste";

  objectNameToGetRecordTypes = 'Lead';
  lstRecordTypes = [];
  selectedRecordTypeId;
  selectedRecordTypeName;
  
  @wire(getObjectInfo, { objectApiName: '$objectNameToGetRecordTypes' })
  getObjectInfo({ error, data }) {
      if (data) {
          this.lstRecordTypes = [];
          for (let key in data.recordTypeInfos) {
              if (data.recordTypeInfos[key].name === 'Pessoa Física') {
                  // Found the desired record type
                  this.selectedRecordTypeId = key;
                  this.selectedRecordTypeName = key.name;
              }
  
              this.lstRecordTypes.push({ value: key, label: data.recordTypeInfos[key].name });
          }
      } else if (error) {
          console.log('Error while getting record types');
          this.lstRecordTypes = [];
      }
  }


  @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
  wireObjectInfo({ error, data }) {
    if (data) {
      this.objectInfoData = data; // if you still need it
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
  pickValues({ error, data }) {
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
  handleChildInfoServicos(event) {
    //child servicos
    this.servico = event.detail.key10;
    this.equipamento = event.detail.key11;

    console.log("servicos:", this.servico);
    console.log("equipamento", this.equipamento);
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

    console.log("cep", this.cep);
    console.log("bairro:", this.bairro);
    console.log("rua", this.rua);
    console.log("cidade:", this.cidade);
    console.log("estado", this.estado);
    console.log("complemento:", this.complemento);
    console.log("numero", this.numero);
    console.log("pais:", this.pais);
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
  // validação de input
  // validate(){
  //     if (condition) {

  //     } else {

  //     }
  // }
  //aciona o botão
  handleReset(event) {
    const inputFields = this.template.querySelectorAll("lightning-input-field");
    if (inputFields) {
      inputFields.forEach((field) => {
        field.reset();
      });
    }
  }
  validateCPF(cpf) {
    // Validate CPF format
    const cpfRegex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;
    return cpfRegex.test(cpf);
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
  handleSalvar() {
    console.log("Aciounou botão");
    if (!this.name || !this.sobrenome || !this.email || !this.cpf ) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Erro",
          message: "Preencha todos os campos obrigatórios.",
          variant: "error",
        })
      );
      return;
    } else if (!this.validateCPF(this.cpf)) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error",
          message: "Formato de CPF inválido. Por favor, digite um CPF válido.",
          variant: "error",
        })
      );
      return;
    } else if (!this.validateEmail(this.email)) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error",
          message: "Formato de E-email inválido. Introduza um endereço de E-email válido.",
          variant: "error",
        })
      );
      return;
    // } else if (!this.validatePhone(this.phone)) {
    //   this.dispatchEvent(
    //     new ShowToastEvent({
    //       title: "Error",
    //       message:
    //         "Formato de número de telefone inválido. Introduza um número de telefone válido.",
    //       variant: "error",
    //     })
    //   );
    //   return;
    } else {
      try {
        const result = createLeadPessoaFisicaRecord({
          leadFirstName: this.name,
          leadLastName: this.sobrenome,
          leadEmail: this.email,
          leadPhone: this.phone,
          leadCpf: this.cpf,
          leadOrigem: this.origemLead,
          leadDoNotCall: this.isChecked,
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
          LeadCompany: this.company,
          leadRecordTypeId: this.selectedRecordTypeId
        }).then((result) => {
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Sucesso",
                message: "Record created successfully",
                variant: "success",
              })
            );
          })
          .catch((error) => {
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Error creating record",
                message: error.body.message,
                variant: "error",
              })
            );
          });

        console.log("result", result);

        //this.handleReset();
        this.closeModal();
      } catch (error) {
        console.error(error);
        // Extrair a mensagem de erro da exceção
        let errorMessage = "Ocorreu um erro ao criar a avaliação.";
        if (error.body && error.body.message) {
          errorMessage = error.body.message;
        }
        // Exibir uma mensagem de erro
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Erro",
            message: "Ocorreu um erro ao criar a avaliação." + errorMessage,
            variant: "error",
          })
        );
      }
    }
  }

  closeModal() {
    const event = new CustomEvent("closemodal");
    this.dispatchEvent(event);
  }
}
