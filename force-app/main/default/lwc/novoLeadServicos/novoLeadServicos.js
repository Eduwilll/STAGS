import { LightningElement } from 'lwc';

export default class NovoLeadServicos extends LightningElement {
    valueServicoes = '';
    equipamento;
    servico;

    get servicos() {
        return [
            { label: 'Venda', value: 'Venda'},
            { label: 'Manutenção', value: 'Manutenção'},
            { label: 'Instalação', value: 'Instalação'}
        ]
    }
    get equipamentos (){
        return [
            { label: 'Fujitsu', value: 'Fujitsu'},
            { label: 'LG', value: 'LG'},
            { label: 'GREE', value: 'GREE'}
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
        const eventer = new CustomEvent('child', {
            // detail contains only primitives
            detail: {
                key10:this.servico,
                key11:this.equipamento
            }
            });
            this.dispatchEvent(eventer);
    }
}
   