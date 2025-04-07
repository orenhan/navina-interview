import { Clinique } from "./clinique";

export class Patient {

    static fetchMedsFromClinique = (clinique: Clinique) => async (patientId: number, retries = 3) => {
        try {
            await clinique.getMedications(patientId);
        } catch {
            if (retries > 0) {
                setTimeout(async () => await this.fetchMedsFromClinique(clinique)(patientId), retries - 1, 1000);
            } else {
                console.log(`reached maximum retries with patient ${patientId}`);
            }
        }
    }

}