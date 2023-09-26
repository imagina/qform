export interface FormattedData {
    id: string;
    title: string;
    blockData: {
        id: number;
        label: string;
        subtext: string;
        noTick: boolean;
        children: { label: string }[];
    }[];
}
