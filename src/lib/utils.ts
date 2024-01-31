import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

export const createResponse = (message: string, statusCode: number) => {
  return new Response(
    JSON.stringify({
      message,
    }),
    { status: statusCode }
  );
};