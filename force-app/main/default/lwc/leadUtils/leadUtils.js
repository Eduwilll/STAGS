import { LightningElement, api, wire } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import LEAD_OBJECT from "@salesforce/schema/Lead";
import LEAD_ORIGIN_SOURCE from "@salesforce/schema/Lead.LeadSource";

//o tratamento é diferente da pickList dentro da org
const options = () => {
  return [
    { label: "Sr.", value: "Sr." },
    { label: "Sra.", value: "Sra." },
  ];
};

export function validateCNPJ(cnpj) {
  // Validate CNPJ format
  const cnpjRegex = /^\d{14}$/; // /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return cnpjRegex.test(cnpj);
}


export { options };
