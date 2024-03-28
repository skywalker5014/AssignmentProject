export interface NodeInterface {
    name: string;
    parentName: string | null;
    childrenNames: string[]; 
}