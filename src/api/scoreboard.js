import serverInstance from "./serverInstance";

export const getTopScoreBoard = async () => {
  try {
    const { data } = await serverInstance.get("scoreboard");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const createScore = async ({ userName, score }) => {
  try {
    const { data } = await serverInstance.post("scoreboard", {
      userName,
      score,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
