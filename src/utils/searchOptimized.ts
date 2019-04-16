const cheerio = require("react-native-cheerio");

const YT_SEARCH_QUERY_URI =
  "https://www.youtube.com/results?" +
  "hl=en&gl=US&category=music" +
  "&search_query=";

export const results = [
  {
    title: "sdfasd",
    videoId: "asdfsd",
  },
  {
    title: "sdfasd",
    videoId: "asdfsd",
  },
  {
    title: "sdfasd",
    videoId: "asdfsd",
  },
];

export async function search(query: string, numOfResults: number = 15) {
  const searchUrl = `${YT_SEARCH_QUERY_URI}${query}`;
  const response = await fetch(searchUrl);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const contents = $(".yt-lockup-content");

  let results: any = [];

  for (let i = 0; i < contents.length; i++) {
    let content = contents[i];
    if (i === numOfResults) {
      break;
    }
    var title = $(".yt-lockup-title", content);
    var a = $("a", title);
    var span = $("span", title);
    let potentialTitle = span.text();
    if (potentialTitle.includes("Duration")) {
      let duration = parseDuration(
        potentialTitle.split("ion: ")[1].split(".")[0],
      );
      // let name = potentialTitle.split("ion: ")[0];
      let potentialUrl = a.attr("href");

      let videoId = potentialUrl.split("=")[1];

      results.push({
        // title: name,
        title: a.text(),
        duration: duration.timestamp,
        seconds: duration.seconds,
        videoId,
      });
    } else {
      continue;
    }
  }
  return results;
}

export function parseDuration(timestampText: string) {
  var a = timestampText.split(" ");
  var timestamp = a[a.length - 1].replace(/[^:\d]/g, "");

  var t = timestamp.split(":");

  var seconds = 0;
  var exp = 0;
  for (var i = t.length - 1; i >= 0; i--) {
    if (t[i].length <= 0) continue;
    var number = t[i].replace(/\D/g, "");
    // var exp = (t.length - 1) - i;
    seconds += parseInt(number) * (exp > 0 ? Math.pow(60, exp) : 1);
    exp++;
    if (exp > 2) break;
  }

  return {
    toString: function() {
      return seconds + " seconds (" + timestamp + ")";
    },
    seconds: seconds,
    timestamp: timestamp,
  };
}
