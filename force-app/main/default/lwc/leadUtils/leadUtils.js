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

export default class LeadUtils extends LightningElement {
  @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
  wireObjectInfo({ error, data }) {
    if (data) {
      this.objectInfoData = data;
      this.defaultRecordTypeId = data.defaultRecordTypeId;
    } else if (error) {
      this.error = error;
      this.defaultRecordTypeId = undefined;
      console.error("Error:", error);
    }
  }

  @wire(getPicklistValues, {
    recordTypeId: "$defaultRecordTypeId",
    fieldApiName: LEAD_ORIGIN_SOURCE,
  })
  pickValues({ error, data }) {
    if (data) {
      this.optionsLead = data.values.map((plValue) => ({
        label: plValue.label,
        value: plValue.value,
      }));
    } else if (error) {
      console.error("Error:", error);
    }
  }
  @api
  getOptionsLead() {
    return this.optionsLead;
  }
}

export { options };
