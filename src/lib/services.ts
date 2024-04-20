import { Post } from "@/types";
import { URL } from "./constants";

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error al obtener los posts");
  }
};
