import Joi from "joi";

export interface Api1Response {
    drug_name: string;
    dosage: string;
    frequency: string;
    duration: any,
    refill: number;
    status: string;
    start_date: string;
    end_date: string;
    atc: string[];
    rxcui: string[];
}

export const api1Schema = Joi.object<Api1Response>({
    drug_name: Joi.string().allow(null, "").optional(),
    dosage: Joi.string().allow(null, "").optional(),
    frequency: Joi.string().allow(null, "").optional(),
    duration: Joi.string().allow(null, "").optional(),
    refill: Joi.number().allow(null, "").optional(),
    status: Joi.string().allow(null, "").optional(),
    start_date: Joi.string().allow(null, "").optional(),
    end_date: Joi.string().allow(null, "").optional(),
    atc: Joi.any(),
    rxcui: Joi.any()
})