interface Selection {
    date: string;
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
    date?: string;
    active?: string;
    selections?: Selection[];
}
export type { Meeting, Selection };
