import axios from "axios";
import Joi from "joi";
import { Api1Response } from "./api1.types";
import { Api2Response } from "./api2.types";
import { Medication } from "./medication.types";

export abstract class ApiHandler<T> {
    constructor(private readonly schema: Joi.Schema) { }

    abstract createApi: (cliniqueId: string, patientId: number) => string;

    abstract modifyData: (data: T & { patientId: number }) => Medication;

    handler = async (cliniqueId: string, patientId: number) => {
        const api = this.createApi(cliniqueId, patientId);

        try {
            const { data } = await axios.get<T>(api);
            const { error, value } = this.schema.validate(data, { allowUnknown: true });

            if (error) {
                console.error(`Invalid response from API ${api}`);
                console.error(error);
            }

            // console.log(`Success in api handler ${api}`);

            return value as T;
        } catch (err) {
            // console.error(`Failed retreiving data from api ${api}`);
            throw err;
            // console.error(err);
        }
    }
}

export class Api1 extends ApiHandler<Api1Response> {
    createApi = (cliniqueId: string, patientId: number) => `${process.env.API_1_BASE_URL}/${cliniqueId}/${patientId}/medication`;

    modifyData = (data: Api1Response & { patientId: number }): Medication => {
        const { patientId, drug_name, dosage, frequency, refill, status, start_date, end_date, ...rest } = data;
        return {
            patientId,
            drugName: drug_name,
            dosage: dosage,
            frequency: frequency,
            refill: refill,
            status: status,
            startDate: start_date,
            endDate: end_date,
            metadata: rest
        }
    }
}

export class Api2 extends ApiHandler<Api2Response> {
    createApi = (cliniqueId: string, patientId: number) => `${process.env.API_2_BASE_URL}/${cliniqueId}/${patientId}/med`;

    modifyData = (data: Api2Response & { patientId: number }): Medication => {
        const { patientId, drug, dose, freq, status, start_date, end_date, ...rest } = data;
        return {
            patientId,
            drugName: drug,
            dosage: dose,
            frequency: freq,
            refill: null,
            status: status,
            startDate: start_date,
            endDate: end_date,
            metadata: rest
        }
    }
}