import Joi from "joi";

export interface Api2Response {
    drug: string;
    dose: string;
    freq: string;
    duration: any;
    status: string;
    start_date: string;
    end_date: string;
    atc: string[];
    rxcui: string[];
}

export const api2Schema = Joi.object<Api2Response>({
    drug: Joi.string().allow(null, "").optional(),
    dose: Joi.string().allow(null, "").optional(),
    freq: Joi.string().allow(null, "").optional(),
    duration: Joi.string().allow(null, "").optional(),
    status: Joi.string().allow(null, "").optional(),
    start_date: Joi.string().allow(null, "").optional(),
    end_date: Joi.string().allow(null, "").optional(),
    atc: Joi.any(),
    rxcui: Joi.any()
}).prefs({ convert: true })