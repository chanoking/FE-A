import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import type { Course } from "../types/course";
import type { Category } from "../types/category";

const categories: Category[] = ["디자인", "개발", "마케팅", "비즈니스"];

const createMockCourse = (
  category: Category,
  override?: Partial<Course>
): Course => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  category,
  price: faker.number.int({ min: 10000, max: 100000 }),
  maxCapacity: faker.number.int({ min: 10, max: 50 }),
  currentEnrollment: faker.number.int({ min: 0, max: 10 }),
  startDate: faker.date.future().toISOString(),
  endDate: faker.date.future().toISOString(),
  instructor: faker.person.fullName(),
  ...override,
});

export const handlers = [
  http.get("/courses", () => {
    const data = categories.flatMap((category) =>
      Array.from({ length: 10 }, () => createMockCourse(category))
    );

    return HttpResponse.json(data);
  }),
];