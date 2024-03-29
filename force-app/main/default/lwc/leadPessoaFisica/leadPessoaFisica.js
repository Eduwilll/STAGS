import { LightningElement, wire,api } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";
import LEAD_OBJECT from "@salesforce/schema/Lead";
import LEAD_ORIGIN_SOURCE from "@salesforce/schema/Lead.LeadSource";
import { options } from "c/leadUtils";
import createLeadPessoaFisicaRecord from "@salesforce/apex/LeadController.createLeadPessoaFisicaRecord";

export default class LeadPessoaFisica extends NavigationMixin(LightningElement) {
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
  //record type Id 
  
  @api selectedRecordTypeId;
  connectedCallback() {
   console.log('LeadPessoaFisica:',this.selectedRecordTypeId) 
  }
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

 
  // Wire service para pegar o recordTypeId ser usado to get picklist Origem do Lead (Lead Source)
  @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
  wireObjectInfo({ error, data }) {
    if (data) {
      this.objectInfoData = data;
      this.defaultRecordTypeId = data.defaultRecordTypeId;
    } else if (error) {
      this.error = error;
      this.defaultRecordTypeId = undefined;
      console.log("error" + error);
    }
  }
  // get picklist Origem do Lead (Lead Source)
  @wire(getPicklistValues, {
    recordTypeId: "$defaultRecordTypeId",
    fieldApiName: LEAD_ORIGIN_SOURCE,
  })
  pickListLeadValues({ error, data }) {
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

  // functions que aciona os accordion
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
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phone);
  }
  validateCEP(cep) {
    // Validate CEP format
    const cepRegex = /^\d{8}$/; ///^[0-9]{5}-[0-9]{3}$/;
    return cepRegex.test(cep);
  }

  handleInvokeChildMethodEndereco() {
    // Obter referência para o componente filho
    const childComponent = this.template.querySelector("c-novo-lead-endereco");
    // console.log(childComponent);
    // console.log(typeof childComponent);
    // Invocar o método inputValidade no componente filho
    if (childComponent) {
      childComponent.inputValidade();
    }
  }
  handleInvokeChildMethodServico() {
    // Obter referência para o componente filho
    const childComponent = this.template.querySelector("c-novo-lead-servicos");
    // console.log(childComponent);
    // console.log(typeof childComponent);
    // Invocar o método inputValidade no componente filho
    if (childComponent) {
      childComponent.inputValidade();
    }
  }

  // metodo botão que ao acionado faz a validacao e o envidos dos dados para o lead controller.
  async handleSalvar() {
    //console.log("Aciounou botão");

    // chega se os campos estão preenchidos
    if (
      !this.name ||
      !this.sobrenome ||
      !this.cpf ||
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
      this.template
        .querySelectorAll('[data-element="required"]')
        .forEach((item) => {
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
      //validação regex
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
          message:
            "Formato de E-email inválido. Introduza um endereço de E-email válido.",
          variant: "error",
        })
      );
      return;
    } else if (!this.validatePhone(this.phone)) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error",
          message:
            "Formato de número de telefone inválido. Introduza um número de telefone válido.",
          variant: "error",
        })
      );
      return;
    } else if (!this.validateCEP(this.cep)) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Erro",
          message: "Formato de CEP inválido. Por favor, digite um CEP válido.",
          variant: "error",
        })
      );
      return;
    } else {
      try {
        //insert the lead pessoa fisica
        const result = await createLeadPessoaFisicaRecord({
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
          leadRecordTypeId: this.selectedRecordTypeId,
        })
          .then((result) => {
            this.recordId = result; // recebendo o id do record lead criado
            this.navigateToRecordPage(); // redirecionar para o lead record criado
            // console.log("Result: " + result);
            // console.log("recordId: " + recordId);
          })
          .catch((error) => {
            console.error("Error creating lead:", error);
          });

        //console.log("result", result);

        this.closeModal();
      } catch (error) {
        console.error("Error creating lead:", error);

        let menssageErrorDuplicate = "";
        // Error message handling
        if (error.body.message.includes("DUPLICATES_DETECTED")) {
          menssageErrorDuplicate = "Valores Duplicados";
        }

        this.dispatchEvent(
          new ShowToastEvent({
            title: "Erro",
            // Use the correct variable name 'error.message' instead of just 'error'
            message:
              "Ocorreu um erro ao criar a avaliação." + menssageErrorDuplicate,
            variant: "error",
          })
        );
      } finally {
        this.closeModal();
      }
    }
  }

  // metodo para redirecionar para o record Page
  navigateToRecordPage() {
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: this.recordId,
        objectApiName: "Lead",
        actionName: "view",
      },
    });
  }

  closeModal() {
    const event = new CustomEvent("closemodal");
    this.dispatchEvent(event);
  }
}
