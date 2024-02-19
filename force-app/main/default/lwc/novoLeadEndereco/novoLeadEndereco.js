import { LightningElement,api } from 'lwc';

export default class NovoLeadEndereco extends LightningElement {
    cep;
    bairro;
    rua;
    cidade;
    estado;
    complemento;
    numero;
    pais;
    

    // atribui o valor para o a variavel com base no evento name;
    handleChange(event) {

        const field = event.target.name;
        if (field) {
            this[field] = event.target.value;
        }
        const eventer = new CustomEvent('equipamentos', {
            // detail contains only primitives
            detail: {
                 key1: this.cep,
                key2: this.bairro,
                key3: this.rua,
                key4: this.cidade,
                key5: this.estado,
                key6: this.complemento,
                key7: this.numero,
                key8: this.pais
            }
            });
        this.dispatchEvent(eventer);
            
    }
    @api
    inputValidade(){
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
  
        return;
    }
}