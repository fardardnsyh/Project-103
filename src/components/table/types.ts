interface TableProps<T> {
  headers: Array<{
    key: keyof T;
    label: React.ReactNode;
  }>;
  data: T[];
  onEdit: (id: string) => void;
}
export type { TableProps };
