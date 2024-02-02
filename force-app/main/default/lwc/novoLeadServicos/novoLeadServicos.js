import { LightningElement } from 'lwc';

export default class NovoLeadServicos extends LightningElement {
    valueServicoes = '';
    equipamento;

    get servicos() {
        return [
            { label: 'Venda', value: 'venda'},
            { label: 'Manutenção', value: 'manutencao'},
            { label: 'Instalação', value: 'instalacao'}
        ]
    }
    get equipamentos (){
        return [
            { label: 'Fujitsu', value: 'fujitsu'},
            { label: 'LG', value: 'lg'},
            { label: 'GREE', value: 'gree'}
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
}