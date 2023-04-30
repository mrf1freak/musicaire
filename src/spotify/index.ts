import axios, { type AxiosError } from "axios";
import { z } from "zod";
import { env } from "~/env.mjs";

const api = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error: AxiosError) {
    if (!axios.isAxiosError(error)) return error;
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const access_token = await getAccessToken();
      api.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export async function searchTracks(query: string) {
  const ResponseSchema = z.object({
    tracks: z.object({
      items: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          artists: z.array(z.object({ name: z.string() })),
        })
      ),
    }),
  });

  const { data } = await api.get<z.infer<typeof ResponseSchema>>("search", {
    params: {
      q: query,
      type: "track",
      limit: 5,
    },
  });

  const searchResult = ResponseSchema.parse(data);
  return searchResult.tracks.items;
}

export async function getAccessToken() {
  const ResponseSchema = z.object({ access_token: z.string() });

  const {
    data: { access_token },
  } = await axios.post<z.infer<typeof ResponseSchema>>(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "client_credentials",
    },
    {
      headers: {
        authorization: `Basic ${Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return access_token;
}
