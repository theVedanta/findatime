interface Selection {
    date: Date;
    slot: string;
    box: number;
    name: string;
}
interface Meeting {
    id?: string;
    owner?: string;
    name?: string;
    note?: string;
    duration?: string;
    type?: string;
    timezone?: string;
    date?: Date;
    active?: Date;
    selections?: Selection[];
}
export type { Meeting, Selection };
