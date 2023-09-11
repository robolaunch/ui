export function stringSlugify(text: string): string {
  if (text) {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  return text;
}

export function stringCapitalization({ str }: { str: string }) {
  var splitStr = str?.toLowerCase().split(" ");
  for (var i = 0; i < splitStr?.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr?.join(" ");
}

export function handleGetRandomNumbers(length: number): number {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function handleGetRandomString(length: number): string {
  return [...Array(length)]
    .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    .join("");
}

export function organizationNameViewer({
  organizationName,
  capitalization = true,
}: {
  organizationName: string;
  capitalization?: boolean;
}) {
  if (capitalization) {
    return stringCapitalization({
      str: organizationName?.split("_")[1],
    });
  }

  return organizationName?.split("_")[1];
}

export function handleLogout() {
  [
    "tokens",
    "githubTokens",
    "persist:user",
    "persist:organization",
    "persist:roboticsCloud",
    "persist:fleet",
    "persist:robot",
    "persist:github",
    "persist:region",
    "persist:provider",
    "persist:trial",
    "persist:marketplace",
    "persist:instance",
  ].map((item: string) => localStorage.removeItem(item));
}

export function handleTimeConverter(totalSeconds: number) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { h: hours, m: minutes, s: seconds };
}

export function handleRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
