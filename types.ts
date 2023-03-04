interface Selection {
    date: string;
    slot: string;
    box: number;
    name: string;
    color: string;
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
interface User {
    id?: string;
    username?: string;
    color?: string;
    pfp?: string;
}

export type { Meeting, Selection, User };
