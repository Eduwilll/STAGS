/**
 * @description       : 
 * @author            : Eduardo Fabricio
 * @group             : 
 * @last modified on  : 02-19-2024
 * @last modified by  : Eduardo Fabricio
**/

public with sharing class LeadController {

    // public static Id getRecordType(){
    //     String leadRecordTypeId = Schema.SObjectType.Lead.getRecordTypeInfosByName().get('selectedRecordType').getRecordTypeId();
        

    // }

    // record insert de pessoa Fisica
    @AuraEnabled
    public static Id createLeadPessoaFisicaRecord(String leadFirstName, String leadLastName, String leadEmail, String leadPhone, Decimal leadCpf,
                                                  String leadOrigem, Boolean leadDoNotCall, Decimal leadCep, String leadRua, Decimal leadNumero,
                                                  String leadComplemento, String leadBairro, String leadCidade, String leadEstado, String leadPais,
                                                  String leadServico, String leadEquipamento,String LeadCompany, Id leadRecordTypeId) {
        Lead newLead = new Lead(
            FirstName = leadFirstName,
            LastName = leadLastName,
            Email = leadEmail,
            Phone = leadPhone,
            CPF__c = leadCpf,
            LeadSource = leadOrigem,
            DoNotCall = leadDoNotCall,
            CEP__c = leadCep,
            Rua__c = leadRua,
            Numero__c = leadNumero,
            Complemento__c = leadComplemento,
            Bairro__c = leadBairro,
            Cidade__c = leadCidade,
            Estado_Provincia__c = leadEstado,
            Pais__c = leadPais,
            Tipo_Servico__c = leadServico,
            Equipamento__c = leadEquipamento,
            Company = LeadCompany,
            RecordTypeId = leadRecordTypeId

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
    public static Id createLeadPessoaJuridicaRecord(String leadSalutation,String leadFirstName, String leadLastName, String leadEmail, String leadPhone, Decimal leadCnpj,
                                                    String leadEmpresa,String leadSetor ,String leadCargo, String leadOrigem, Boolean leadDoNotCall,String leadWebsite, 
                                                    Decimal leadCep, String leadRua, Decimal leadNumero,String leadComplemento, String leadBairro,
                                                    String leadCidade, String leadEstado, String leadPais,String leadServico, String leadEquipamento ,Id leadRecordTypeId) {
        Lead newLead = new Lead(
            Salutation = leadSalutation,
            FirstName = leadFirstName,
            LastName = leadLastName,
            Email = leadEmail,
            Phone = leadPhone,
            CNPJ__c = leadCnpj,
            Company = leadEmpresa, 
            Industry = leadSetor,
            Title = leadCargo,
            LeadSource = leadOrigem,
            DoNotCall = leadDoNotCall,
            Website = leadWebsite,
            CEP__c = leadCep, //CEP__c
            Rua__c = leadRua, //
            Numero__c = leadNumero,
            Complemento__c = leadComplemento,
            Bairro__c = leadBairro, 
            Cidade__c = leadCidade,
            Estado_Provincia__c = leadEstado,
            Pais__c = leadPais, 
            Tipo_Servico__c = leadServico,
            Equipamento__c = leadEquipamento,
            RecordTypeId = leadRecordTypeId

        );
        System.debug('entou no método'+ newLead);
        try {

            insert newLead;
            return newLead.Id;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating lead: ' + e.getMessage());
        }

    }
}