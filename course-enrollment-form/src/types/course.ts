import type {Category} from "./category.ts";

export interface Course = {
    id: string;
    title: string;
    description: string;
    category: Category;
    price: number;
    maxCapacity: number;
    currentEnrollment: number;
    startDate: string;
    endDate: string;
    instructor: string;
}