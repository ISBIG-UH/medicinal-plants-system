// interface Filter {
//     property: string;
//     type: number;
//     value: any;
// }

enum SortingDirection {
    Asc = 1,
    Desc = -1,
}

interface QueryCommand {
    sortingField?: string;
    sortingDirection?: SortingDirection;

    skip?: number;
    take?: number;
}

interface PageResult<T> {
    total: number;
    items: T[];
}
