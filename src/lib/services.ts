import { Post } from "@/types";
import { API_URL } from "./constants";

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(API_URL + "posts");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error al obtener los posts");
  }
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  try {
    const response = await fetch(API_URL + `posts/${postId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error al obtener post");
  }
};

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await fetch(API_URL + `posts/${postId}/comments`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error al obtener los comentarios");
  }
};
