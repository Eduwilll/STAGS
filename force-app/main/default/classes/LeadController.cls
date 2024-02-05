public with sharing class LeadController {

    // record insert de pessoa Fisica
    @AuraEnabled
    public static Id createLeadPessoaFisicaRecord(String leadFirstName, String leadLastName, String leadEmail, String leadPhone, Decimal leadCpf,
                                                  String leadOrigem, Boolean leadDoNotCall, Decimal leadCep, String leadRua, Decimal leadNumero,
                                                  String leadComplemento, String leadBairro, String leadCidade, String leadEstado, String leadPais,
                                                  String leadServico, String leadEquipamento) {
        Lead newLead = new Lead(
            FirstName = leadFirstName,
            LastName = leadLastName,
            Email = leadEmail,
            Phone = leadPhone,
            CPF__c = leadCpf,
            LeadSource = leadOrigem,
            DoNotCall = leadDoNotCall,
            CEP__c = leadCep,
            Street = leadRua,
            Numero__c = leadNumero,
            Complemento__c = leadComplemento, //??
            Bairro__c = leadBairro,
            City = leadCidade,
            State = leadEstado,
            Country = leadPais,
            Tipo_Servico__c = leadServico,
            Equipamento__c = leadEquipamento
        );

        try {
            insert newLead;
            return newLead.Id;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating lead: ' + e.getMessage());
        }
    }

    // record insert de pessoa Juridica
    @AuraEnabled
    public static Id createLeadPessoaJuridicaRecord(String leadFirstName, String leadLastName, String leadEmail, String leadPhone, Decimal leadCnpj,
                                                    String leadEmpresa,String leadSetor ,String leadCargo, String leadOrigem, Boolean leadDoNotCall,String leadWebsite, 
                                                    Decimal leadCep, String leadRua, Decimal leadNumero,String leadComplemento, String leadBairro,
                                                    String leadCidade, String leadEstado, String leadPais,String leadServico, String leadEquipamento) {
        Lead newLead = new Lead(
            FirstName = leadFirstName,
            LastName = leadLastName,
            Email = leadEmail,
            Phone = leadPhone,
            CNPJ__c = leadCnpj,
            Company = leadEmpresa, 
            Industry = leadSetor,
            LeadSource = leadOrigem,
            DoNotCall = leadDoNotCall,
            Website = leadWebsite,
            CEP__c = leadCep,
            Street = leadRua,
            Numero__c = leadNumero,
            Complemento__c = leadComplemento, //???
            Bairro__c = leadBairro, 
            City = leadCidade,
            State = leadEstado,
            Country = leadPais, 
            Tipo_Servico__c = leadServico,
            Equipamento__c = leadEquipamento
        );

        try {
            insert newLead;
            return newLead.Id;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating lead: ' + e.getMessage());
        }
    }
}