/**
 * @description       : Está classe é responsavel por fazer os testes da Classe LeadController.
 * @author            : Eduardo Fabricio
 * @group             : 
 * @last modified on  : 13-03-2024
 * @last modified by  : Eduardo Fabricio
**/

@isTest
public with sharing class LeadControllerTest {

    // constantes para Record Types
    private static final String PESSOA_FISICA_RECORD_TYPE_NAME = 'Pessoa Física';
    private static final String PESSOA_JURIDICA_RECORD_TYPE_NAME = 'Pessoa Juridica';

    //Metodo teste para criar Lead record Pessoa Física
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

        // Recuperar o ID do record type para Pessoa Fisica
        //String leadRecordTypeId = Schema.SObjectType.Lead.getRecordTypeInfosByName().get(PESSOA_FISICA_RECORD_TYPE_NAME).getRecordTypeId();
        String leadRecordTypeId = LeadController.getLeadRecordTypeIdByName(PESSOA_FISICA_RECORD_TYPE_NAME);

        // Iniciar a execução do teste 
        Test.startTest();
        try {

            LeadController.createLeadPessoaFisicaRecord(leadFirstName, leadLastName, leadEmail, leadPhone, leadCpf, leadOrigem, leadDoNotCall, leadCep, leadRua, leadNumero, leadComplemento, leadBairro, leadCidade, leadEstado, leadPais, leadServico, leadEquipamento, LeadCompany, leadRecordTypeId);

        } catch (Exception e) {

            throw new AuraHandledException('Error creating lead: ' + e.getMessage());

        }
        
        Test.stopTest();
        //Recuperar o record Lead criado
        Lead createdLead = [SELECT Id, FirstName, LastName, Email, Phone, CPF__c, LeadSource, DoNotCall,
                            CEP__c, Rua__c, Numero__c, Complemento__c, Bairro__c, Cidade__c, Estado_Provincia__c, Pais__c,
                            Tipo_Servico__c, Equipamento__c, Company,RecordTypeId  
                            FROM Lead  LIMIT 1];

        // Assertion statements para verificar o record Lead criado                        
        Assert.areEqual(leadFirstName, createdLead.FirstName, 'Erro: First Name não é igual');
        Assert.areEqual(leadLastName, createdLead.LastName, 'Erro: Last Name não é igual');
        Assert.areEqual(leadEmail, createdLead.Email, 'Erro: Email não é igual');
        Assert.areEqual(leadPhone, createdLead.Phone, 'Erro: Phone não é igual');
        Assert.areEqual(leadCpf, createdLead.CPF__c, 'Erro: CPF não é igual');
        Assert.areEqual(leadOrigem, createdLead.LeadSource, 'Erro: Lead Source não é igual');
        Assert.areEqual(leadDoNotCall, createdLead.DoNotCall, 'Erro: Do Not Call não é igual');
        Assert.areEqual(leadCep, createdLead.CEP__c, 'Erro: CEP não é igual');
        Assert.areEqual(leadRua, createdLead.Rua__c, 'Erro: Rua não é igual');
        Assert.areEqual(leadNumero, createdLead.Numero__c, 'Erro: Numero não é igual');
        Assert.areEqual(leadComplemento, createdLead.Complemento__c, 'Erro: Complemento não é igual');
        Assert.areEqual(leadBairro, createdLead.Bairro__c, 'Erro: Bairro não é igual');
        Assert.areEqual(leadCidade, createdLead.Cidade__c, 'Erro: Cidade não é igual');
        Assert.areEqual(leadEstado, createdLead.Estado_Provincia__c, 'Erro: Estado não é igual');
        Assert.areEqual(leadPais, createdLead.Pais__c, 'Erro: Pais não é igual');
        Assert.areEqual(leadServico, createdLead.Tipo_Servico__c, 'Erro: Tipo de Serviço não é igual');
        Assert.areEqual(leadEquipamento, createdLead.Equipamento__c, 'Erro: Equipamento não é igual');
        Assert.areEqual(LeadCompany, createdLead.Company, 'Erro: Company não é igual');
        Assert.areEqual(leadRecordTypeId, createdLead.RecordTypeId, 'Erro: Record Type Id não é igual');
        

    }

    //Metodo teste para criar Lead record Pessoa Jurídica
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

        // Recuperar o ID do record type para Pessoa Fisica
        //String leadRecordTypeId = Schema.SObjectType.Lead.getRecordTypeInfosByName().get(PESSOA_JURIDICA_RECORD_TYPE_NAME).getRecordTypeId();
        String leadRecordTypeId = LeadController.getLeadRecordTypeIdByName(PESSOA_JURIDICA_RECORD_TYPE_NAME);

        // Iniciar a execução do teste 
        Test.startTest();
        try {
            LeadController.createLeadPessoaJuridicaRecord(leadSalutation, leadFirstName, leadLastName, leadEmail, leadPhone, leadCnpj, leadEmpresa, leadSetor, leadCargo, leadOrigem, leadDoNotCall, leadWebsite, leadCep, leadRua, leadNumero, leadComplemento, leadBairro, leadCidade, leadEstado, leadPais, leadServico, leadEquipamento, leadRecordTypeId);
        } catch (Exception e) {
            throw new AuraHandledException('Error creating lead: ' + e.getMessage());
        }
        
        Test.stopTest();

        //Recuperar o record Lead criado
        Lead createdLead = [SELECT Id, Salutation, FirstName, LastName, Email, Phone, CNPJ__c, Company, Industry,
                            LeadSource, DoNotCall, Website, CEP__c, Rua__c, Numero__c, Complemento__c, Bairro__c,
                            Cidade__c, Estado_Provincia__c, Pais__c, Tipo_Servico__c, Equipamento__c , Title,RecordTypeId  
                            FROM Lead  LIMIT 1];

        // Assertion statements para verificar o record Lead criado                        
        Assert.areEqual(leadSalutation, createdLead.Salutation, 'Erro: Salutation não é igual');
        Assert.areEqual(leadFirstName, createdLead.FirstName, 'Erro: First Name não é igual');
        Assert.areEqual(leadLastName, createdLead.LastName, 'Erro: Last Name não é igual');
        Assert.areEqual(leadEmail, createdLead.Email, 'Erro: Email não é igual');
        Assert.areEqual(leadPhone, createdLead.Phone, 'Erro: Phone não é igual');
        Assert.areEqual(leadCnpj, createdLead.CNPJ__c, 'Erro: CNPJ não é igual');
        Assert.areEqual(leadEmpresa, createdLead.Company, 'Erro: Company não é igual');
        Assert.areEqual(leadSetor, createdLead.Industry, 'Erro: Industry não é igual');
        Assert.areEqual(leadCargo, createdLead.Title, 'Erro: Title não é igual');
        Assert.areEqual(leadOrigem, createdLead.LeadSource, 'Erro: Lead Source não é igual');
        Assert.areEqual(leadDoNotCall, createdLead.DoNotCall, 'Erro: Do Not Call não é igual');
        Assert.areEqual(leadWebsite, createdLead.Website, 'Erro: Website não é igual');
        Assert.areEqual(leadCep, createdLead.CEP__c, 'Erro: CEP não é igual');
        Assert.areEqual(leadRua, createdLead.Rua__c, 'Erro: Rua não é igual');
        Assert.areEqual(leadNumero, createdLead.Numero__c, 'Erro: Numero não é igual');
        Assert.areEqual(leadComplemento, createdLead.Complemento__c, 'Erro: Complemento não é igual');
        Assert.areEqual(leadBairro, createdLead.Bairro__c, 'Erro: Bairro não é igual');
        Assert.areEqual(leadCidade, createdLead.Cidade__c, 'Erro: Cidade não é igual');
        Assert.areEqual(leadEstado, createdLead.Estado_Provincia__c, 'Erro: Estado não é igual');
        Assert.areEqual(leadPais, createdLead.Pais__c, 'Erro: Pais não é igual');
        Assert.areEqual(leadServico, createdLead.Tipo_Servico__c, 'Erro: Tipo de Serviço não é igual');
        Assert.areEqual(leadEquipamento, createdLead.Equipamento__c, 'Erro: Equipamento não é igual');
        Assert.areEqual(leadRecordTypeId, createdLead.RecordTypeId, 'Erro: Record Type Id não é igual');
                            
    }
   
}