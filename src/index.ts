import { createObjectCsvWriter } from "csv-writer";
import { Clinique } from "./clinique";
import { medHeaders } from "./medication.types";
import { range } from "ramda";
import { Api1, Api2 } from "./apiHandler";
import { api1Schema } from "./api1.types";
import { api2Schema } from "./api2.types";
import { Patient } from "./patient";

const main = () => {
    const csvWriter = createObjectCsvWriter({
        path: 'users.csv',
        header: medHeaders(['patientId', 'drugName', 'dosage', 'frequency', 'refill', 'status', 'startDate', 'endDate', 'metadata'])
    });
    const apis = [new Api1(api1Schema), new Api2(api2Schema)];
    const cliniques = ["1", "2"].map((c, i) => new Clinique(c, apis[i], csvWriter));
    range(0, 5).map(async patientId => {
        await Patient.fetchMedsFromClinique(cliniques[0])(patientId);
    })
    range(5, 10).map(async patientId => {
        await Patient.fetchMedsFromClinique(cliniques[1])(patientId);
    })
}

main()