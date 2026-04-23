import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import type { Course } from "../types/course";

const categories: string[] = ["전체", "디자인", "개발", "마케팅", "비즈니스"];

const createMockCourse = (): Course => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  category: faker.helpers.arrayElement(categories),
  price: faker.number.int({ min: 10000, max: 100000 }),
  maxCapacity: faker.number.int({ min: 10, max: 50 }),
  currentEnrollment: faker.number.int({ min: 0, max: 10 }),
  startDate: faker.date.future().toISOString(),
  endDate: faker.date.future().toISOString(),
  instructor: faker.person.fullName(),
});

export const handlers = [
  http.get("/courses", () => {
    const data = {
        courses: Array.from({ length: 100 }, () => createMockCourse()),
        categories
    }

    return HttpResponse.json(data);
  }),
];
