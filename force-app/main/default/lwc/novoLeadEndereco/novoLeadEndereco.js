import { LightningElement } from 'lwc';

export default class NovoLeadEndereco extends LightningElement {
    cep;
    bairro;
    rua;
    complemento;
    cidade;
    estado;
    titulo;

    // atribui o valor para o a variavel com base no evento name;
    handleChange(event) {
        console.log(event.target.name);
        console.log(event.target.value);
        const field = event.target.name;
        if (field) {
            this[field] = event.target.value;
        }
    }
}