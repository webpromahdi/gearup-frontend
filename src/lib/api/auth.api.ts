import axios from "axios";

export const getMyProfile = async () => {
  const res = await axios.get("/api/me");
  return res.data;
};
