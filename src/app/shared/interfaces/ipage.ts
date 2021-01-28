export interface IPage {
    // The number of elements in the page
    limit?: number;
    // The total number of elements
    count?: number;
    // The current page number
    offset: number;
}