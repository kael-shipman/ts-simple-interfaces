import "jest";
import { SimpleHttpClientRpn } from "../src";
import { SimpleHttpResponseInterface } from "ts-simple-interfaces";

declare interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

declare interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

test("Can get API response", async () => {
  const client = new SimpleHttpClientRpn();
  const r: SimpleHttpResponseInterface = await client.request<Todo>({
    url: "https://jsonplaceholder.typicode.com/todos/1",
  });

  expect(r.status).toBe(200);
  expect(typeof r.data).toBe("object");
  expect(typeof r.data.id).toBe("number");
  expect(typeof r.data.userId).toBe("number");
  expect(typeof r.data.completed).toBe("boolean");
  expect(typeof r.data.title).toBe("string");
});

test("Can POST to an API", async () => {
  const client = new SimpleHttpClientRpn();
  const r: SimpleHttpResponseInterface = await client.request<Post>({
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/posts",
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      userId: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et " +
      "cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet " +
      "architecto"
    }
  });

  expect(r.status).toBe(201);
  expect(typeof r.data).toBe("object");
  expect(typeof r.data.id).toBe("number");
  expect(typeof r.data.userId).toBe("number");
  expect(typeof r.data.title).toBe("string");
  expect(typeof r.data.body).toBe("string");
});

