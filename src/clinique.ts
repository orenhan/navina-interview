import { CsvWriter } from "csv-writer/src/lib/csv-writer";
import { ObjectMap } from "csv-writer/src/lib/lang/object";
import { ApiHandler } from "./apiHandler";

export class Clinique {

    constructor(private readonly cliniqueId: string, private readonly api: ApiHandler<any>, private readonly csvWriter: CsvWriter<ObjectMap<any>>) {}

    async getMedications(patientId: number) {
        try {
            const data = await this.api.handler(this.cliniqueId, patientId);
            const modified = this.api.modifyData(data);
            await this.csvWriter.writeRecords([modified]);
            console.log(`success in fetching patient ${patientId}`)
        } catch (err) {
            console.error(`unable to fetch patient ${patientId}`);
            throw err;
        }
    }
}