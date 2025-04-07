export interface Medication {
    patientId: number;
    drugName: string;
    dosage: string;
    frequency: string;
    refill: number | null;
    status: string | "Taking" | "Not-Taking" | "FILL" | "ORDER";
    startDate: string;
    endDate: string;
    metadata: any;
}

export const medHeaders = (keys: (keyof Medication)[]) => {
    return keys.map((key) => ({
        id: key,
        title: key[0].toUpperCase() + key.slice(1),
    }));
};