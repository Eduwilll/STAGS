/**
 * @description       : 
 * @author            : Eduardo Fabricio
 * @group             : 
 * @last modified on  : 02-19-2024
 * @last modified by  : Eduardo Fabricio
**/

@isTest
public with sharing class LeadControllerTest {
    @isTest
    static void testCreateLeadPessoaFisicaRecord() {
        String leadFirstName = 'John';
        String leadLastName = 'Doe';
        String leadEmail = 'john.doe@example.com';
        String leadPhone = '1234567890';
        Decimal leadCpf = 123456701;
        String leadOrigem = 'Web';
        Boolean leadDoNotCall = false;
        Decimal leadCep = 12345678;
        String leadRua = 'Main St';
        Decimal leadNumero = 123;
        String leadComplemento = 'Apt 456';
        String leadBairro = 'Downtown';
        String leadCidade = 'Cityville';
        String leadEstado = 'CA';
        String leadPais = 'USA';
        String leadServico = 'Venda';
        String leadEquipamento = 'LG';
        String LeadCompany = 'XYZ Inc.';
        String leadRecordTypeId = Schema.SObjectType.Lead.getRecordTypeInfosByName().get('Pessoa Física').getRecordTypeId();


        Test.startTest();
        try {
            LeadController.createLeadPessoaFisicaRecord(leadFirstName, leadLastName, leadEmail, leadPhone, leadCpf, leadOrigem, leadDoNotCall, leadCep, leadRua, leadNumero, leadComplemento, leadBairro, leadCidade, leadEstado, leadPais, leadServico, leadEquipamento, LeadCompany, leadRecordTypeId);
        } catch (Exception e) {
            throw new AuraHandledException('Error creating lead: ' + e.getMessage());

        }
        
        Test.stopTest();

        Lead createdLead = [SELECT Id, FirstName, LastName, Email, Phone, CPF__c, LeadSource, DoNotCall,
                            CEP__c, Rua__c, Numero__c, Complemento__c, Bairro__c, Cidade__c, Estado_Provincia__c, Pais__c,
                            Tipo_Servico__c, Equipamento__c, Company,RecordTypeId  
                            FROM Lead  LIMIT 1];

        System.assertEquals(leadFirstName, createdLead.FirstName);
        System.assertEquals(leadLastName, createdLead.LastName);
        System.assertEquals(leadEmail, createdLead.Email);
        System.assertEquals(leadPhone, createdLead.Phone);
        System.assertEquals(leadCpf, createdLead.CPF__c);
        System.assertEquals(leadOrigem, createdLead.LeadSource);
        System.assertEquals(leadDoNotCall, createdLead.DoNotCall);
        System.assertEquals(leadCep, createdLead.CEP__c);
        System.assertEquals(leadRua, createdLead.Rua__c);
        System.assertEquals(leadNumero, createdLead.Numero__c);
        System.assertEquals(leadComplemento, createdLead.Complemento__c);
        System.assertEquals(leadBairro, createdLead.Bairro__c);
        System.assertEquals(leadCidade, createdLead.Cidade__c);
        System.assertEquals(leadEstado, createdLead.Estado_Provincia__c);
        System.assertEquals(leadPais, createdLead.Pais__c);
        System.assertEquals(leadServico, createdLead.Tipo_Servico__c);
        System.assertEquals(leadEquipamento, createdLead.Equipamento__c);
        System.assertEquals(LeadCompany, createdLead.Company);
        System.assertEquals(leadRecordTypeId, createdLead.RecordTypeId);

    }

    @isTest
    static void testCreateLeadPessoaJuridicaRecord() {
        String leadSalutation = 'Mr.';
        String leadFirstName = 'John';
        String leadLastName = 'Doe';
        String leadEmail = 'john.doe@example.com';
        String leadPhone = '1234567890';
        Decimal leadCnpj = 1234561234;
        String leadEmpresa = 'ABC Corp';
        String leadSetor = 'Technology';
        String leadCargo = 'Manager';
        String leadOrigem = 'Web';
        Boolean leadDoNotCall = false;
        String leadWebsite = 'http://www.example.com';
        Decimal leadCep = 12345678;
        String leadRua = 'Main St';
        Decimal leadNumero = 123;
        String leadComplemento = 'Apt 456';
        String leadBairro = 'Downtown';
        String leadCidade = 'Cityville';
        String leadEstado = 'CA';
        String leadPais = 'USA';
        String leadServico = 'Venda';
        String leadEquipamento = 'LG';

        String leadRecordTypeId = Schema.SObjectType.Lead.getRecordTypeInfosByName().get('Pessoa Juridica').getRecordTypeId();

        Test.startTest();
        try {
            LeadController.createLeadPessoaJuridicaRecord(leadSalutation, leadFirstName, leadLastName, leadEmail, leadPhone, leadCnpj, leadEmpresa, leadSetor, leadCargo, leadOrigem, leadDoNotCall, leadWebsite, leadCep, leadRua, leadNumero, leadComplemento, leadBairro, leadCidade, leadEstado, leadPais, leadServico, leadEquipamento, leadRecordTypeId);
        } catch (Exception e) {
            throw new AuraHandledException('Error creating lead: ' + e.getMessage());
        }
        
        Test.stopTest();

        Lead createdLead = [SELECT Id, Salutation, FirstName, LastName, Email, Phone, CNPJ__c, Company, Industry,
                            LeadSource, DoNotCall, Website, CEP__c, Rua__c, Numero__c, Complemento__c, Bairro__c,
                            Cidade__c, Estado_Provincia__c, Pais__c, Tipo_Servico__c, Equipamento__c , Title,RecordTypeId  
                            FROM Lead  LIMIT 1];

        System.assertEquals(leadSalutation, createdLead.Salutation);
        System.assertEquals(leadFirstName, createdLead.FirstName);
        System.assertEquals(leadLastName, createdLead.LastName);
        System.assertEquals(leadEmail, createdLead.Email);
        System.assertEquals(leadPhone, createdLead.Phone);
        System.assertEquals(leadCnpj, createdLead.CNPJ__c);
        System.assertEquals(leadEmpresa, createdLead.Company);
        System.assertEquals(leadSetor, createdLead.Industry);
        System.assertEquals(leadCargo, createdLead.Title);
        System.assertEquals(leadOrigem, createdLead.LeadSource);
        System.assertEquals(leadDoNotCall, createdLead.DoNotCall);
        System.assertEquals(leadWebsite, createdLead.Website);
        System.assertEquals(leadCep, createdLead.CEP__c);
        System.assertEquals(leadRua, createdLead.Rua__c);
        System.assertEquals(leadNumero, createdLead.Numero__c);
        System.assertEquals(leadComplemento, createdLead.Complemento__c);
        System.assertEquals(leadBairro, createdLead.Bairro__c);
        System.assertEquals(leadCidade, createdLead.Cidade__c);
        System.assertEquals(leadEstado, createdLead.Estado_Provincia__c);
        System.assertEquals(leadPais, createdLead.Pais__c);
        System.assertEquals(leadServico, createdLead.Tipo_Servico__c);
        System.assertEquals(leadEquipamento, createdLead.Equipamento__c);
        System.assertEquals(leadRecordTypeId, createdLead.RecordTypeId);
    }
   
}