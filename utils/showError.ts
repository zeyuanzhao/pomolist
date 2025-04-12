import { addToast } from "@heroui/react";

export const showError = (
  error: unknown,
  title: string = "Error",
  description: string = "An error occurred"
) => {
  const errorMessage = JSON.stringify(error, null, 2);

  console.error("Error:", errorMessage);

  addToast({
    title,
    description: `${description}`,
    color: "danger",
  });
};
