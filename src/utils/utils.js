export const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_AUTH}`,
  },
};

export const apiFetch = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    console.log("No data found");
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

// file sizes
// [ original, w500 ]
/* "backdrop_sizes": [
  "w300",
  "w780",
  "w1280",
  "original"
], 
"poster_sizes": [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
],
"profile_sizes": [
  "w45",
  "w185",
  "h632",
  "original"
],*/
export const getImageSource = (path, fileSize = "original") => {
  if (!path) {
    return "https://www.dummyimg.in/placeholder?text=No%20Image&font_size=40";
  }

  return `https://image.tmdb.org/t/p/${fileSize}/${path}`;
};

export const getYear = (date) => {
  return new Date(date).getFullYear();
};

export const getRunTime = (runtime) => {
  let time = runtime;
  let result = [];

  if (runtime >= 60) {
    time -= Math.floor(runtime / 60) * 60;
    result.push(`${Math.floor(runtime / 60)}h`);
  }

  result.push(`${time}m`);

  return result.join(" ");
};

export const IS_MOBILE = window.innerWidth <= 992;
