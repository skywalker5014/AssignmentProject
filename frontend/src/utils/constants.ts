export interface NodeInterface {
    name: string;
    parentName: string | null;
    childrenNames: string[]; 
}

export const url = "http://localhost:5050/api/v1/"