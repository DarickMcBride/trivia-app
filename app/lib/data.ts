"use server";
import "server-only";

export const getQuestions = async (token: string) => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=50&type=multiple?token=${token}`,
    {
      next: {
        tags: ["questions"],
      },
    }
  );

  if (!res.ok) {
    console.error(res);
    console.error("code:", res.status);
    console.error(res.statusText);

    throw new Error("Failed to fetch questions");
  }

  return res.json();
};

//get session token from opentdb
export const getToken = async () => {
  const res = await fetch("https://opentdb.com/api_token.php?command=request", {
    next: {
      tags: ["token"],
    },
  });

  if (!res.ok) {
    console.error(res);
    console.error("code:", res.status);
    console.error(res.statusText);

    throw new Error("Failed to fetch token");
  }

  return res.json();
};

//reset session token from opentdb
export const resetToken = async (token: string | null) => {
  if (!token) return console.error("No token provided");
  const res = await fetch(
    `https://opentdb.com/api_token.php?command=reset&token=${token}`,
    {
      next: {
        tags: ["token-reset"],
      },
    }
  );

  if (!res.ok) {
    console.error(res);
    console.error("code:", res.status);
    console.error(res.statusText);

    throw new Error("Failed to reset token");
  }

  return res.json();
};
